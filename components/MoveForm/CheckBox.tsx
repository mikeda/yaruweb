import React from 'react';

type Props = {
  name: string;
  label: string;
};

export const CheckBox: React.FC<Props> = ({ name, label, children }) => {
  return (
    <div className="el_form_checkbox">
      {children}

      <label htmlFor={name}>
        <span className="el_form_checkbox_check"></span>
        <span className="el_form_checkbox_label">{label}</span>
      </label>
    </div>
  );
};
