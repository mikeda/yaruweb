import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  ComboAttributes,
  ComboFragment,
  ComboVideoFragment,
  OperationEnum,
  useCreateComboVideoMutation,
} from '@/lib/graphql/types';
import { useForm } from 'react-hook-form';
import { FormGroup } from '@/components/form/FormGroup';
import { Input } from '@/components/form/Input';
import { TextArea } from '../form/TextArea';
import { OperationListSelector } from '../OperationListSelector';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { toast } from 'react-toastify';
import { VideoPlayer } from '../MoveMedia/VideoPlayer';
import { Button } from '@material-ui/core';

const schema = yup.object().shape({
  name: yup.string().required(),
  startUpFrame: yup.number().integer().min(0),
});

interface Props {
  combo?: ComboFragment;
  onSubmit: (attributes: ComboAttributes) => void;
}

export const ComboForm: React.FC<Props> = ({ combo, onSubmit }) => {
  const [operations, setOperations] = useState<OperationEnum[]>(combo?.operations || []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ComboAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: combo && {
      name: combo.name,
      damage: combo.damage,
      note: combo.note,
      operations: combo.operations,
      comboVideoId: combo.comboVideo?.id,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="名前" required>
        <Input {...register('name')} />
        {errors.name && <span>This field is required</span>}
      </FormGroup>

      <FormGroup label="ダメージ">
        <Input type="number" {...register('damage', { valueAsNumber: true })} />
      </FormGroup>

      <FormGroup label="コマンド">
        <OperationListSelector
          operations={operations}
          onClickOperation={operation => {
            const newOperations = [...operations, operation];
            setOperations(newOperations);
            setValue('operations', newOperations);
          }}
          onDeleteLast={() => {
            const newOperations = operations.slice(0, operations.length - 1);
            setOperations(newOperations);
            setValue('operations', newOperations);
          }}
        />
      </FormGroup>

      <FormGroup label="動画">
        <input type="hidden" {...register('comboVideoId')} />
        <ComboVideoInput
          onCreate={comboVideo => {
            setValue('comboVideoId', comboVideo.id);
          }}
        />

        {combo && combo.comboVideo && (
          <VideoPlayer src={combo.comboVideo.m3u8Url} thumnailUrl={combo.comboVideo.thumbnailUrl} />
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

interface ComboVideoInputProps {
  onCreate: (comboVideo: ComboVideoFragment) => void;
}

export const ComboVideoInput: React.FC<ComboVideoInputProps> = ({ onCreate }) => {
  const [file, setFile] = useState<File>();
  const setLoading = useSetRecoilState(loadingState);

  const [ceateComboVideo, { loading }] = useCreateComboVideoMutation({
    onCompleted: data => {
      if (!data.createComboVideo) return;
      if (!file) return;

      const fields = JSON.parse(data.createComboVideo.videoUpload.fields);

      const formData = new FormData();
      for (const key in fields) {
        formData.append(key, fields[key]);
      }
      formData.append('file', file);

      fetch(data.createComboVideo.videoUpload.url, {
        method: 'POST',
        headers: { Accept: 'multipart/form-data' },
        body: formData,
      })
        .then(() => {
          if (!data.createComboVideo) return;

          onCreate(data.createComboVideo.comboVideo);
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
        ceateComboVideo();
      }}
    />
  );
};
