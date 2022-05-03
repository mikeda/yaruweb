import React from 'react';
import { useComboSelectOptionsQuery } from '@/lib/$types';
import { Select } from '@mui/material';

interface Props {
  characterSlug: string;
  onChange: (comboId: string) => void;
}

export const ComboSelect: React.FC<Props> = ({ characterSlug, onChange }) => {
  const { data, error, loading } = useComboSelectOptionsQuery({ variables: { characterSlug } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>読み込みに失敗しました。</p>;
  if (!data) return <p>読み込みに失敗しました。</p>;
  if (data.comboCategories.length === 0) return <p>技データが登録されていません。</p>;

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

      {data.comboCategories.map(comboCategory => (
        <>
          <optgroup label={comboCategory.name} />
          {comboCategory.combos.map(combo => (
            <option key={combo.id} value={combo.id}>
              {combo.command}
            </option>
          ))}
        </>
      ))}
    </Select>
  );
};
