import React from 'react';

import {
  CurrentPlayerAttributes,
  CurrentPlayerFragment,
  useCurrentPlayerQuery,
  useUpdateCurrentPlayerMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button } from '@/components/Button';
import { toast } from 'react-toastify';
import { FormGroup } from '@/components/form/FormGroup';
import { Input } from '@/components/form/Input';
import { currentPlayerState } from '@/states/currentPlayer';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';

const Page: React.FC = () => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading } = useCurrentPlayerQuery({
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);

  return (
    <DashboardContent activeTab="profile">
      <Head title="プロフィール更新" />

      <PageHeader title="プロフィール更新" />

      {data && <Form currentPlayer={data.currentPlayer} />}
    </DashboardContent>
  );
};

const Form: React.FC<{ currentPlayer: CurrentPlayerFragment }> = ({ currentPlayer }) => {
  const router = useRouter();
  const setCurrentPlayer = useSetRecoilState(currentPlayerState);
  const setLoading = useSetRecoilState(loadingState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CurrentPlayerAttributes>({
    defaultValues: {
      name: currentPlayer.name,
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
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: CurrentPlayerAttributes) => {
    updateCurrentPlayer({ variables: { attributes } });
  };

  setLoading(loading);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="名前">
        <Input {...register('name', { required: true })} />
        {errors.name && <span>This field is required</span>}
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

export default Page;
