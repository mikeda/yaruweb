import React from 'react';
import { Routes } from '@/lib/Routes';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faCalendarAlt, IconDefinition, faUser, faMeh } from '@fortawesome/free-regular-svg-icons';
import { faVideo, faRing } from '@fortawesome/free-solid-svg-icons';

import styles from './Tabs.module.scss';
import { useCurrentPlayer } from '@/hooks/useCurrentPlayer';
import { PlayerRole } from '@/lib/graphql/types';

export type TabKey = 'article' | 'tournament' | 'video' | 'character' | 'stage' | 'profile';

interface Tab {
  key: TabKey;
  label: string;
  link: string;
  icon: IconDefinition;
  onlyEditor: boolean;
}

const allTabs: Tab[] = [
  { key: 'article', label: '記事', link: Routes.dashboard.article.index(), icon: faFileAlt, onlyEditor: false },
  { key: 'character', label: 'キャラクター', link: Routes.dashboard.character.index(), icon: faMeh, onlyEditor: true },
  { key: 'video', label: '動画', link: Routes.dashboard.video.index(), icon: faVideo, onlyEditor: true },
  {
    key: 'tournament',
    label: '大会',
    link: Routes.dashboard.tournament.index(),
    icon: faCalendarAlt,
    onlyEditor: true,
  },
  { key: 'stage', label: 'ステージ', link: Routes.dashboard.stage.index(), icon: faRing, onlyEditor: true },
  { key: 'profile', label: 'プロフィール', link: Routes.dashboard.profile.edit(), icon: faUser, onlyEditor: false },
];

interface Props {
  activeTab: TabKey;
}

export const Tabs: React.FC<Props> = ({ activeTab }) => {
  const { currentPlayer } = useCurrentPlayer();

  const tabs = currentPlayer?.role === PlayerRole.Admin ? allTabs : allTabs.filter(tab => !tab.onlyEditor);

  return (
    <div className={styles.container}>
      {tabs.map(tab => (
        <Link href={tab.link} key={tab.key}>
          <a className={tab.key === activeTab ? styles.tabActive : styles.tab}>
            <FontAwesomeIcon icon={tab.icon} className={styles.icon} />
            {tab.label}
          </a>
        </Link>
      ))}
    </div>
  );
};
