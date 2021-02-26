import React from 'react';
import { useRouter } from 'next/router';

import { CommandFragment, useMoveQuery, useOperationsQuery, useStatesQuery } from '@/lib/graphql/types';
import { NotFound } from '@/components/NotFound';
import { Heading } from '@/components/Heading';
import { Command } from '@/components/Command';
import { CommandForm } from '@/components/CommandForm';

interface CreateFormProps {
  moveId: string;
  characterSlug: string;
  onCreate: (command: CommandFragment) => void;
}
const CreateForm: React.FC<CreateFormProps> = ({ moveId, characterSlug, onCreate }) => {
  const { data: operationData } = useOperationsQuery();
  const { data: stateData } = useStatesQuery({ variables: { characterSlug } });

  if (!operationData || !stateData) return null;

  return (
    <CommandForm
      moveId={moveId}
      allOperations={operationData.operations}
      states={stateData.states}
      onCreate={onCreate}
    />
  );
};

const Page: React.FC = () => {
  const router = useRouter();

  const moveId = router.query.moveId as string;
  const { data, loading, error, refetch } = useMoveQuery({ variables: { id: moveId } });

  if (!moveId) return <NotFound>Loading...</NotFound>;
  if (loading) return <NotFound>技データがありません。</NotFound>;
  if (error) return <NotFound>技データの読み込みに失敗しました。</NotFound>;
  if (!data) return <NotFound>技データがありません。</NotFound>;

  return (
    <>
      <Heading lv="h1">コマンド登録</Heading>

      {data.move.commands.map(command => (
        <div key={command.id}>
          <Command command={command} />
        </div>
      ))}

      <CreateForm
        moveId={moveId}
        characterSlug={data.move.character.slug}
        onCreate={() => {
          refetch();
        }}
      />
    </>
  );
};

export default Page;
