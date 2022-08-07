import React from 'react';

import { Box, Button, Card, CardContent, Divider, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { DashboardContent } from '@/components';
import { ViewerAttributes, ViewerFragment, useViewerQuery, useUpdateViewerMutation } from '@/generated/graphql';
import { viewerState, handleApolloError, loadingState } from '@/lib';

const Page: React.FC = () => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading } = useViewerQuery({
    fetchPolicy: 'network-only',
    onError: handleApolloError,
  });

  setLoading(loading);

  return <DashboardContent title="プロフィール編集">{data && <Form viewer={data.viewer} />}</DashboardContent>;
};

const Form: React.FC<{ viewer: ViewerFragment }> = ({ viewer }) => {
  const setViewer = useSetRecoilState(viewerState);
  const setLoading = useSetRecoilState(loadingState);
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ViewerAttributes>({
    defaultValues: {
      name: viewer.name,
    },
  });

  const [updateViewer, { loading }] = useUpdateViewerMutation({
    onCompleted: data => {
      const updatedViewer = data.updateViewer?.viewer;
      if (!updatedViewer) {
        toast.error('プロフィールの更新に失敗しました。');
        return;
      }

      setViewer(updatedViewer);
      toast.success('プロフィールを更新しました。');
    },
    onError: handleApolloError,
  });

  const onSubmit = (attributes: ViewerAttributes) => {
    updateViewer({ variables: { attributes } });
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
