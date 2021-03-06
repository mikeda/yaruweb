import React from 'react';
import { useRouter } from 'next/router';

import {
  CommandFragment,
  useDeleteCommandMutation,
  useMoveQuery,
  useOperationsQuery,
  useStatesQuery,
} from '@/lib/graphql/types';
import { NotFound } from '@/components/NotFound';
import { Heading } from '@/components/Heading';
import { Command as CommandIcons } from '@/components/Command';
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

interface CommandProps {
  command: CommandFragment;
  onDelete: (commandId: string) => void;
}

const Command: React.FC<CommandProps> = ({ command, onDelete }) => {
  const [deleteCommand, { loading }] = useDeleteCommandMutation({
    variables: { commandId: command.id },
    onCompleted: data => {
      const command = data.deleteCommand?.command;
      if (!command) return;

      onDelete(command.id);
    },
    onError: e => {
      alert(e.message);
    },
  });
  return (
    <div>
      <CommandIcons command={command} />
      <button
        className="el_btn el_btn__sm"
        disabled={loading}
        onClick={() => {
          deleteCommand();
        }}
      >
        削除
      </button>
    </div>
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
      <Heading lv="h1">{data.move.name}のコマンド登録</Heading>

      {data.move.commands.map(command => (
        <Command
          key={command.id}
          command={command}
          onDelete={() => {
            refetch();
          }}
        />
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
