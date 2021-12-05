import React, { useEffect, useState } from 'react';

import { Operation } from '../Command/Operation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';

import styles from './OperationListSelector.module.scss';
import { Box, Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { Command } from '..';
import { OperationText } from '@/lib';

const useStyles = makeStyles(() =>
  createStyles({
    buttons: {
      display: 'flex',
      width: 300,
      flexWrap: 'wrap',
    },
    button: {},
  }),
);

interface Props {
  command: string[];
  open: boolean;
  onClose: () => void;
  onChange: (command: string[]) => void;
}

export const OperationListSelector: React.FC<Props> = ({ command: initialCommand, open, onClose, onChange }) => {
  const classes = useStyles();
  const [command, setCommand] = useState(initialCommand);
  const [text, setText] = useState('');

  useEffect(() => {
    setCommand(initialCommand);
  }, [initialCommand]);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <Box>
            <Command command={command} />
          </Box>

          <Box>
            <TextField
              label="テキスト"
              placeholder="立ち途中"
              size="small"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <Button
              onClick={() => {
                if (text) setCommand(prev => [...prev, text]);
              }}
            >
              追加
            </Button>
          </Box>

          <Box>
            <FontAwesomeIcon
              className={styles.backspace}
              icon={faBackspace}
              onClick={e => {
                e.preventDefault();
                setCommand(prev => prev.slice(0, -1));
              }}
            />
          </Box>

          <div className={classes.buttons}>
            {Object.keys(OperationText).map(operation => {
              return (
                <Button
                  key={operation}
                  onClick={() => {
                    setCommand(prev => [...prev, operation]);
                  }}
                >
                  <Operation operation={operation} />
                </Button>
              );
            })}
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onChange(command);
              onClose();
            }}
            type="submit"
            color="primary"
          >
            登録する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
