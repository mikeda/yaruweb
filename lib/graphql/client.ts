import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getFirebaseUser } from '../firebase';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDOPOINT;

export const httpLink = createHttpLink({
  uri: endpoint,
});

const authLink = setContext(async (_, { headers }) => {
  const firebaseUser = await getFirebaseUser();

  if (!firebaseUser) return;

  const token = await firebaseUser.getIdToken(true);
  console.log({ token });
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    possibleTypes: {
      Action: ['AttackAction', 'ThrowAction'],
    },
  }),
});
