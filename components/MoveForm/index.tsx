import React from 'react';
import { useForm } from 'react-hook-form';

import { MoveAttributes, MoveFragment, useMoveCategoriesQuery, useStatesQuery } from '@/lib/graphql/types';
import { NotFound } from '../NotFound';
import { OpponentStateEnumText } from '@/lib/graphql/enum_texts';
import { FormGroup } from './FormGrouup';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';
import { CheckBox } from './CheckBox';

interface Props {
  characterSlug: string;
  move?: MoveFragment;
  onSubmit: (attributes: MoveAttributes) => void;
  loading: boolean;
}

export const MoveForm: React.FC<Props> = ({ characterSlug, move, onSubmit, loading }) => {
  const { data: moveCategoriesData } = useMoveCategoriesQuery({ variables: { characterSlug } });
  const { data: statesData } = useStatesQuery({ variables: { characterSlug } });
  const { register, errors, handleSubmit } = useForm<MoveAttributes>({
    defaultValues: {
      moveCategoryId: move?.moveCategoryId,
      name: move?.name,
      afterStateId: move?.afterState?.id,
      opponentState: move?.opponentState,
      startUpFrame: move?.startUpFrame,
      youtubeVideoId: move?.youtubeVideoId,
      rage: move?.rage,
      comboStarter: move?.comboStarter,
      powerCrush: move?.powerCrush,
      homing: move?.homing,
      screw: move?.screw,
      wallBound: move?.wallBound,
      crouchingStatus: move?.crouchingStatus,
      jumpStatus: move?.jumpStatus,
    },
  });

  if (!moveCategoriesData || !statesData) return <NotFound>Loading...</NotFound>;

  const checkBoxes: [string, string][] = [
    ['rage', 'レイジ中'],
    ['comboStarter', 'コンボ始動'],
    ['powerCrush', 'パワークラッシュ'],
    ['homing', 'ホーミング'],
    ['screw', 'スクリュー'],
    ['wallBound', 'ウォールバウンド'],
    ['crouchingStatus', 'しゃがみステータス'],
    ['jumpStatus', 'ジャンプステータス'],
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <input className="el_form_input" name="name" placeholder="技名" ref={register({ required: true })} />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label name="moveCategoryId">カテゴリ</Label>
        <div className="el_form_select">
          <select className="el_form_input" name="moveCategoryId" ref={register}>
            {moveCategoriesData.moveCategories.map(moveCategory => (
              <option key={moveCategory.id} value={moveCategory.id}>
                {moveCategory.name}
              </option>
            ))}
          </select>
        </div>
      </FormGroup>

      <FormGroup>
        <Label name="afterStateId">技後の状態</Label>
        <div className="el_form_select">
          <select className="el_form_input" name="afterStateId" ref={register({ setValueAs: v => v || null })}>
            <option value=""></option>
            {statesData.states.map(state => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      </FormGroup>

      <FormGroup>
        <Label name="opponentState">相手の状態</Label>
        <div className="el_form_select">
          <select className="el_form_input" name="opponentState" ref={register({ setValueAs: v => v || null })}>
            <option value=""></option>
            {Object.entries(OpponentStateEnumText).map(([key, value]) => (
              <option value={key} key={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </FormGroup>

      <FormGroup>
        <input className="el_form_input" name="youtubeVideoId" placeholder="動画(YouTubeのID)" ref={register} />
      </FormGroup>

      <FormGroup>
        <input
          className="el_form_input"
          name="startUpFrame"
          type="number"
          placeholder="発生"
          ref={register({ valueAsNumber: true })}
        />
      </FormGroup>

      {checkBoxes.map(([name, label]) => (
        <CheckBox key={name} name={name} label={label}>
          <input type="checkbox" id={name} name={name} ref={register} />
        </CheckBox>
      ))}

      <div className="el_form_group">
        <button type="submit" disabled={loading} className="el_btn">
          登録する
        </button>
      </div>
    </form>
  );
};
