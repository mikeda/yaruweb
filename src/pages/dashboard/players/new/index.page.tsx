import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { PlayerAttributes, useDashboardPlayersNewPageCreatePlayerMutation } from '@/lib/$types';
import { loadingState } from '@/lib/states/loadingState';

import { DashboardBreadcrumbs, DashboardContent, PlayerForm } from '@/components';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createPlayer, { loading }] = useDashboardPlayersNewPageCreatePlayerMutation({
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
    <DashboardContent title="プレイヤー登録" breadcrumb={<DashboardBreadcrumbs to="playersNew" />}>
      <PlayerForm onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export default Page;
