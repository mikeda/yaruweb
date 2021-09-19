import React from 'react';

import { path } from '@/lib';
import { Paper, Tab, Tabs } from '@material-ui/core';
import { useRouter } from 'next/router';

export type TabValue = 'top' | 'characters' | 'battles' | 'articles' | 'tournaments' | 'players';

const tabItems: { [key in TabValue]: { name: string; path: string } } = {
  top: { name: 'TOP', path: path({ to: 'top' }) },
  tournaments: { name: '大会', path: path({ to: 'tournaments' }) },
  players: { name: 'プレイヤー', path: path({ to: 'players' }) },
  characters: { name: 'キャラクター', path: path({ to: 'characters' }) },
  battles: { name: '対戦動画', path: path({ to: 'battles' }) },
  articles: { name: '記事', path: path({ to: 'articles' }) },
};

export const HeaderNav: React.FC<{ activeTab: TabValue }> = ({ activeTab }) => {
  const router = useRouter();

  return (
    <Paper square>
      <Tabs value={activeTab} indicatorColor="primary" textColor="primary" variant="scrollable">
        {Object.entries(tabItems).map(([value, { name, path }]) => (
          <Tab key={value} value={value} label={name} onClick={() => router.push(path)} style={{ minWidth: 128 }} />
        ))}
      </Tabs>
    </Paper>
  );
};
