import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import YouTube from 'react-youtube';

import { TournamentVideo, TournamentVideoAttributes } from '@/lib/graphql/types';
import { Input, TextArea, FormGroup } from '@/components';
import { Button } from '@material-ui/core';

const schema = yup.object().shape({
  title: yup.string().required(),
});

type TournamentVideoFragment = Pick<TournamentVideo, 'title' | 'description' | 'youtubeVideoId'>;

interface Props {
  video: TournamentVideoFragment;
  onSubmit: (attributes: TournamentVideoAttributes) => void;
}

export const VideoForm: React.FC<Props> = ({ video, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TournamentVideoAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      title: video.title,
      description: video.description || undefined,
    },
  });

  return (
    <>
      <YouTube containerClassName="bl_youtube" videoId={video.youtubeVideoId} opts={{ width: '854', height: '480' }} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup label="タイトル" required>
          <Input {...register('title')} />
          {errors.title && <span>This field is required</span>}
        </FormGroup>

        <FormGroup label="説明文">
          <TextArea {...register('description')} rows={4} />
        </FormGroup>

        <FormGroup>
          <Button type="submit" variant="contained">
            登録する
          </Button>
        </FormGroup>
      </form>
    </>
  );
};
