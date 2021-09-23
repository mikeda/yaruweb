import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { MoveAttributes, MoveFragment, MoveVideoFragment, useCreateMoveVideoMutation } from '@/lib/graphql/types';
import { useForm } from 'react-hook-form';
import { loadingState } from '@/states/loading';
import { VideoPlayer } from '../MoveMedia/VideoPlayer';
import { nullableNumber } from '@/lib/validators/nullable_number';
import { CheckBox, TextArea, Input, FormGroup, FormInline } from '@/components';
import { Button } from '@material-ui/core';

const schema = yup.object().shape({
  name: yup.string().required(),
  startUpFrame: nullableNumber,
});

interface Props {
  move?: MoveFragment;
  onSubmit: (attributes: MoveAttributes) => void;
}

export const MoveForm: React.FC<Props> = ({ move, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MoveAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: move && {
      moveVideoId: move.moveVideo?.id,
      name: move.name,
      kana: move.kana,
      startUpFrame: move.startUpFrame,
      powerCrush: move.powerCrush,
      crouchingStatus: move.crouchingStatus,
      jumpStatus: move.jumpStatus,
      homing: move.homing,
      screw: move.screw,
      wallBound: move.wallBound,
      note: move.note,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="名前" required>
        <Input {...register('name')} />
        {errors.name && <span>This field is required</span>}
      </FormGroup>

      <FormGroup label="カナ">
        <Input {...register('kana')} />
      </FormGroup>

      <FormGroup label="発生フレーム">
        <Input {...register('startUpFrame')} />
        {errors.startUpFrame?.message && <span>{errors.startUpFrame.message}</span>}
      </FormGroup>

      <FormGroup label="ステータス">
        <FormInline>
          <CheckBox id="powerCrush" label="パワークラッシュ">
            <input id="powerCrush" type="checkbox" {...register('powerCrush')} />
          </CheckBox>
          <CheckBox id="homing" label="ホーミング">
            <input id="homing" type="checkbox" {...register('homing')} />
          </CheckBox>
          <CheckBox id="screw" label="スクリュー">
            <input id="screw" type="checkbox" {...register('screw')} />
          </CheckBox>
          <CheckBox id="wallBound" label="ウォールバウンド">
            <input id="wallBound" type="checkbox" {...register('wallBound')} />
          </CheckBox>
          <CheckBox id="crouchingStatus" label="しゃがみステータス">
            <input id="crouchingStatus" type="checkbox" {...register('crouchingStatus')} />
          </CheckBox>
          <CheckBox id="jumpStatus" label="ジャンプステータス">
            <input id="jumpStatus" type="checkbox" {...register('jumpStatus')} />
          </CheckBox>
        </FormInline>
      </FormGroup>

      <FormGroup label="動画">
        <input type="hidden" {...register('moveVideoId')} />
        <MoveVideoInput
          onCreate={moveVideo => {
            setValue('moveVideoId', moveVideo.id);
          }}
        />

        {move && move.moveVideo && (
          <VideoPlayer src={move.moveVideo.m3u8Url} thumnailUrl={move.moveVideo.thumbnailUrl} />
        )}
      </FormGroup>

      <FormGroup label="備考">
        <TextArea {...register('note')} />
      </FormGroup>

      <FormGroup>
        <Button type="submit" variant="contained">
          登録する
        </Button>
      </FormGroup>
    </form>
  );
};

interface MoveVideoInputProps {
  onCreate: (moveVideo: MoveVideoFragment) => void;
}

export const MoveVideoInput: React.FC<MoveVideoInputProps> = ({ onCreate }) => {
  const [file, setFile] = useState<File>();
  const setLoading = useSetRecoilState(loadingState);

  const [ceateMoveVideo, { loading }] = useCreateMoveVideoMutation({
    onCompleted: data => {
      if (!data.createMoveVideo) return;
      if (!file) return;

      const fields = JSON.parse(data.createMoveVideo.videoUpload.fields);

      const formData = new FormData();
      for (const key in fields) {
        formData.append(key, fields[key]);
      }
      formData.append('file', file);

      fetch(data.createMoveVideo.videoUpload.url, {
        method: 'POST',
        headers: { Accept: 'multipart/form-data' },
        body: formData,
      })
        .then(() => {
          if (!data.createMoveVideo) return;

          onCreate(data.createMoveVideo.moveVideo);
        })
        .catch(() => {
          toast.error('アップロードに失敗しました。');
        });
    },
    onError: () => {
      toast.error('アップロードに失敗しました。');
    },
  });

  setLoading(loading);

  return (
    <Input
      type="file"
      id="video"
      accept="video/mp4"
      onChange={event => {
        const target = event.target;
        if (!target.files) return;
        const file = target.files[0];
        if (!file) return;

        setFile(file);
        ceateMoveVideo();
      }}
    />
  );
};
