import React from 'react';

import { ActionFragment } from '@/lib/graphql/types';
import { AttackTypeEnumText, ThrowEscapeEnumText, ThrowTypeEnumText } from '@/lib/graphql/enum_texts';

interface Props {
  actions: ActionFragment[];
}

export const ActionList: React.FC<Props> = ({ actions }) => {
  return (
    <div>
      {actions.map(action => (
        <ActionLabel key={action.id} action={action} />
      ))}
    </div>
  );
};

const ActionLabel: React.FC<{ action: ActionFragment }> = ({ action }) => {
  const { type, damage, escape } = parse(action);

  return (
    <div>
      {type}({damage}
      {escape && `/ 投げ抜け ${escape}`})
    </div>
  );
};

const parse = (action: ActionFragment) => {
  switch (action.__typename) {
    case 'AttackAction': {
      return {
        type: AttackTypeEnumText[action.attackType],
        damage: action.damage,
      };
    }
    case 'ThrowAction': {
      return {
        type: ThrowTypeEnumText[action.throwType],
        damage: action.damage,
        escape: ThrowEscapeEnumText[action.escape],
      };
    }
  }
};
