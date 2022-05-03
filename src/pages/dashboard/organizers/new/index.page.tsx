import React from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { DashboardBreadcrumbs, DashboardContent, OrganizerForm } from '@/components';
import { OrganizerAttributes, useDashboardOrganizersNewPageCreateOrganizerMutation, loadingState } from '@/lib';


const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createOrganizer, { loading }] = useDashboardOrganizersNewPageCreateOrganizerMutation({
    onCompleted: () => {
      toast.success('オーガナイザー情報を登録しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: OrganizerAttributes) => {
    createOrganizer({ variables: { attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent title="オーガナイザー登録" breadcrumb={<DashboardBreadcrumbs to="organizersNew" />}>
      <OrganizerForm onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export default Page;
