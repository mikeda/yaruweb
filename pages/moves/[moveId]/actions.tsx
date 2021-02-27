import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import {
  ActionFragment,
  AttackActionAttributes,
  OpponentStateEnum,
  useCreateAttackActionMutation,
  useMoveQuery,
} from '@/lib/graphql/types';
import { NotFound } from '@/components/NotFound';

import { Heading } from '@/components/Heading';
import { AttackTypeEnumText, OpponentStateText, OpponentStateTypeText } from '@/lib/graphql/enum_texts';

interface CreateAttackActionFormProps {
  moveId: string;
  onCreate: () => void;
}

const CreateAttackActionForm: React.FC<CreateAttackActionFormProps> = ({ moveId, onCreate }) => {
  const { register, handleSubmit } = useForm<AttackActionAttributes>();
  const [createAttackAction, { loading }] = useCreateAttackActionMutation({
    onCompleted: data => {
      const action = data.createAttackAction?.action;
      if (!action) return;

      onCreate();
    },
    onError: e => {
      alert(e.message);
    },
  });

  const onSubmit = (attributes: AttackActionAttributes) => {
    createAttackAction({ variables: { moveId, attributes } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select name="attackType" ref={register({ required: true })}>
        {Object.entries(AttackTypeEnumText).map(([key, value]) => (
          <option value={key} key={key}>
            {value}
          </option>
        ))}
      </select>

      <input name="damage" type="number" ref={register({ valueAsNumber: true })} />

      <input type="submit" disabled={loading} />
    </form>
  );
};

const Action: React.FC<{ action: ActionFragment }> = ({ action }) => {
  if (!action) return null;

  return (
    <div>
      {action.opponentStates.length > 0 &&
        action.opponentStates.map(opponentState => {
          return (
            <div key={opponentState.id}>
              <div>{OpponentStateTypeText[opponentState.type]}</div>
              {opponentState.state !== OpponentStateEnum.Unchanged && (
                <div>{OpponentStateText[opponentState.state]}</div>
              )}
              {opponentState.frame !== null && opponentState.frame !== undefined && <div>{opponentState.frame}</div>}
            </div>
          );
        })}
      <div>{action.damage}</div>
    </div>
  );
};

const Content: React.FC<{ moveId: string }> = ({ moveId }) => {
  const { data, loading, error, refetch } = useMoveQuery({ variables: { id: moveId } });

  if (loading) return <NotFound>技データがありません。</NotFound>;
  if (error) return <NotFound>技データの読み込みに失敗しました。</NotFound>;
  if (!data) return <NotFound>技データがありません。</NotFound>;

  return (
    <>
      {data.move.actions.map(action => {
        return <Action key={action.id} action={action} />;
      })}

      <CreateAttackActionForm moveId={data.move.id} onCreate={refetch} />
    </>
  );
};

const Page: React.FC = () => {
  const router = useRouter();

  const moveId = router.query.moveId;
  if (!moveId) return <NotFound>Loading...</NotFound>;

  return (
    <>
      <Heading lv="h1">アクション登録</Heading>
      <Content moveId={moveId as string} />
    </>
  );
};

export default Page;
