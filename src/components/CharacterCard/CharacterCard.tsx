import { CharacterCardFragment } from '@/lib/graphql/types';
import React from 'react';

import styles from './CharacterCard.module.scss';

interface Props {
  character: CharacterCardFragment;
}

export const CharacterCard: React.FC<Props> = ({ character }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={character.faceImageUrl} />
      </div>

      <div>
        <div className={styles.name}>{character.longName}</div>

        <ul className={styles.detail}>
          <li>国籍 : {character.country}</li>
          <li>格闘スタイル : {character.fightingStyle}</li>
        </ul>
      </div>
    </div>
  );
};
