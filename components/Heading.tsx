import React from 'react';

import styles from './Heading.module.scss';

interface Props {
  lv: 'h1' | 'h2' | 'h3' | 'h4';
  tag?: keyof JSX.IntrinsicElements;
}

export const Heading: React.FC<Props> = ({ lv, tag, children }) => {
  const HtmlTag = tag || lv;
  return <HtmlTag className={styles[lv]}>{children}</HtmlTag>;
};
