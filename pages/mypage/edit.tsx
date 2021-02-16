import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { useUpdatePlayerMutation } from '@/lib/graphql/types';
import { PlayerValidator } from '@/lib/validators/PlayerValidator';
import { FormGroup } from '@/components/form/FormGroup';
import { Heading } from '@/components/Heading';
import { useCurrentPlayer } from 'hooks/useCurrentPlayer';

interface Props {
  currentPlayer: {
    name: string;
    slug: string;
  };
}

const PlayerEditForm: React.FC<Props> = ({ currentPlayer }) => {
  const [updatePlayer] = useUpdatePlayerMutation();

  return (
    <Formik
      initialValues={currentPlayer}
      validationSchema={Yup.object({
        name: PlayerValidator.name,
        slug: PlayerValidator.slug,
      })}
      onSubmit={(values, { setSubmitting }) => {
        updatePlayer({ variables: { ...values } })
          .then(({ data, errors }) => {
            if (errors) {
            } else if (data) {
              alert('更新しました。');
            } else {
              // FIXME: エラー処理
            }
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting, isValid, dirty }) => {
        return (
          <Form>
            <FormGroup name="name" label="プレイヤー名" type="text" />
            <FormGroup name="slug" label="プレイヤーID" type="text" />
            <div className="el_form_group">
              <button type="submit" disabled={isSubmitting || !dirty || !isValid} className="el_btn">
                更新する
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const Page: React.FC = () => {
  // FIXME: データを取り直す
  const { currentPlayer } = useCurrentPlayer();

  return (
    <>
      <Heading lv="h1">プレイヤー情報を更新</Heading>

      {currentPlayer && <PlayerEditForm currentPlayer={currentPlayer} />}
    </>
  );
};

export default Page;
