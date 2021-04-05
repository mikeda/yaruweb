import React from 'react';

import styles from './FormGroup.module.scss';

export const FormGroup: React.FC = ({ children }) => <div className={styles.formGroup}>{children}</div>;
