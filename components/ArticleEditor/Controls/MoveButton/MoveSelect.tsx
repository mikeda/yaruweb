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
    options: moveCategory.moves.map(move => {
      let label = move.name;
      if (move.commands.length > 0) {
        label += `(${move.commands
          .map(c =>
            c.operations
              .map(o => parseKey(o.key))
              .filter(o => o)
              .join(' '),
          )
          .join(' ')})`;
      }
      return { label, value: move.id };
    }),
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

const parseKey = (key: string): string | null => {
  if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) return key;
  if (['1h', '2h', '3h', '4h', '6h', '7h', '8h', '9h'].includes(key)) return key.replace('h', '');
  if (['lp', 'rp', 'lk', 'rk'].includes(key)) return key.toUpperCase();
  if (
    [
      'lp_rp',
      'lp_lk',
      'lp_rk',
      'rp_lk',
      'rp_rk',
      'lk_rk',
      'lp_rp_lk',
      'lp_rp_rk',
      'lp_lk_rk',
      'rp_lk_rk',
      'lp_rp_lk_rk',
    ].includes(key)
  )
    return key.toUpperCase().replace('_', '+');

  return null;
};
