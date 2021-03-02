import React, { useState } from 'react';
import { AttackTypeEnumText, ThrowTypeEnumText } from '@/lib/graphql/enum_texts';
import { ActionFragment } from '@/lib/graphql/types';

import styles from './Action.module.scss';
import { OpponentStates } from './OpponentStates';

interface Props {
  actions: ActionFragment[];
}

const actionTypeText = (action: ActionFragment) => {
  switch (action.__typename) {
    case 'AttackAction':
      return AttackTypeEnumText[action.attackType];
    case 'ThrowAction':
      return ThrowTypeEnumText[action.throwType];
    default:
      return '';
  }
};

export const Actions: React.FC<Props> = ({ actions }) => {
  const [detailOpend, setDetailOpend] = useState(false);

  return (
    <>
      <div className={styles.actionTypes}>
        {actions.map(action => (
          <span key={action.id}>{actionTypeText(action)}</span>
        ))}
      </div>

      <div className={styles.damages}>
        ダメージ
        {actions.map(action => (
          <span key={action.id}>{action.damage}</span>
        ))}
      </div>

      {actions.map(action => (
        <div key={action.id} className={styles.action}>
          {action.opponentStates.length > 0 && <OpponentStates opponentStates={action.opponentStates} />}
          <div>{action.damage}</div>
        </div>
      ))}
    </>
  );
};
