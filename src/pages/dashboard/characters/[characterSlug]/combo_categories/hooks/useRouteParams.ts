import { useRouter } from 'next/router';

export const useRouteParams = () => {
  const router = useRouter();
  let { characterSlug } = router.query;

  if (characterSlug) characterSlug = characterSlug as string;

  return { characterSlug };
};
