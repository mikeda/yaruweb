import React from 'react';
import { useRouter } from 'next/router';

import { OpponentStateEnum, useMoveQuery } from '@/lib/graphql/types';
import { NotFound } from '@/components/NotFound';
import { Heading } from '@/components/Heading';
import { OpponentStateText, OpponentStateTypeText } from '@/lib/graphql/enum_texts';

const Page: React.FC = () => {
  const router = useRouter();

  const moveId = router.query.moveId as string;
  const { data, loading, error } = useMoveQuery({ variables: { id: moveId } });

  if (!moveId) return <NotFound>Loading...</NotFound>;
  if (loading) return <NotFound>技データがありません。</NotFound>;
  if (error) return <NotFound>技データの読み込みに失敗しました。</NotFound>;
  if (!data) return <NotFound>技データがありません。</NotFound>;

  return (
    <>
      <Heading lv="h1">アクション登録</Heading>

      {data.move.actions.map(action => (
        <div key={action.id}>
          {action.opponentStates.length > 0 &&
            action.opponentStates.map(opponentState => {
              return (
                <div key={opponentState.id}>
                  <div>{OpponentStateTypeText[opponentState.type]}</div>
                  {opponentState.state !== OpponentStateEnum.Unchanged && (
                    <div>{OpponentStateText[opponentState.state]}</div>
                  )}
                  {opponentState.frame !== null && opponentState.frame !== undefined && (
                    <div>{opponentState.frame}</div>
                  )}
                </div>
              );
            })}
          <div>{action.damage}</div>
        </div>
      ))}
    </>
  );
};

export default Page;
