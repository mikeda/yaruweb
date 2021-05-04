import React from 'react';

import styles from './TextArea.module.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

// eslint-disable-next-line react/display-name
export const TextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => (
  <textarea className={styles.textarea} ref={ref} {...props} />
));
