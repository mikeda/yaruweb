import { path } from '@/lib';
import { CharacterCardFragment } from '@/lib/graphql/types';
import { Card, CardActionArea, CardContent, CardHeader, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

import styles from './CharacterCard.module.scss';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  media: {
    width: 150,
  },
});

interface Props {
  character: CharacterCardFragment;
}

export const CharacterCard: React.FC<Props> = ({ character }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea href={path({ to: 'character', characterSlug: character.slug })}>
        <CardMedia image={character.faceImageUrl} className={classes.media} />
        <CardContent>
          <Typography variant="h6">{character.longName}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={character.faceImageUrl} />
      </div>

      <div>
        <div className={styles.name}>{character.longName}</div>

        <ul className={styles.detail}>
          <li>国籍 : {character.country}</li>
          <li>格闘スタイル : {character.fightingStyle}</li>
        </ul>
      </div>
    </div>
  );
};
