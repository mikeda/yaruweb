import React from 'react';

import { CommandFragment } from '@/lib/graphql/types';
import { Operation } from './Operation';

import { Wrapper } from './Wrapper';

import styles from './Operations.module.scss';

interface Props {
  command: CommandFragment;
}

export const Command: React.FC<Props> = ({ command }) => {
  return (
    <Wrapper>
      {command.state && command.state.name !== '立ち' && (
        <span className={styles.commandText}>{command.state.name}中</span>
      )}
      {command.operations.map((operation, i) => (
        <Operation operation={operation} key={i} />
      ))}
    </Wrapper>
  );
};
