import React from 'react';

import { Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';
import { UrlObject } from 'url';
import { pagesPath } from '@/lib/$path';

export type TabValue = 'top' | 'characters' | 'battles' | 'articles' | 'tournaments' | 'players';

const tabItems: { [key in TabValue]: { name: string; url: UrlObject } } = {
  top: { name: 'TOP', url: pagesPath.$url() },
  tournaments: { name: '大会', url: pagesPath.tournaments.$url() },
  players: { name: 'プレイヤー', url: pagesPath.players.$url() },
  characters: { name: 'キャラクター', url: pagesPath.characters.$url() },
  battles: { name: '対戦動画', url: pagesPath.battles.$url() },
  articles: { name: '記事', url: pagesPath.articles.$url() },
};

export const HeaderNav: React.FC<{ activeTab: TabValue }> = ({ activeTab }) => {
  const router = useRouter();

  return (
    <Tabs value={activeTab} indicatorColor="primary" textColor="primary" variant="scrollable">
      {Object.entries(tabItems).map(([value, { name, url }]) => (
        <Tab key={value} value={value} label={name} onClick={() => router.push(url)} sx={{ minWidth: 0 }} />
      ))}
    </Tabs>
  );
};
