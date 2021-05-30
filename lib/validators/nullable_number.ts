import * as yup from 'yup';

export const nullableNumber = yup
  .number()
  .integer()
  .min(0)
  .nullable()
  .transform((value, originalValue) => (originalValue === '' ? null : value));
