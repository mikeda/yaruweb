import React from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { CharacterForm, DashboardContent } from '@/components';
import { CharacterAttributes, useCreateCharacterMutation, loadingState } from '@/lib';


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
