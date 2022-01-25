import React from 'react';

import { Paper, Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';
import { PlayerPageProfileFragment } from '@/lib/graphql/types';
import { pagesPath } from '@/lib/$path';

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
            router.push(pagesPath.players._player(player.slug).$url());
          }}
        />
        <Tab
          value="battles"
          label={`対戦動画 (${player.battlesCount})`}
          onClick={() => {
            router.push(pagesPath.players._player(player.slug).battles.$url());
          }}
        />
        <Tab
          value="standings"
          label={`大会戦績 (${player.standingsCount})`}
          onClick={() => {
            router.push(pagesPath.players._player(player.slug).standings.$url());
          }}
        />
      </Tabs>
    </Paper>
  );
};
