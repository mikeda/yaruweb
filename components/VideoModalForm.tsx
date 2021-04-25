import React from 'react';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import Modal from 'react-modal';
import * as Yup from 'yup';

import { useCreateVideoMutation } from '@/lib/graphql/types';
import { FormGroup } from './form/FormGroup';
import { Routes } from '@/lib/Routes';

const modalStyle = {
  content: {
    top: '50%',
    right: 'auto',
    bottom: 'auto',
    left: '50%',
    width: 200,
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const VideoFormModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const [createVideo, { loading }] = useCreateVideoMutation({
    onCompleted: ({ createVideo: res }) => {
      if (!res) return;

      router.push(Routes.video.detail(res.video.id));
    },
    onError: e => {
      alert(e.message);
    },
  });

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={modalStyle}>
      <Formik
        initialValues={{ url: '' }}
        validationSchema={Yup.object({
          url: Yup.string().required('URLを入力して下さい。'),
        })}
        onSubmit={values => {
          createVideo({ variables: { ...values } });
        }}
      >
        {({ isValid, dirty }) => (
          <Form>
            <FormGroup name="url" label="動画URL" type="text" />
            <div className="el_form_group">
              <button type="submit" disabled={loading || !dirty || !isValid} className="el_btn">
                登録する
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
