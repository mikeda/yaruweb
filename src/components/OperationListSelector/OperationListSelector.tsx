import React from 'react';

import { OperationFragment, useOperationsQuery } from '@/lib/graphql/types';
import { Operations } from '../Command/Operations';
import { Operation } from '../Command/Operation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';

import styles from './OperationListSelector.module.scss';

interface Props {
  operations: OperationFragment[];
  onClickOperation: (operation: OperationFragment) => void;
  onDeleteLast: () => void;
}

export const OperationListSelector: React.FC<Props> = ({ operations, onClickOperation, onDeleteLast }) => {
  const { data } = useOperationsQuery();

  return (
    <>
      <Operations operations={operations} />

      <FontAwesomeIcon
        className={styles.backspace}
        icon={faBackspace}
        onClick={e => {
          e.preventDefault();
          onDeleteLast();
        }}
      />

      {data &&
        data.operations.map(operation => (
          <button
            key={operation.id}
            onClick={e => {
              e.preventDefault();
              onClickOperation(operation);
            }}
          >
            <Operation operation={operation} />
          </button>
        ))}
    </>
  );
};
