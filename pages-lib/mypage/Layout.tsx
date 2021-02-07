import React from 'react';
import { Routes } from '@/lib/Routes';
import { TabNav } from '@/components/TabNav';

interface Props {
  activeTab: 'articles' | 'videos' | 'combos' | 'events';
}

export const Layout: React.FC<Props> = ({ activeTab, children }) => {
  return (
    <>
      <TabNav
        tabs={[
          { key: 'articles', href: Routes.mypageArticles(), label: '記事' },
          { key: 'videos', href: Routes.mypageVideos(), label: 'オススメ動画' },
          { key: 'combos', href: Routes.mypageCombos(), label: 'コンボ' },
          { key: 'events', href: Routes.mypageEvents(), label: 'イベント' },
        ]}
        activeTabKey={activeTab}
      />

      {children}
    </>
  );
};
