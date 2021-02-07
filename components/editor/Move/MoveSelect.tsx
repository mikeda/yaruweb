import React from 'react';
import Select from 'react-select';
import { useMovesQuery } from '@/lib/graphql/types';

interface Props {
  characterSlug: string;
  moveId?: string;
  onChange: (moveId: string) => void;
}

export const MoveSelect: React.FC<Props> = ({ characterSlug, moveId, onChange }) => {
  const { data, error, loading } = useMovesQuery({ variables: { characterSlug } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>読み込みに失敗しました。</p>;
  if (!data) return <p>読み込みに失敗しました。</p>;

  const moveOptions: { label: string; value: string }[] = data.moves.map(move => ({
    label: move.name,
    value: move.id,
  }));

  return (
    <Select
      value={moveOptions.find(move => move.value === moveId)}
      options={moveOptions}
      onChange={e => {
        if (!e) return;

        onChange(e.value);
      }}
      placeholder="技選択"
    />
  );
};
