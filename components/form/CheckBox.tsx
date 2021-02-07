import React from 'react';

type Props = {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const CheckBox: React.FC<Props> = ({ id, name, label, checked, onChange }) => {
  return (
    <div className="el_form_checkbox">
      <input type="hidden" name={name} value={0} />
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        value={checked ? 1 : 0}
        onChange={e => {
          onChange(e.target.checked);
        }}
      />
      <label htmlFor={id}>
        <span className="el_form_checkbox_check"></span>
        <span className="el_form_checkbox_label">{label}</span>
      </label>
    </div>
  );
};
