import React from 'react';

import { OperationFragment } from '@/lib/graphql/types';

import styles from './Operations.module.scss';

interface Props {
  operation: OperationFragment;
}

export const Operation: React.FC<Props> = ({ operation }) => {
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
