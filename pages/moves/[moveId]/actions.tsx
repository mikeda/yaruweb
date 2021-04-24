import React from 'react';
import { useRouter } from 'next/router';

import { useMoveQuery } from '@/lib/graphql/types';
import { NotFound } from '@/components/NotFound';

import { Heading } from '@/components/Heading';
import { AttackActionForm } from '@/pages-lib/moves/actions/AttackActionForm';
import { Action } from '@/pages-lib/moves/actions/Action';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';

const Actions: React.FC<{ moveId: string }> = ({ moveId }) => {
  const { data, loading, error, refetch } = useMoveQuery({ variables: { id: moveId } });

  if (loading) return <NotFound>Loading...</NotFound>;
  if (error) return <NotFound>技データの読み込みに失敗しました。</NotFound>;
  if (!data) return <NotFound>技データがありません。</NotFound>;

  return (
    <>
      {data.move.actions.map(action => (
        <Action key={action.id} action={action} onCreateFrame={refetch} />
      ))}

      <AttackActionForm moveId={data.move.id} onCreate={refetch} />
    </>
  );
};

const Page: React.FC = () => {
  const router = useRouter();

  const moveId = router.query.moveId;
  if (!moveId) return <NotFound>Loading...</NotFound>;

  return (
    <Content>
      <Head title="アクションを登録" />

      <Heading lv="h1">アクション登録</Heading>
      <Actions moveId={moveId as string} />
    </Content>
  );
};

export default Page;
