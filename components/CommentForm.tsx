import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import styles from './CommentForm.module.scss';
import { CommentWrapper } from './Comment';
import { useCurrentPlayer } from 'hooks/useCurrentPlayer';

interface Props {
  onSubmit: (message: string) => void;
}

export const CommentForm: React.FC<Props> = ({ onSubmit }) => {
  const { currentPlayer } = useCurrentPlayer();

  if (!currentPlayer) return null;

  return (
    <CommentWrapper player={currentPlayer}>
      <Formik
        initialValues={{ message: '' }}
        validationSchema={Yup.object({
          message: Yup.string().required('コメントを入力して下さい。'),
        })}
        onSubmit={(attributes, { resetForm }) => {
          onSubmit(attributes.message);
          resetForm();
        }}
      >
        {({ isValid, dirty }) => (
          <Form className={styles.container}>
            <Field name="message" as="textarea" rows={4} placeholder="メッセージを入力" className="el_form_input" />

            <div className={styles.footer}>
              <button type="submit" disabled={!dirty || !isValid} className="el_btn">
                コメントする
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </CommentWrapper>
  );
};
