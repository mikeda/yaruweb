import React from 'react';
import Select from 'react-select';
import { useComboSelectOptionsQuery } from '@/lib/graphql/types';
import { FormGroup } from '@/components/form2/FormGroup';

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

  const options = data.comboCategories.map(comboCategory => ({
    label: comboCategory.name,
    options: comboCategory.combos.map(combo => ({ label: combo.name, value: combo.id })),
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
