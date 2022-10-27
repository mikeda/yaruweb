import { ApolloCache } from "@apollo/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteCache = ({cache, id, __typename}: { cache: ApolloCache<any>, id: string, __typename: string}) => {
  const normalizedId = cache.identify({ id, __typename });
  cache.evict({ id: normalizedId });
  cache.gc();
}
