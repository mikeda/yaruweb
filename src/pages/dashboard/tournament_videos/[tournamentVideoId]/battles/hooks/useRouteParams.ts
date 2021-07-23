import { useRouter } from 'next/router';

export const useRouteParams = () => {
  const router = useRouter();
  let { tournamentVideoId } = router.query;

  if (tournamentVideoId) tournamentVideoId = tournamentVideoId as string;

  return { tournamentVideoId };
};
