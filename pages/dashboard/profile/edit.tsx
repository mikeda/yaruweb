import React from 'react';

import {
  CurrentPlayerAttributes,
  CurrentPlayerDocument,
  CurrentPlayerFragment,
  CurrentPlayerQuery,
  useUpdateCurrentPlayerMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button } from '@/components/blocks/Button';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { toast } from 'react-toastify';
import { FormGroup } from '@/components/form2/FormGroup';
import { Input } from '@/components/form2/Input';
import { currentPlayerState } from 'states/currentPlayer';
import { useSetRecoilState } from 'recoil';

interface Props {
  currentPlayer: CurrentPlayerFragment;
}

const Page: React.FC<Props> = ({ currentPlayer }) => {
  return (
    <DashboardContent activeTab="stage">
      <Head title="プロフィール更新" />

      <PageHeader title="プロフィール更新" />

      <Form currentPlayer={currentPlayer} />
    </DashboardContent>
  );
};

const Form: React.FC<Props> = ({ currentPlayer }) => {
  const router = useRouter();
  const setCurrentPlayer = useSetRecoilState(currentPlayerState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CurrentPlayerAttributes>({
    defaultValues: {
      name: currentPlayer.name,
      slug: currentPlayer.slug,
    },
  });

  const [updateCurrentPlayer, { loading }] = useUpdateCurrentPlayerMutation({
    onCompleted: data => {
      const updatedCurrentPlayer = data.updateCurrentPlayer?.currentPlayer;
      if (!updatedCurrentPlayer) {
        toast.error('プロフィールの更新に失敗しました。');
        return;
      }

      setCurrentPlayer(updatedCurrentPlayer);
      toast.success('プロフィールを更新しました。');
      router.push(Routes.dashboard.profile.edit());
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: CurrentPlayerAttributes) => {
    updateCurrentPlayer({ variables: { attributes } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="名前">
        <Input {...register('name', { required: true })} />
        {errors.name && <span>This field is required</span>}
      </FormGroup>

      <FormGroup label="ID（URLに使用)">
        <Input {...register('slug', { required: true })} placeholder="半角英数字3~16文字" />
        {errors.slug && <span>This field is required</span>}
      </FormGroup>

      <FormGroup label="プロフィール画像">
        <input
          type="file"
          accept="image/*"
          name="avatarDummy"
          onChange={e => {
            if (!e.target.files) return;
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = e => {
              if (!e.target) return;

              setValue('avatar', e.target.result as string);
            };
            reader.readAsDataURL(file);
          }}
        />
        <input type="hidden" name="avatar" />
      </FormGroup>

      <FormGroup>
        <Button>
          <input type="submit" disabled={loading} />
        </Button>
      </FormGroup>
    </form>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data: CurrentPlayerQuery = await fetchGraphql(CurrentPlayerDocument);

  return { props: { currentPlayer: data.currentPlayer } };
};

export default Page;
