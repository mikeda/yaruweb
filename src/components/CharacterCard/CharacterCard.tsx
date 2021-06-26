import { path } from '@/lib';
import { CharacterCardFragment } from '@/lib/graphql/types';
import { Card, CardActionArea, CardContent, CardHeader, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from '../Link';

import styles from './CharacterCard.module.scss';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  media: {
    width: 100,
    height: 100,
  },
  details: {
    flex: 1,
  },
});

interface Props {
  character: CharacterCardFragment;
}

export const CharacterCard: React.FC<Props> = ({ character }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea className={classes.root}>
        <CardMedia image={character.faceImageUrl} className={classes.media} />
        <CardContent className={classes.details}>
          <Typography variant="h6">{character.longName}</Typography>
          <Typography variant="caption" component="p">
            {character.country}
          </Typography>
          <Typography variant="caption" component="p">
            {character.fightingStyle}
          </Typography>
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
