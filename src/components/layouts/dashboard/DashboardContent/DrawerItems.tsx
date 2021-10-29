import React, { ReactElement } from 'react';

import { Divider, List, ListItem, ListItemIcon, ListItemText, Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from '@/components';
import { dashboardPath } from '@/lib';
import { EmojiEvents, Person, TagFaces, LibraryBooks, People } from '@mui/icons-material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  }),
);

type MenuKey = 'article' | 'tournament' | 'player' | 'organizer' | 'character' | 'profile';

interface ItemProps {
  key: MenuKey;
  label: string;
  link: string;
  icon: ReactElement;
}

const items: ItemProps[] = [
  {
    key: 'profile',
    label: 'プロフィール',
    link: dashboardPath({ to: 'profileEdit' }),
    icon: <Person />,
  },
  { key: 'article', label: '記事', link: dashboardPath({ to: 'articles' }), icon: <LibraryBooks /> },
];

const adminItems: ItemProps[] = [
  {
    key: 'tournament',
    label: '大会',
    link: dashboardPath({ to: 'tournaments' }),
    icon: <EmojiEvents />,
  },
  {
    key: 'player',
    label: 'プレイヤー',
    link: dashboardPath({ to: 'players' }),
    icon: <People />,
  },
  {
    key: 'organizer',
    label: 'オーガナイザー',
    link: dashboardPath({ to: 'organizers' }),
    icon: <People />,
  },
  {
    key: 'character',
    label: 'キャラクター',
    link: dashboardPath({ to: 'characters' }),
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
