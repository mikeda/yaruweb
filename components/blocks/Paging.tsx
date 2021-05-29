import { PagingFragment } from '@/lib/graphql/types';
import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import styles from './Paging.module.scss';

interface Props {
  url: (page: number) => string;
  paging: PagingFragment;
}

export const Paging: React.FC<Props> = ({ url, paging }) => {
  return (
    <div className={styles.container}>
      {paging.currentPage > 1 && (
        <Link href={url(paging.currentPage - 1)}>
          <a className={styles.back}>
            <FontAwesomeIcon className={styles.arrowLeft} icon={faArrowLeft} />
            もどる
          </a>
        </Link>
      )}

      {paging.currentPage < paging.totalPages && (
        <Link href={url(paging.currentPage + 1)}>
          <a className={styles.next}>
            次のページへ
            <FontAwesomeIcon className={styles.arrowRight} icon={faArrowRight} />
          </a>
        </Link>
      )}
    </div>
  );
};
