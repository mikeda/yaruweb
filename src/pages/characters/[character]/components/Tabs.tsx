import React from 'react';

import { path } from '@/lib';
import { Paper, Tab, Tabs as MuiTabs } from '@material-ui/core';
import { useRouter } from 'next/router';
import { CharacterPageProfileFragment } from '@/lib/graphql/types';

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
            router.push(path({ to: 'character', characterSlug: character.slug }));
          }}
        />

        <Tab
          value="battles"
          label={`対戦動画 (${character.battlesCount})`}
          onClick={() => {
            router.push(path({ to: 'characterBattles', characterSlug: character.slug }));
          }}
        />

        {character.movesCount > 0 && (
          <Tab
            value="moves"
            label={`コマンドリスト (${character.movesCount})`}
            onClick={() => {
              router.push(path({ to: 'characterMoves', characterSlug: character.slug }));
            }}
          />
        )}

        {character.combosCount > 0 && (
          <Tab
            value="combos"
            label={`コンボ (${character.combosCount})`}
            onClick={() => {
              router.push(path({ to: 'characterCombos', characterSlug: character.slug }));
            }}
          />
        )}
      </MuiTabs>
    </Paper>
  );
};
