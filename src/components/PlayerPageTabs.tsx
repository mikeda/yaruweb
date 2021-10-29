import React from 'react';

import { path } from '@/lib';
import { Paper, Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';
import { PlayerPageProfileFragment } from '@/lib/graphql/types';

type TabValue = 'profile' | 'battles' | 'standings';

interface Props {
  player: PlayerPageProfileFragment;
  activeTab: TabValue;
}

export const PlayerPageTabs: React.FC<Props> = ({ player, activeTab }) => {
  const router = useRouter();

  return (
    <Paper square>
      <Tabs
        value={activeTab}
        indicatorColor="primary"
        textColor="primary"
        aria-label="disabled tabs example"
        variant="fullWidth"
      >
        <Tab
          value="profile"
          label="プロフィール"
          onClick={() => {
            router.push(path({ to: 'player', playerSlug: player.slug }));
          }}
        />
        <Tab
          value="battles"
          label={`対戦動画 (${player.battlesCount})`}
          onClick={() => {
            router.push(path({ to: 'playerBattles', player: player.slug }));
          }}
        />
        <Tab
          value="standings"
          label={`大会戦績 (${player.standingsCount})`}
          onClick={() => {
            router.push(path({ to: 'playerStandings', playerSlug: player.slug }));
          }}
        />
      </Tabs>
    </Paper>
  );
};
