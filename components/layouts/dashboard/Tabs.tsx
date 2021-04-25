import React from 'react';
import { Routes } from '@/lib/Routes';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faCalendarAlt, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faVideo, faMale } from '@fortawesome/free-solid-svg-icons';

import styles from './Tabs.module.scss';

export type TabKey = 'article' | 'event' | 'video' | 'character';
interface Tab {
  key: TabKey;
  label: string;
  link: string;
  icon: IconDefinition;
}

const tabs: Tab[] = [
  { key: 'article', label: '記事', link: Routes.dashboard.article.index(), icon: faFileAlt },
  { key: 'character', label: 'キャラクター', link: Routes.dashboard.character.index(), icon: faMale },
  { key: 'video', label: '動画', link: Routes.dashboard.video.index(), icon: faVideo },
  { key: 'event', label: 'イベント', link: Routes.dashboard.event.index(), icon: faCalendarAlt },
];

interface Props {
  activeTab: TabKey;
}

export const Tabs: React.FC<Props> = ({ activeTab }) => {
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
