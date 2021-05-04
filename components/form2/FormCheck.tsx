import { Field } from 'formik';
import React from 'react';

type Props = {
  name: string;
  label: string;
};

export const FormCheck: React.FC<Props> = ({ name, label }) => {
  return (
    <div className="el_form_checkbox">
      <Field type="checkbox" id={name} name={name} />

      <label htmlFor={name}>
        <span className="el_form_checkbox_check"></span>
        <span className="el_form_checkbox_label">{label}</span>
      </label>
    </div>
  );
};
