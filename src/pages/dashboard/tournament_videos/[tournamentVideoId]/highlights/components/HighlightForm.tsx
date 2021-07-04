import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TournamentVideoHighlight, TournamentVideoHighlightAttributes } from '@/lib/graphql/types';
import { FormGroup } from '@/components/form/FormGroup';
import { Input } from '@/components/form/Input';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { Button } from '@material-ui/core';

const schema = yup.object().shape({
  title: yup.string().required(),
  startSec: yup.number().required(),
});

type TournamentVideoHighlightFragment = Pick<TournamentVideoHighlight, 'title' | 'startSec'>;

interface Props {
  youtubeVideoId: string;
  highlight?: TournamentVideoHighlightFragment;
  onSubmit: (attributes: TournamentVideoHighlightAttributes) => void;
}

export const HighlightForm: React.FC<Props> = ({ youtubeVideoId, highlight, onSubmit }) => {
  const [youTubeUser, setYouTubeUser] = useState<YouTubePlayer>();
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TournamentVideoHighlightAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: highlight && {
      title: highlight.title,
      startSec: highlight.startSec,
    },
  });

  return (
    <>
      <YouTube
        containerClassName="bl_youtube"
        videoId={youtubeVideoId}
        opts={{ width: '854', height: '480', playerVars: { start: getValues('startSec') } }}
        onReady={event => {
          setYouTubeUser(event.target);
        }}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup label="タイトル" required>
          <Input {...register('title')} />
          {errors.title && <span>This field is required</span>}
        </FormGroup>

        <FormGroup label="場所">
          <Input {...register('startSec')} />
          {errors.startSec && <span>{errors.startSec.message}</span>}
        </FormGroup>

        <FormGroup>
          <Button
            onClick={e => {
              e.preventDefault();
              if (!youTubeUser) return;

              setValue('startSec', Math.floor(youTubeUser.getCurrentTime()));
            }}
          >
            再生中の場所をコピー
          </Button>

          <Button
            onClick={e => {
              e.preventDefault();
              if (!youTubeUser) return;

              youTubeUser.seekTo(getValues('startSec'), true);
            }}
          >
            設定中の場所に移動
          </Button>
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
