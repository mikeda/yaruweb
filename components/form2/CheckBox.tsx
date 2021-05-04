import React from 'react';

type Props = {
  id: string;
  label: string;
};

export const CheckBox: React.FC<Props> = ({ id, label, children }) => {
  return (
    <div className="el_form_checkbox">
      {children}
      <label htmlFor={id}>
        <span className="el_form_checkbox_check"></span>
        <span className="el_form_checkbox_label">{label}</span>
      </label>
    </div>
  );
};
