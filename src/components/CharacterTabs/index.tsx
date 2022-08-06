import React from 'react';

import { Paper, Tab, Tabs as MuiTabs } from '@mui/material';
import { useRouter } from 'next/router';

import { pagesPath } from '@/generated/$path';
import { CharacterTabsFragment } from '@/generated/graphql';

type TabValue = 'profile' | 'battles' | 'moves' | 'combos';

interface Props {
  character: CharacterTabsFragment;
  activeTab: TabValue;
}

export const CharacterTabs: React.FC<Props> = ({ character, activeTab }) => {
  const router = useRouter();

  return (
    <Paper square>
      <MuiTabs value={activeTab} indicatorColor="primary" textColor="primary" variant="fullWidth">
        <Tab
          value="profile"
          label="キャラ紹介"
          onClick={() => {
            router.push(pagesPath.characters._slug(character.slug).$url());
          }}
        />

        {character.movesCount > 0 && (
          <Tab
            value="moves"
            label={`コマンド (${character.movesCount})`}
            onClick={() => {
              router.push(pagesPath.characters._slug(character.slug).moves.$url());
            }}
          />
        )}

        {character.combosCount > 0 && (
          <Tab
            value="combos"
            label={`コンボ (${character.combosCount})`}
            onClick={() => {
              router.push(pagesPath.characters._slug(character.slug).combos.$url());
            }}
          />
        )}

        <Tab
          value="battles"
          label={`対戦動画 (${character.battlesCount})`}
          onClick={() => {
            router.push(pagesPath.characters._slug(character.slug).battles.$url());
          }}
        />
      </MuiTabs>
    </Paper>
  );
};
