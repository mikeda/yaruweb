import React, { useState } from 'react';
import { OpponentStateText, OpponentStateTypeText } from '@/lib/graphql/enum_texts';
import { OpponentStateEnum, OpponentStateFragment, OpponentStateTypeEnum } from '@/lib/graphql/types';

import styles from './Action.module.scss';

interface Props {
  opponentStates: OpponentStateFragment[];
}

export const OpponentStates: React.FC<Props> = ({ opponentStates }) => {
  return (
    <>
      {Object.entries(OpponentStateTypeEnum).map(([k, v]) => (
        <div key={k}>{OpponentStateTypeText[v]}</div>
      ))}
      <div className={styles.opponentStates}>
        {opponentStates.map(opponentState => {
          return (
            <div key={opponentState.id}>
              <div>{OpponentStateTypeText[opponentState.type]}</div>
              {opponentState.state !== OpponentStateEnum.Unchanged && (
                <div>{OpponentStateText[opponentState.state]}</div>
              )}
              {opponentState.frame !== null && opponentState.frame !== undefined && <div>{opponentState.frame}</div>}
            </div>
          );
        })}
      </div>
    </>
  );
};
