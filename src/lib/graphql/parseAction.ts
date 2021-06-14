import { AttackTypeEnumText, ThrowEscapeEnumText, ThrowTypeEnumText } from './enum_texts';
import { ActionFragment } from './types';

export interface ParsedAction {
  id: string;
  type: string;
  damage: number;
  escape?: string;
}

export const parseAction = (action: ActionFragment): ParsedAction => {
  switch (action.__typename) {
    case 'AttackAction': {
      return {
        id: action.id,
        type: AttackTypeEnumText[action.attackType],
        damage: action.damage,
      };
    }
    case 'ThrowAction': {
      return {
        id: action.id,
        type: ThrowTypeEnumText[action.throwType],
        damage: action.damage,
        escape: ThrowEscapeEnumText[action.escape],
      };
    }
  }
};
