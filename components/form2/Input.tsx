import React from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';

import styles from './Input.module.scss';

type Props = Partial<UseFormRegisterReturn> & { type?: string };

export const Input: React.FC<Props> = props => <input className={styles.input} {...props} />;
