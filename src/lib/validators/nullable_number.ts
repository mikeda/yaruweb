import * as yup from 'yup';

export const nullableNumber = yup
  .number()
  .integer()
  .nullable()
  .transform((value, originalValue) => (originalValue === '' ? null : value));

export const nullableFloat = yup
  .number()
  .nullable()
  .transform((value, originalValue) => (originalValue === '' ? null : value));
