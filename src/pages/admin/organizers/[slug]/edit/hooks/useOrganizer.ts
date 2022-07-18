import { useSetRecoilState } from 'recoil';

import { useAdminOrganizerEditPageQuery } from '@/generated/graphql';
import { loadingState } from '@/lib';

export const useOrganizer = (organizerSlug?: string) => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading } = useAdminOrganizerEditPageQuery({
    variables: { organizerSlug: organizerSlug as string },
    fetchPolicy: 'network-only',
    skip: !organizerSlug,
  });
  setLoading(loading);

  return { organizer: data?.organizer };
};
