import { useRouter } from 'next/router';

export const useRouteParams = () => {
  const router = useRouter();
  let { slug } = router.query;

  if (slug) slug = slug as string;

  return { slug };
};
