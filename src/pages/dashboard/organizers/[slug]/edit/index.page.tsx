import React from 'react';

import { useRouter } from 'next/router';



import { useOrganizer } from './hooks/useOrganizer';
import { useUpdate } from './hooks/useUpdate';

import { DashboardContent, DashboardBreadcrumbs, OrganizerForm } from '@/components';
import { OrganizerAttributes } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();
  const organizerSlug = router.query.slug as string | undefined;

  const { organizer } = useOrganizer(organizerSlug);
  const { update } = useUpdate(() => {
    router.back();
  });

  if (!organizer) return null;

  const onSubmit = (attributes: OrganizerAttributes) => {
    update({ variables: { organizerSlug: organizer.slug, attributes } });
  };

  return (
    <DashboardContent
      title="オーガナイザー編集"
      breadcrumb={<DashboardBreadcrumbs to="organizerEdit" organizer={organizer} />}
    >
      <OrganizerForm organizer={organizer} onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export default Page;
