import React from 'react';

import { OperationEnum } from '@/lib/graphql/types';
import { Operations } from '../Command/Operations';
import { Operation } from '../Command/Operation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';

import styles from './OperationListSelector.module.scss';

interface Props {
  operations: OperationEnum[];
  onClickOperation: (operation: OperationEnum) => void;
  onDeleteLast: () => void;
}

export const OperationListSelector: React.FC<Props> = ({ operations, onClickOperation, onDeleteLast }) => {
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

      {Object.values(OperationEnum).forEach(operation => (
        <button
          key={operation}
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
