import React from 'react';

import { path } from '@/lib';
import { Paper, Tab, Tabs } from '@material-ui/core';
import { useRouter } from 'next/router';

type TabValue = 'profile' | 'battles' | 'moves' | 'combos';

export const CharacterPageTabs: React.FC<{ characterSlug: string; activeTab: TabValue }> = ({
  characterSlug,
  activeTab,
}) => {
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
            router.push(path({ to: 'character', characterSlug }));
          }}
        />
        <Tab
          value="battles"
          label="対戦動画"
          onClick={() => {
            router.push(path({ to: 'characterBattles', characterSlug }));
          }}
        />
        <Tab
          value="moves"
          label="コマンドリスト"
          onClick={() => {
            router.push(path({ to: 'moveCategories', characterSlug }));
          }}
        />
        <Tab
          value="combos"
          label="コンボ"
          onClick={() => {
            router.push(path({ to: 'comboCategories', characterSlug }));
          }}
        />
      </Tabs>
    </Paper>
  );
};
