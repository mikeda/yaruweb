import React from 'react';
import { ErrorMessage, Field } from 'formik';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  type: string;
}

export const FormGroup: React.FC<Props> = ({ name, label, type, placeholder }) => (
  <div className="el_form_group">
    {label && (
      <label htmlFor={name} className="el_form_label">
        {label}
      </label>
    )}
    <Field name={name} type={type} placeholder={placeholder} className="el_form_input" />
    <ErrorMessage name={name} render={msg => <div className="el_form_error">{msg}</div>} />
  </div>
);
