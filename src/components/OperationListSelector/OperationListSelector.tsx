import React, { useEffect, useState } from 'react';

import { CommandAttributes, OperationEnum } from '@/lib/graphql/types';
import { Operations } from '../Command/Operations';
import { Operation } from '../Command/Operation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';

import styles from './OperationListSelector.module.scss';
import { OperationText } from '@/lib/graphql/enum_texts';
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import { Command } from '..';

const useStyles = makeStyles((theme: Theme) =>
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
  //operations: OperationEnum[];
  //onClickOperation: (operation: OperationEnum) => void;
  command: CommandAttributes;
  open: boolean;
  onClose: () => void;
  onChange: (command: CommandAttributes) => void;
  //onDeleteLast: () => void;
}

export const OperationListSelector: React.FC<Props> = ({ command: initialCommand, open, onClose, onChange }) => {
  const classes = useStyles();
  const [command, setCommand] = useState(initialCommand);

  useEffect(() => {
    setCommand(initialCommand);
  }, [initialCommand]);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <Command command={command} />

          <TextField
            label="条件"
            placeholder="立ち途中"
            size="small"
            value={command.condition}
            onChange={e => {
              setCommand(prev => ({ ...prev, condition: e.target.value }));
            }}
          />

          <FontAwesomeIcon
            className={styles.backspace}
            icon={faBackspace}
            onClick={e => {
              e.preventDefault();
              setCommand(prev => ({ ...prev, operations: prev.operations.slice(0, -1) }));
            }}
          />
          <div className={classes.buttons}>
            {Object.keys(OperationText).map(operation => {
              return (
                <Button
                  key={operation}
                  onClick={() => {
                    setCommand(prev => ({ ...prev, operations: [...prev.operations, operation as OperationEnum] }));
                  }}
                >
                  <Operation operation={operation as OperationEnum} />
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
