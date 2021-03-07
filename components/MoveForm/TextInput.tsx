import React from 'react';

interface Props {
  name: string;
  value?: string;
  placeholder?: string;
}

export const TextInput: React.FC<Props> = ({ name, value, placeholder }) => {
  return <input className="el_form_input" type="text" name={name} value={value} placeholder={placeholder} />;
};
