import React, { ReactElement } from 'react';

import { UrlObject } from 'url';

import { EmojiEvents, Person, TagFaces, LibraryBooks, People } from '@mui/icons-material';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

import { Link } from '@/components';
import { pagesPath } from '@/generated/$path';
import { theme } from '@/lib';

const useStyles = makeStyles(() =>
  createStyles({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  }),
);

type MenuKey = 'article' | 'tournament' | 'player' | 'organizer' | 'character' | 'profile';

interface ItemProps {
  key: MenuKey;
  label: string;
  link: UrlObject;
  icon: ReactElement;
}

const items: ItemProps[] = [
  {
    key: 'profile',
    label: 'プロフィール',
    link: pagesPath.dashboard.profile.edit.$url(),
    icon: <Person />,
  },
  { key: 'article', label: '記事', link: pagesPath.dashboard.articles.$url(), icon: <LibraryBooks /> },
];

const adminItems: ItemProps[] = [
  {
    key: 'tournament',
    label: '大会',
    link: pagesPath.dashboard.tournaments.$url(),
    icon: <EmojiEvents />,
  },
  {
    key: 'player',
    label: 'プレイヤー',
    link: pagesPath.dashboard.players.$url(),
    icon: <People />,
  },
  {
    key: 'organizer',
    label: 'オーガナイザー',
    link: pagesPath.dashboard.organizers.$url(),
    icon: <People />,
  },
  {
    key: 'character',
    label: 'キャラクター',
    link: pagesPath.dashboard.characters.$url(),
    icon: <TagFaces />,
  },
];

export const DrawerItems: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {items.map(item => (
          <Item key={item.key} item={item} />
        ))}
      </List>
      <Divider />
      <List>
        {adminItems.map(item => (
          <Item key={item.key} item={item} />
        ))}
      </List>
    </div>
  );
};

const Item: React.FC<{ item: ItemProps }> = ({ item: { icon, label, link } }) => (
  <Link href={link} color="inherit">
    <ListItem button>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  </Link>
);
