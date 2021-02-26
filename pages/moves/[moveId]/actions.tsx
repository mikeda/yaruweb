import React from 'react';
import { useRouter } from 'next/router';

import { useMoveQuery } from '@/lib/graphql/types';
import { NotFound } from '@/components/NotFound';
import { Heading } from '@/components/Heading';
import { Command } from '@/components/Command';

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
        <div key={action.id}>{action.damage}</div>
      ))}
    </>
  );
};

export default Page;
