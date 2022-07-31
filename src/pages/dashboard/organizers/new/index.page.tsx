import React from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { AdminBreadcrumbs, DashboardContent, OrganizerForm } from '@/components';
import { OrganizerAttributes, useAdminOrganizersNewPageCreateOrganizerMutation } from '@/generated/graphql';
import { handleApolloError, loadingState } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createOrganizer, { loading }] = useAdminOrganizersNewPageCreateOrganizerMutation({
    onCompleted: () => {
      toast.success('オーガナイザー情報を登録しました。');
      router.back();
    },
    onError: handleApolloError,
  });

  const onSubmit = (attributes: OrganizerAttributes) => {
    createOrganizer({ variables: { attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent title="オーガナイザー登録" breadcrumb={<AdminBreadcrumbs to="organizersNew" />}>
      <OrganizerForm onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export default Page;
