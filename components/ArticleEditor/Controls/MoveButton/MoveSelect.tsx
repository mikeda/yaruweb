import React from 'react';
import Select from 'react-select';
import { useMoveSelectOptionsQuery } from '@/lib/graphql/types';
import { FormGroup } from '@/components/form2/FormGroup';

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

  const options = data.moveCategories.map(moveCategory => ({
    label: moveCategory.name,
    options: moveCategory.moves.map(move => ({ label: move.name, value: move.id })),
  }));

  return (
    <FormGroup>
      <Select
        options={options}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(option: any) => {
          if (!option) return;

          onChange(option.value as string);
        }}
      />
    </FormGroup>
  );
};
