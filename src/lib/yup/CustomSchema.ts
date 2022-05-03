import * as yup from 'yup';

export const NullableNumberSchema = yup
  .number()
  .integer()
  .nullable()
  .transform((value, originalValue) => (originalValue === '' ? null : value));

export const NullableFloatSchema = yup
  .number()
  .nullable()
  .transform((value, originalValue) => (originalValue === '' ? null : value));
