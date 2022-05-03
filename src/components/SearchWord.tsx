import React, { useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

import { theme } from '@/lib';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  }),
);

interface Props {
  initWord?: string;
  onSearch: (word: string) => void;
}

export const SearchWord: React.FC<Props> = ({ initWord, onSearch }) => {
  const classes = useStyles();
  const [word, setWord] = useState(initWord || '');

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        value={word}
        onChange={e => setWord(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSearch(word);
          }
        }}
      />
      <IconButton className={classes.iconButton} onClick={() => onSearch(word)} size="large">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
