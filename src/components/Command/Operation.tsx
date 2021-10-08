import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { OperationEnum } from '@/lib/graphql/types';

import styles from './Operations.module.scss';
import { OperationText } from '@/lib/graphql/enum_texts';

interface Props {
  operation: OperationEnum;
}

export const Operation: React.FC<Props> = ({ operation }) => {
  if (operation === OperationEnum.Next) return <FontAwesomeIcon icon={faChevronRight} className={styles.next} />;

  const operationText = OperationText[operation];
  const iconName = operationText.jpKey || operation;

  return (
    <>
      {operationText.icon ? (
        <img
          className={styles.commandIcon}
          src={`https://yarouyo.s3-ap-northeast-1.amazonaws.com/site/operations/${iconName}.svg`}
        />
      ) : (
        <span className={styles.commandText}>{operationText.text}</span>
      )}
    </>
  );
};
