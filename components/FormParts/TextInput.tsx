import React, { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  register: any;
}

export const TextInput: React.FC<Props> = ({ register, ...rest }) => {
  return <input className="el_form_input" ref={register} {...rest}/>;
};
