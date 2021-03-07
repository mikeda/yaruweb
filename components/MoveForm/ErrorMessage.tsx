import React from 'react';

export const ErrorMessage: React.FC = ({ children }) => {
  return <div className="el_form_error">{children}</div>;
};
