import React from 'react';
import { useMoveSelectOptionsQuery } from '@/lib/graphql/types';
import { Select } from '@mui/material';

interface Props {
  characterSlug: string;
  onChange: (moveId: string) => void;
}

export const MoveSelect: React.FC<Props> = ({ characterSlug, onChange }) => {
  const { data, error, loading } = useMoveSelectOptionsQuery({ variables: { characterSlug } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>読み込みに失敗しました。</p>;
  if (!data) return <p>読み込みに失敗しました。</p>;
  if (data.moveCategories.length === 0) return <p>技データが登録されていません。</p>;

  return (
    <Select
      onChange={option => {
        if (!option) return;

        onChange(option.target.value as string);
      }}
      defaultValue=""
      native
    >
      <option value=""></option>

      {data.moveCategories.map(moveCategory => (
        <>
          <optgroup label={moveCategory.name} />
          {moveCategory.moves.map(move => (
            <option key={move.id} value={move.id}>
              {move.name}
            </option>
          ))}
        </>
      ))}
    </Select>
  );
};
