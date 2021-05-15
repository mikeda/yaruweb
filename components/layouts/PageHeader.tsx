import Link from 'next/link';
import React from 'react';
import { Button } from '../blocks/Button';
import { Heading } from '../Heading';

import styles from './PageHeader.module.scss';

interface Props {
  title: string;
  addPageUrl?: string;
  addButtons?: { label: string; url: string }[];
}
export const PageHeader: React.FC<Props> = ({ title, addPageUrl, addButtons }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Heading lv="h1">{title}</Heading>
      </div>

      <div className={styles.buttons}>
        {addPageUrl && (
          <Button>
            <Link href={addPageUrl}>
              <a>作成する</a>
            </Link>
          </Button>
        )}

        {addButtons &&
          addButtons.map(({ label, url }, i) => (
            <Button key={i}>
              <Link href={url}>
                <a>{label}</a>
              </Link>
            </Button>
          ))}
      </div>
    </div>
  );
};
