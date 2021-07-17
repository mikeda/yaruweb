import { useRouter } from 'next/router';

export const useRouteParams = () => {
  const router = useRouter();
  let { tournamentId } = router.query;

  if (tournamentId) tournamentId = tournamentId as string;

  return { tournamentId };
};
