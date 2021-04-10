import Link from 'next/link';
import React from 'react';
import styles from './TabLinkGroup.module.scss';

interface Props {
  text: string;
  active: boolean;
  href?: string;
  onClick?: () => void;
}

export const TabLink: React.FC<Props> = ({ text, active, href, onClick }) => {
  const className = active ? styles.itemActive : styles.item;

  if (href) {
    return (
      <Link href={href}>
        <a className={className}>{text}</a>
      </Link>
    );
  }

  if (onClick) {
    return (
      <a
        className={className}
        onClick={event => {
          event.preventDefault();
          onClick();
        }}
      >
        {text}
      </a>
    );
  }

  return <a className={className}>{text}</a>;
};
