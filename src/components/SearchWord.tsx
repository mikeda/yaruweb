import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
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
      <IconButton className={classes.iconButton} onClick={() => onSearch(word)}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
