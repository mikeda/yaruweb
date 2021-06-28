import React from 'react';

import { CharacterAttributes, useCreateCharacterMutation } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { CharacterForm } from '@/components/CharacterForm';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createCharacter, { loading }] = useCreateCharacterMutation({
    onCompleted: () => {
      toast.success('キャラクターを登録しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: CharacterAttributes) => {
    createCharacter({ variables: { attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent title="キャラクター登録">
      <CharacterForm onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export default Page;
