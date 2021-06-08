import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Highlight, HighlightAttributes } from '@/lib/graphql/types';
import { Button, ButtonListInline } from '@/components/blocks/Button';
import { FormGroup } from '@/components/form/FormGroup';
import { Input } from '@/components/form/Input';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';

const schema = yup.object().shape({
  title: yup.string().required(),
  startSec: yup.number().required(),
});

type HighlightFragment = Pick<Highlight, 'title' | 'startSec'>;

interface Props {
  youtubeVideoId: string;
  highlight?: HighlightFragment;
  onSubmit: (attributes: HighlightAttributes) => void;
}

export const HighlightForm: React.FC<Props> = ({ youtubeVideoId, highlight, onSubmit }) => {
  const [youTubePlayer, setYouTubePlayer] = useState<YouTubePlayer>();
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<HighlightAttributes>({
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
          setYouTubePlayer(event.target);
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
          <ButtonListInline>
            <Button type="info">
              <a
                onClick={e => {
                  e.preventDefault();
                  if (!youTubePlayer) return;

                  setValue('startSec', Math.floor(youTubePlayer.getCurrentTime()));
                }}
              >
                再生中の場所をコピー
              </a>
            </Button>

            <Button type="info">
              <a
                onClick={e => {
                  e.preventDefault();
                  if (!youTubePlayer) return;

                  youTubePlayer.seekTo(getValues('startSec'), true);
                }}
              >
                設定中の場所に移動
              </a>
            </Button>
          </ButtonListInline>
        </FormGroup>

        <FormGroup>
          <Button>
            <input type="submit" />
          </Button>
        </FormGroup>
      </form>
    </>
  );
};
