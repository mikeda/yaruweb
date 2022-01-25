import React from 'react';

import { Paper, Tab, Tabs as MuiTabs } from '@mui/material';
import { useRouter } from 'next/router';
import { CharacterPageProfileFragment } from '@/lib/graphql/types';
import { pagesPath } from '@/lib/$path';

type TabValue = 'profile' | 'battles' | 'moves' | 'combos';

interface Props {
  character: CharacterPageProfileFragment;
  activeTab: TabValue;
}

export const Tabs: React.FC<Props> = ({ character, activeTab }) => {
  const router = useRouter();

  return (
    <Paper square>
      <MuiTabs value={activeTab} indicatorColor="primary" textColor="primary" variant="fullWidth">
        <Tab
          value="profile"
          label="プロフィール"
          onClick={() => {
            router.push(pagesPath.characters._character(character.slug).$url());
          }}
        />

        <Tab
          value="battles"
          label={`対戦動画 (${character.battlesCount})`}
          onClick={() => {
            router.push(pagesPath.characters._character(character.slug).battles.$url());
          }}
        />

        {character.movesCount > 0 && (
          <Tab
            value="moves"
            label={`コマンドリスト (${character.movesCount})`}
            onClick={() => {
              router.push(pagesPath.characters._character(character.slug).moves.$url());
            }}
          />
        )}

        {character.combosCount > 0 && (
          <Tab
            value="combos"
            label={`コンボ (${character.combosCount})`}
            onClick={() => {
              router.push(pagesPath.characters._character(character.slug).combos.$url());
            }}
          />
        )}
      </MuiTabs>
    </Paper>
  );
};
