import React, { useCallback, useState } from 'react';

import { ApolloError } from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { AttackMoveForm, ReversalMoveForm, ThrowMoveForm } from '@/components';
import {
  MovePositionSelectFragment,
  useCreateAttackMoveMutation,
  useCreateThrowMoveMutation,
  useCreateReversalMoveMutation,
  AttackMoveAttributes,
  ThrowMoveAttributes,
  ReversalMoveAttributes,
} from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  moveCategoryId: string;
  moves: MovePositionSelectFragment[];
}

export const CreateButton: React.FC<Props> = ({ moveCategoryId, moves }) => {
  const setLoading = useSetRecoilState(loadingState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [moveType, setMoveType] = useState<null | 'attack' | 'throw' | 'reversal'>(null);

  const onCompleted = () => {
    setMoveType(null);
    toast.success('コマンドを登録しました。');
  };

  const onError = (e: ApolloError) => {
    toast.error(e.message);
  };

  const [createAttack, { loading: createAttackLoading }] = useCreateAttackMoveMutation({ onCompleted, onError });
  const onClickCreateAttack = useCallback((attributes: AttackMoveAttributes) => {
    createAttack({ variables: { moveCategoryId, attributes } });
  }, []);

  const [createThrow, { loading: createThrowLoading }] = useCreateThrowMoveMutation({ onCompleted, onError });
  const onClickCreateThrow = useCallback((attributes: ThrowMoveAttributes) => {
    createThrow({ variables: { moveCategoryId, attributes } });
  }, []);

  const [createReversal, { loading: createReversalLoading }] = useCreateReversalMoveMutation({ onCompleted, onError });
  const onClickCreateReversal = useCallback((attributes: ReversalMoveAttributes) => {
    createReversal({ variables: { moveCategoryId, attributes } });
  }, []);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  setLoading(createAttackLoading || createThrowLoading || createReversalLoading);

  return (
    <>
      <Tooltip title="コマンドを作成">
        <IconButton onClick={openMenu} size="large">
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem
          onClick={() => {
            setMoveType('attack');
            closeMenu();
          }}
        >
          打撃
        </MenuItem>

        <MenuItem
          onClick={() => {
            setMoveType('throw');
            closeMenu();
          }}
        >
          投げ
        </MenuItem>

        <MenuItem
          onClick={() => {
            setMoveType('reversal');
            closeMenu();
          }}
        >
          返し技
        </MenuItem>
      </Menu>

      <Dialog open={Boolean(moveType)} onClose={() => setMoveType(null)} scroll="paper">
        {moveType === 'attack' && <AttackMoveForm moves={moves} onSubmit={onClickCreateAttack} />}
        {moveType === 'throw' && <ThrowMoveForm moves={moves} onSubmit={onClickCreateThrow} />}
        {moveType === 'reversal' && <ReversalMoveForm moves={moves} onSubmit={onClickCreateReversal} />}
      </Dialog>
    </>
  );
};
