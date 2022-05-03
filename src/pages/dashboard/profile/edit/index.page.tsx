import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { Box, Button, Card, CardContent, Divider, TextField } from '@mui/material';

import {
  CurrentUserAttributes,
  CurrentUserFragment,
  useCurrentUserQuery,
  useUpdateCurrentUserMutation,
  currentUserState,
  loadingState,
} from '@/lib';

import { DashboardContent } from '@/components';

const Page: React.FC = () => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading } = useCurrentUserQuery({
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);

  return (
    <DashboardContent title="プロフィール編集">{data && <Form currentUser={data.currentUser} />}</DashboardContent>
  );
};

const Form: React.FC<{ currentUser: CurrentUserFragment }> = ({ currentUser }) => {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const setLoading = useSetRecoilState(loadingState);
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CurrentUserAttributes>({
    defaultValues: {
      name: currentUser.name,
    },
  });

  const [updateCurrentUser, { loading }] = useUpdateCurrentUserMutation({
    onCompleted: data => {
      const updatedCurrentUser = data.updateCurrentUser?.currentUser;
      if (!updatedCurrentUser) {
        toast.error('プロフィールの更新に失敗しました。');
        return;
      }

      setCurrentUser(updatedCurrentUser);
      toast.success('プロフィールを更新しました。');
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: CurrentUserAttributes) => {
    updateCurrentUser({ variables: { attributes } });
  };

  setLoading(loading);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="名前" error={Boolean(errors.name)} helperText={errors.name?.message} />
            )}
          />

          <Box mt={4}>
            <Button component="label" color="primary" variant="outlined">
              全体画像を選択
              <input
                type="file"
                accept="image/*"
                hidden
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
            </Button>
          </Box>
        </CardContent>

        <Divider />

        <Box m={2} display="flex" justifyContent="center">
          <Button type="submit" variant="contained">
            登録する
          </Button>
        </Box>
      </form>
    </Card>
  );
};

export default Page;
