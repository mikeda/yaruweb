import React from 'react';

import { Routes } from '@/lib/Routes';
import { CharacterCard } from '@/components/CharacterCard';
import { TabNav } from '../TabNav';

interface Props {
  character: {
    slug: string;
    longName: string;
    faceImageUrl: string;
    country: string;
    fightingStyle: string;
  };
  activeTab: 'profile' | 'moves' | 'combos';
}

export const CharacterPageLayout: React.FC<Props> = ({ character, activeTab, children }) => {
  return (
    <>
      <div className="bl_box">
        <CharacterCard character={character} />
      </div>

      <TabNav
        tabs={[
          { key: 'profile', href: Routes.character(character.slug), label: 'プロフィール' },
          { key: 'moves', href: Routes.characterMoves(character.slug), label: 'コマンドリスト' },
          { key: 'combos', href: Routes.characterCombos(character.slug), label: 'コンボ' },
        ]}
        activeTabKey={activeTab}
      />

      {children}
    </>
  );
};
