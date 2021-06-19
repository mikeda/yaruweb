import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { TournamentAttributes, TournamentFragment } from '@/lib/graphql/types';
import { Button, TextArea, Input, FormGroup } from '@/components';
import dayjs from '@/lib/dayjs';

const schema = yup.object().shape({
  name: yup.string().required(),
  organizerName: yup.string().required(),
  organizerTwitterId: yup.string(),
  url: yup.string().url(),
  streamingUrl: yup.string().url(),
  startsAt: yup.string(),
  description: yup.string().required(),
});

interface Props {
  tournament?: TournamentFragment;
  onSubmit: (attributes: TournamentAttributes) => void;
}

export const TournamentForm: React.FC<Props> = ({ tournament, onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TournamentAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: tournament
      ? {
          name: tournament.name,
          organizerName: tournament.organizerName,
          organizerTwitterId: tournament.organizerTwitterId,
          url: tournament.url,
          streamingUrl: tournament.streamingUrl,
          startsAt: tournament.startsAt,
          description: tournament.description,
        }
      : {
          startsAt: dayjs().add(1, 'date').hour(18).minute(0).second(0).format('YYYY-MM-DD HH:mm'),
        },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="イベント名" required>
        <Input {...register('name')} />
        {errors.name && <span>This field is required</span>}
      </FormGroup>

      <FormGroup label="URL">
        <Input {...register('url')} />
        {errors.url && <span>{errors.url.message}</span>}
      </FormGroup>

      <FormGroup label="配信URL" required>
        <Input {...register('streamingUrl')} />
        {errors.streamingUrl && <span>{errors.streamingUrl.message}</span>}
      </FormGroup>

      <FormGroup label="主催者名" required>
        <Input {...register('organizerName')} />
        {errors.organizerName && <span>{errors.organizerName.message}</span>}
      </FormGroup>

      <FormGroup label="主催者のTwitter ID">
        <Input {...register('organizerTwitterId')} />
        {errors.organizerTwitterId && <span>{errors.organizerTwitterId.message}</span>}
      </FormGroup>

      <FormGroup label="イベント概要" required>
        <TextArea {...register('description')} />
        {errors.description && <span>{errors.description.message}</span>}
      </FormGroup>

      <FormGroup label="画像">
        <input
          type="file"
          accept="image/*"
          name="mainImageDummy"
          onChange={e => {
            if (!e.target.files) return;
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = e => {
              if (!e.target) return;

              setValue('mainImage', e.target.result as string);
            };
            reader.readAsDataURL(file);
          }}
        />
        <input type="hidden" name="mainImage" />
      </FormGroup>

      <FormGroup label="開始時間" required>
        <Controller
          control={control}
          name="startsAt"
          render={({ field: { onChange, onBlur, value } }) => (
            <ReactDatePicker
              selected={dayjs(value).toDate()}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm"
              className="el_form_input"
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </FormGroup>

      <FormGroup>
        <Button>
          <input type="submit" />
        </Button>
      </FormGroup>
    </form>
  );
};
