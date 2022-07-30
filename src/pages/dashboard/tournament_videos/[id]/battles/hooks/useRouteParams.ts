import { useRouter } from 'next/router';

export const useRouteParams = () => {
  const router = useRouter();
  let { id } = router.query;

  if (id) id = id as string;

  return { id };
};
