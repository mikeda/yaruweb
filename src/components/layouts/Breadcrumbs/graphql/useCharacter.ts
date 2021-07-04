import { useBreadcrumbsCharacterQuery } from '@/lib/graphql/types';

export const useCharacter = (slug: string) => {
  const { data } = useBreadcrumbsCharacterQuery({
    variables: { characterSlug: slug },
    fetchPolicy: 'network-only',
  });

  return { character: data?.character };
};
