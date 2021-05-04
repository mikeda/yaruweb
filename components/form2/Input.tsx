import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export const Input = (props: Partial<UseFormRegisterReturn> & { type?: string }) => <input {...props} />;
