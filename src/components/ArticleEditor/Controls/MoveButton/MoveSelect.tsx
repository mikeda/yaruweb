import React from 'react';

import { TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';

import { useMoveSelectOptionsQuery } from '@/lib';

interface Props {
  characterSlug: string;
  onChange: (moveId: string) => void;
}

interface Option {
  id: string;
  name: string;
  categoryName: string;
}

export const MoveSelect: React.FC<Props> = ({ characterSlug, onChange }) => {
  const { data, error, loading } = useMoveSelectOptionsQuery({ variables: { characterSlug } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>読み込みに失敗しました。</p>;
  if (!data) return <p>読み込みに失敗しました。</p>;
  if (data.moveCategories.length === 0) return <p>技データが登録されていません。</p>;

  const options: Option[] = [];
  data.moveCategories.forEach(moveCategory => {
    moveCategory.moves.forEach(move => {
      options.push({
        id: move.id,
        name: move.name,
        categoryName: moveCategory.name,
      });
    });
  });

  return (
    <Autocomplete<Option, undefined, true>
      options={options}
      getOptionLabel={option => option.name}
      groupBy={option => option.categoryName}
      onChange={(e, option) => {
        onChange(option.id);
      }}
      renderInput={params => <TextField {...params} label="コマンド" variant="outlined" fullWidth size="small" />}
      disableClearable
    />
  );
};
