import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Highlight, HighlightAttributes } from '@/lib/graphql/types';
import { Button } from '@/components/blocks/Button';
import { FormGroup } from '@/components/form2/FormGroup';
import { Input } from '@/components/form2/Input';
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
          <Button type="info">
            <a
              onClick={e => {
                e.preventDefault();
                if (!youTubePlayer) return;

                setValue('startSec', Math.floor(youTubePlayer.getCurrentTime()));
              }}
            >
              プレイヤーの場所をコピー
            </a>
          </Button>
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
