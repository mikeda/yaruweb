import { useRouter } from 'next/router';

export const useRouteParams = () => {
  const router = useRouter();
  let { page, q: keyword } = router.query;

  if (page) page = page as string;
  const pageNumber = page ? Number(page as string) : 1;
  if (keyword) keyword = keyword as string;

  return { page: pageNumber, keyword };
};
