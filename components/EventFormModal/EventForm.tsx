import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { EventAttributes } from '@/lib/graphql/types';
import { FormGroup } from '@/components/form/FormGroup';
import dayjs from '@/lib/dayjs';

interface Props {
  initialAttributes: EventAttributes;
  onSubmit: (attributes: EventAttributes) => void;
  loading: boolean;
}

export const EventForm: React.FC<Props> = ({ initialAttributes, onSubmit, loading }) => {
  return (
    <Formik<EventAttributes>
      initialValues={initialAttributes}
      validationSchema={Yup.object({
        name: Yup.string().required('イベント名を入力して下さい。'),
        organizerName: Yup.string().required('主催者名を入力して下さい。'),
        organizerTwitterId: Yup.string(),
        url: Yup.string().url().required('イベントURLを入力して下さい。'),
        imageUrl: Yup.string().url().required('サムネイル画像URLを入力して下さい。'),
        streamingUrl: Yup.string().url(),
        videoUrl: Yup.string().url(),
        startsAt: Yup.string().required('開始時間を入力して下さい。'),
        description: Yup.string().required('概要を入力して下さい。'),
      })}
      onSubmit={attributes => {
        onSubmit(attributes);
      }}
    >
      {({ isValid, dirty, values, setFieldValue }) => {
        return (
          <Form>
            <FormGroup name="name" placeholder="イベント名" type="text" />
            <FormGroup name="organizerName" placeholder="主催者" type="text" />
            <FormGroup name="organizerTwitterId" placeholder="主催者のTwitter ID" type="text" />
            <FormGroup name="url" placeholder="イベント情報URL" type="text" />
            <FormGroup name="imageUrl" placeholder="サムネイル画像URL" type="text" />
            <FormGroup name="streamingUrl" placeholder="配信URL" type="text" />
            <FormGroup name="videoUrl" placeholder="アーカイブ動画URL" type="text" />
            <div className="el_form_group">
              <label className="el_form_label">開始時間</label>

              <DatePicker
                className="el_form_input"
                selected={dayjs(values.startsAt).toDate()}
                name="event[starts_at]"
                showTimeSelect={true}
                dateFormat="yyyy-MM-dd HH:mm"
                popperPlacement="top-start"
                onChange={e => {
                  if (e) setFieldValue('startsAt', e as Date);
                }}
              />
            </div>
            <FormGroup name="description" placeholder="イベント概要" type="text" />
            <div className="el_form_group">
              <button type="submit" disabled={loading || !dirty || !isValid} className="el_btn">
                登録する
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
