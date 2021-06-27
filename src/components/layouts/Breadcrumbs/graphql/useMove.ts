import { useBreadcrumbsMoveQuery } from '@/lib/graphql/types';

export const useMove = (moveId: string) => {
  const { data } = useBreadcrumbsMoveQuery({ variables: { moveId } });

  return { move: data?.move };
};
