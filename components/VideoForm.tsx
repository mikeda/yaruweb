import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Video, VideoAttributes } from '@/lib/graphql/types';
import { Button } from '@/components/blocks/Button';
import { FormGroup } from '@/components/form2/FormGroup';
import { Input } from '@/components/form2/Input';
import YouTube from 'react-youtube';
import { TextArea } from './form2/TextArea';

const schema = yup.object().shape({
  title: yup.string().required(),
});

type VideoFragment = Pick<Video, 'title' | 'description' | 'videoId'>;

interface Props {
  video: VideoFragment;
  onSubmit: (attributes: VideoAttributes) => void;
}

export const VideoForm: React.FC<Props> = ({ video, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VideoAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      title: video.title,
      description: video.description || undefined,
    },
  });

  return (
    <>
      <YouTube containerClassName="bl_youtube" videoId={video.videoId} opts={{ width: '854', height: '480' }} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup label="タイトル" required>
          <Input {...register('title')} />
          {errors.title && <span>This field is required</span>}
        </FormGroup>

        <FormGroup label="説明文">
          <TextArea {...register('description')} rows={4} />
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
