import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { OperationFragment } from '@/lib/graphql/types';

import styles from './Operations.module.scss';

interface Props {
  operation: OperationFragment;
}

export const Operation: React.FC<Props> = ({ operation }) => {
  if (operation.key === 'next') return <FontAwesomeIcon icon={faChevronRight} className={styles.next} />;

  return (
    <>
      {operation.icon ? (
        <img
          className={styles.commandIcon}
          src={`https://yarouyo.s3-ap-northeast-1.amazonaws.com/site/operations/${operation.key}.svg`}
        />
      ) : (
        <span className={styles.commandText}>{operation.name}</span>
      )}
    </>
  );
};
