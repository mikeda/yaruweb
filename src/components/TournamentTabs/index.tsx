import React from 'react';

import { Paper, Tab, Tabs as MuiTabs } from '@mui/material';
import { useRouter } from 'next/router';

import { pagesPath } from '@/generated/$path';
import { TournamentTabsFragment } from '@/generated/graphql';

type TabValue = 'top' | 'battles';

interface Props {
  tournament: TournamentTabsFragment;
  activeTab: TabValue;
}

export const TournamentTabs: React.FC<Props> = ({ tournament, activeTab }) => {
  const router = useRouter();

  return (
    <Paper square>
      <MuiTabs value={activeTab} indicatorColor="primary" textColor="primary" variant="fullWidth">
        <Tab
          value="top"
          label="大会"
          onClick={() => {
            router.push(pagesPath.tournaments._id(tournament.id).$url());
          }}
        />

        <Tab
          value="battles"
          label={`対戦動画 (${tournament.battlesCount})`}
          onClick={() => {
            router.push(pagesPath.tournaments._id(tournament.id).battles.$url());
          }}
        />
      </MuiTabs>
    </Paper>
  );
};
