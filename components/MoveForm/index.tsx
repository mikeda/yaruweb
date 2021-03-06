import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import { MoveAttributes, MoveFragment, useMoveCategoriesQuery, useStatesQuery } from '@/lib/graphql/types';
import { FormGroup } from '../form/FormGroup';
import { MoveCategoryOptions } from './MoveCategoryOptions';
import { FormSelect } from '../form/FormSelect';
import { FormCheck } from '../form/FormCheck';
import { StateOptions } from './StateOptions';
import { NotFound } from '../NotFound';

interface Props {
  characterSlug: string;
  move?: MoveFragment;
  onSubmit: (attributes: MoveAttributes) => void;
  loading: boolean;
}

export const MoveForm: React.FC<Props> = ({ characterSlug, move, onSubmit, loading }) => {
  const { data: moveCategoriesData } = useMoveCategoriesQuery({ variables: { characterSlug } });
  const { data: statesData } = useStatesQuery({ variables: { characterSlug } });

  if (!moveCategoriesData || !statesData) return <NotFound>Loading...</NotFound>;

  return (
    <Formik<MoveAttributes>
      initialValues={{
        moveCategoryId: move ? move.moveCategoryId : '',
        afterStateId: move ? move.afterState.id : '',
        name: move ? move.name : '',
        kana: move ? move.kana : '',
        startUpFrame: move?.startUpFrame,
        rage: move ? move.rage : false,
        comboStarter: move ? move.comboStarter : false,
        powerCrush: move ? move.powerCrush : false,
        crouchingStatus: move ? move.crouchingStatus : false,
        jumpStatus: move ? move.jumpStatus : false,
        homing: move ? move.homing : false,
        screw: move ? move.screw : false,
        wallBound: move ? move.wallBound : false,
        youtubeVideoId: move?.youtubeVideoId,
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('技名を入力して下さい。'),
      })}
      onSubmit={attributes => {
        onSubmit(attributes);
      }}
    >
      {({ isValid }) => {
        return (
          <Form>
            <FormGroup name="name" placeholder="技名" type="text" />

            <FormSelect name="moveCategoryId" label="カテゴリ">
              <MoveCategoryOptions moveCategories={moveCategoriesData.moveCategories} />
            </FormSelect>

            <FormSelect name="afterStateId" label="技後の状態">
              <StateOptions states={statesData.states} />
            </FormSelect>

            <FormCheck name="rage" label="レイジ中" />
            <FormCheck name="comboStarter" label="コンボ始動" />
            <FormCheck name="powerCrush" label="パワークラッシュ" />
            <FormCheck name="homing" label="ホーミング" />
            <FormCheck name="screw" label="スクリュー" />
            <FormCheck name="wallBound" label="ウォールバウンド" />
            <FormCheck name="crouchingStatus" label="しゃがみステータス" />
            <FormCheck name="jumpStatus" label="ジャンプステータス" />

            <FormGroup name="youtubeVideoId" placeholder="動画(YouTubeのID)" type="text" />

            <FormGroup name="startUpFrame" placeholder="発生" type="number" />

            <div className="el_form_group">
              <button type="submit" disabled={loading || !isValid} className="el_btn">
                登録する
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
