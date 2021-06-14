import { DocumentNode } from '@apollo/client';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDOPOINT as string;

export const fetchGraphql = async (gql: DocumentNode, variables = {}) => {
  const query = gql.loc?.source.body as string;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(JSON.stringify({ res: json, variables }));
  }

  return json.data;
};
