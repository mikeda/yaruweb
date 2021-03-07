import React from 'react';

interface Props {
  name: string;
}

export const Label: React.FC<Props> = ({ name, children }) => (
  <label htmlFor={name} className="el_form_label">
    {children}
  </label>
);
