import React from 'react';

import { Paper, Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';

import { pagesPath } from '@/generated/$path';
import { PlayerTabsFragment } from '@/generated/graphql';

type TabValue = 'profile' | 'battles' | 'standings';

interface Props {
  player: PlayerTabsFragment;
  activeTab: TabValue;
}

export const PlayerTabs: React.FC<Props> = ({ player, activeTab }) => {
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
            router.push(pagesPath.players._slug(player.slug).$url());
          }}
        />
        <Tab
          value="battles"
          label={`対戦動画 (${player.battlesCount})`}
          onClick={() => {
            router.push(pagesPath.players._slug(player.slug).battles.$url());
          }}
        />
        <Tab
          value="standings"
          label={`大会入賞 (${player.standingsCount})`}
          onClick={() => {
            router.push(pagesPath.players._slug(player.slug).standings.$url());
          }}
        />
      </Tabs>
    </Paper>
  );
};
