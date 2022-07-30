import React from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { AdminBreadcrumbs, DashboardContent, PlayerForm } from '@/components';
import { PlayerAttributes, useAdminPlayersNewPageCreatePlayerMutation } from '@/generated/graphql';
import { loadingState } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createPlayer, { loading }] = useAdminPlayersNewPageCreatePlayerMutation({
    onCompleted: () => {
      toast.success('プレイヤー情報を登録しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: PlayerAttributes) => {
    createPlayer({ variables: { attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent title="プレイヤー登録" breadcrumb={<AdminBreadcrumbs to="playersNew" />}>
      <PlayerForm onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export default Page;
