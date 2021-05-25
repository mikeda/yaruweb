import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  ComboAttributes,
  ComboFragment,
  ComboVideoFragment,
  ConditionFragment,
  OperationFragment,
  StateFragment,
  useCreateComboVideoMutation,
} from '@/lib/graphql/types';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/blocks/Button';
import { FormGroup } from '@/components/form2/FormGroup';
import { Input } from '@/components/form2/Input';
import { TextArea } from './form2/TextArea';
import { OperationListSelector } from './OperationListSelector';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';
import { toast } from 'react-toastify';
import { VideoPlayer } from './MoveMedia/VideoPlayer';
import { CheckBox } from './form2/CheckBox';

const schema = yup.object().shape({
  name: yup.string().required(),
  startUpFrame: yup.number().integer().min(0),
});

interface Props {
  combo?: ComboFragment;
  states: StateFragment[];
  conditions: ConditionFragment[];
  onSubmit: (attributes: ComboAttributes) => void;
}

export const ComboForm: React.FC<Props> = ({ combo, states, conditions, onSubmit }) => {
  const [operations, setOperations] = useState<OperationFragment[]>(combo?.operations || []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ComboAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: combo && {
      name: combo.name,
      damage: combo.damage,
      note: combo.note,
      operationIds: combo.operations.map(o => o.id),
      comboVideoId: combo.comboVideo?.id,
      conditionIds: combo.conditions.map(c => c.id),
    },
  });
  const conditionIds = watch('conditionIds');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="名前" required>
        <Input {...register('name')} />
        {errors.name && <span>This field is required</span>}
      </FormGroup>

      <FormGroup label="ダメージ">
        <Input type="number" {...register('damage', { valueAsNumber: true })} />
      </FormGroup>

      <FormGroup label="条件">
        {conditions.map((condition, i) => {
          const id = `conditionIdsDummy.${i}` as const;

          return (
            <CheckBox key={i} id={id} label={condition.name}>
              <input
                id={id}
                type="checkbox"
                checked={conditionIds.includes(condition.id)}
                onChange={e => {
                  let newConditionIds: string[];
                  if (e.target.checked) {
                    newConditionIds = [...conditionIds, condition.id];
                  } else {
                    newConditionIds = conditionIds.filter(id => id !== condition.id);
                  }
                  setValue('conditionIds', newConditionIds);
                }}
              />
            </CheckBox>
          );
        })}
      </FormGroup>

      <FormGroup label="状態">
        <select {...register('stateId')}>
          {states.map(state => (
            <option value={state.id} key={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </FormGroup>

      <FormGroup label="コマンド">
        <OperationListSelector
          operations={operations}
          onClickOperation={operation => {
            const newOperations = [...operations, operation];
            setOperations(newOperations);
            setValue(
              'operationIds',
              newOperations.map(o => o.id),
            );
          }}
          onDeleteLast={() => {
            const newOperations = operations.slice(0, operations.length - 1);
            setOperations(newOperations);
            setValue(
              'operationIds',
              newOperations.map(o => o.id),
            );
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
        <Button>
          <input type="submit" />
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
