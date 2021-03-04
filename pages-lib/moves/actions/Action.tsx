import React from 'react';
import { AttackTypeEnumText, ThrowTypeEnumText } from '@/lib/graphql/enum_texts';
import { ActionFragment } from '@/lib/graphql/types';

import styles from './Action.module.scss';
import { Frames } from './Frames';

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
          {action.frames.length > 0 && <Frames frames={action.frames} />}
          <div>{action.damage}</div>
        </div>
      ))}
    </>
  );
};
