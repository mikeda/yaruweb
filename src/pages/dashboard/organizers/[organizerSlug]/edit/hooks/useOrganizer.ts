import { useDashboardOrganizerEditPageQuery } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';

export const useOrganizer = (organizerSlug?: string) => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading } = useDashboardOrganizerEditPageQuery({
    variables: { organizerSlug: organizerSlug as string },
    fetchPolicy: 'network-only',
    skip: !organizerSlug,
  });
  setLoading(loading);

  return { organizer: data?.organizer };
};
