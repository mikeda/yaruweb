import React from 'react';
import Link from 'next/link';
import { useSortable } from '@dnd-kit/sortable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { CSS } from '@dnd-kit/utilities';

import styles from './ObjectCard.module.scss';

export interface ObjectCardLinkProps {
  text: string;
  url?: string;
  onClick?: () => void;
}

export interface ObjectCardProps {
  title: string;
  links: ObjectCardLinkProps[];
  rightContent?: React.ReactNode;
}

export const ObjectCard: React.FC<ObjectCardProps> = ({ title, links, rightContent }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.links}>
          {links.map((link, i) =>
            link.url ? (
              <Link key={i} href={link.url}>
                <a className={styles.link}>{link.text}</a>
              </Link>
            ) : (
              <a className={styles.link} onClick={link.onClick}>
                {link.text}
              </a>
            ),
          )}
        </div>
      </div>

      {rightContent && <div>{rightContent}</div>}
    </div>
  );
};

export interface SortableObjectCardProps {
  id: string;
  title: string;
  links: ObjectCardLinkProps[];
}

export const SortableObjectCard: React.FC<SortableObjectCardProps> = ({ id, title, links }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;

  return (
    <div style={style}>
      <ObjectCard
        title={title}
        links={links}
        rightContent={
          <div ref={setNodeRef} {...attributes} {...listeners}>
            <FontAwesomeIcon icon={faBars} className={styles.handle} />
          </div>
        }
      />
    </div>
  );
};
