import React from 'react';
import { Routes } from '@/lib/Routes';
import { TabNav } from '@/components/TabNav';

interface Props {
  activeTab: 'articles' | 'videos' | 'combos' | 'events';
}

export const Layout: React.FC<Props> = ({ activeTab, children }) => {
  return (
    <>
      <TabNav tabs={[{ key: 'articles', href: Routes.mypageArticles(), label: '記事' }]} activeTabKey={activeTab} />

      {children}
    </>
  );
};
