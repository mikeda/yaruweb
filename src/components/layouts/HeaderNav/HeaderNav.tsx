import React from 'react';

import { path } from '@/lib';
import { Paper, Tab, Tabs } from '@material-ui/core';
import { useRouter } from 'next/router';

export type TabValue = 'top' | 'characters' | 'articles' | 'tournaments';

const tabItems: { [key in TabValue]: { name: string; path: string } } = {
  top: { name: 'TOP', path: path({ to: 'top' }) },
  characters: { name: 'キャラクター', path: path({ to: 'characters' }) },
  articles: { name: '記事', path: path({ to: 'articles' }) },
  tournaments: { name: '大会', path: path({ to: 'tournaments' }) },
};

export const HeaderNav: React.FC<{ activeTab: TabValue }> = ({ activeTab }) => {
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
        {Object.entries(tabItems).map(([value, { name, path }]) => (
          <Tab key={value} value={value} label={name} onClick={() => router.push(path)} />
        ))}
      </Tabs>
    </Paper>
  );
};
