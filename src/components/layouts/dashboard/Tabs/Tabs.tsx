import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faCalendarAlt, IconDefinition, faUser, faMeh } from '@fortawesome/free-regular-svg-icons';

import styles from './Tabs.module.scss';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { UserRole } from '@/lib/graphql/types';
import { dashboardPath } from '@/lib';

export type TabKey = 'article' | 'tournament' | 'video' | 'character' | 'profile';

interface Tab {
  key: TabKey;
  label: string;
  link: string;
  icon: IconDefinition;
  onlyEditor: boolean;
}

const allTabs: Tab[] = [
  { key: 'article', label: '記事', link: dashboardPath({ to: 'articles' }), icon: faFileAlt, onlyEditor: false },
  { key: 'character', label: 'キャラクター', link: dashboardPath({ to: 'characters' }), icon: faMeh, onlyEditor: true },
  {
    key: 'tournament',
    label: '大会',
    link: dashboardPath({ to: 'tournaments' }),
    icon: faCalendarAlt,
    onlyEditor: true,
  },
  {
    key: 'profile',
    label: 'プロフィール',
    link: dashboardPath({ to: 'profileEdit' }),
    icon: faUser,
    onlyEditor: false,
  },
];

interface Props {
  activeTab: TabKey;
}

export const Tabs: React.FC<Props> = ({ activeTab }) => {
  const { currentUser } = useCurrentUser();

  const tabs = currentUser?.role === UserRole.Admin ? allTabs : allTabs.filter(tab => !tab.onlyEditor);

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
