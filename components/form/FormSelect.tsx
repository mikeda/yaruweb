import React from 'react';
import { ErrorMessage, Field } from 'formik';

interface Props {
  name: string;
  label?: string;
}

export const FormSelect: React.FC<Props> = ({ name, label, children }) => (
  <div className="el_form_group">
    {label && (
      <label htmlFor={name} className="el_form_label">
        {label}
      </label>
    )}
    <div className="el_form_select">
      <Field name={name} as="select" className="el_form_input">
        {children}
      </Field>
    </div>
    <ErrorMessage name={name} render={msg => <div className="el_form_error">{msg}</div>} />
  </div>
);
