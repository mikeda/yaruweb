import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import {
  AttackMoveAttributes,
  MoveAttributes,
  MoveFragment,
  MoveVideoFragment,
  useCreateMoveVideoMutation,
} from '@/lib/graphql/types';
import { useForm } from 'react-hook-form';
import { loadingState } from '@/states/loading';
import { VideoPlayer } from '../MoveMedia/VideoPlayer';
import { nullableNumber } from '@/lib/validators/nullable_number';
import { CheckBox, TextArea, Input, FormGroup, FormInline } from '@/components';
import { Button } from '@material-ui/core';

const schema = yup.object().shape({
  name: yup.string().required(),
  'attackMove.startUpFrame': nullableNumber,
  attackMove: yup.object({
    startUpFrame: nullableNumber,
  }),
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
  } = useForm<AttackMoveAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: move && {
      move: {
        moveVideoId: move.moveVideo?.id,
        name: move.name,
        kana: move.kana,
        note: move.note,
      },
      attack:
        move.moveable.__typename === 'AttackMove'
          ? {
              startUpFrame: move.moveable.startUpFrame,
              powerCrush: move.moveable.powerCrush,
              crouchingStatus: move.moveable.crouchingStatus,
              jumpStatus: move.moveable.jumpStatus,
              homing: move.moveable.homing,
              screw: move.moveable.screw,
              wallBound: move.moveable.wallBound,
            }
          : undefined,
      //throwMove:
      //  move.moveable.__typename === 'ThrowMove'
      //    ? {
      //        startUpFrame: move.moveable.startUpFrame,
      //        damage: move.moveable.damage,
      //        throwResult: move.moveable.throwResult,
      //        throwEscape: move.moveable.throwEscape,
      //      }
      //    : undefined,
      //reversalMove:
      //  move.moveable.__typename === 'ReversalMove'
      //    ? {
      //        reversalTarget: move.moveable.reversalTarget,
      //        reversalType: move.moveable.reversalType,
      //      }
      //    : undefined,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="名前" required>
        <Input {...register('move.name')} />
        {errors.move?.name && <span>This field is required</span>}
      </FormGroup>

      <FormGroup label="カナ">
        <Input {...register('move.kana')} />
      </FormGroup>

      <>
        <FormGroup label="発生フレーム">
          <Input {...register('attack.startUpFrame')} />
        </FormGroup>

        <FormGroup label="ステータス">
          <FormInline>
            <CheckBox id="powerCrush" label="パワークラッシュ">
              <input id="powerCrush" type="checkbox" {...register('attack.powerCrush')} />
            </CheckBox>
            <CheckBox id="homing" label="ホーミング">
              <input id="homing" type="checkbox" {...register('attack.homing')} />
            </CheckBox>
            <CheckBox id="screw" label="スクリュー">
              <input id="screw" type="checkbox" {...register('attack.screw')} />
            </CheckBox>
            <CheckBox id="wallBound" label="ウォールバウンド">
              <input id="wallBound" type="checkbox" {...register('attack.wallBound')} />
            </CheckBox>
            <CheckBox id="crouchingStatus" label="しゃがみステータス">
              <input id="crouchingStatus" type="checkbox" {...register('attack.crouchingStatus')} />
            </CheckBox>
            <CheckBox id="jumpStatus" label="ジャンプステータス">
              <input id="jumpStatus" type="checkbox" {...register('attack.jumpStatus')} />
            </CheckBox>
          </FormInline>
        </FormGroup>
      </>

      <FormGroup label="動画">
        <input type="hidden" {...register('move.moveVideoId')} />
        <MoveVideoInput
          onCreate={moveVideo => {
            setValue('move.moveVideoId', moveVideo.id);
          }}
        />

        {move && move.moveVideo && (
          <VideoPlayer src={move.moveVideo.m3u8Url} thumnailUrl={move.moveVideo.thumbnailUrl} />
        )}
      </FormGroup>

      <FormGroup label="備考">
        <TextArea {...register('move.note')} />
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
