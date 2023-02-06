import React, { useCallback, useState } from 'react';

import { Edit as EditIcon } from '@mui/icons-material';
import { Dialog, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { AttackMoveForm, ReversalMoveForm, ThrowMoveForm } from '@/components';
import {
  AttackMoveAttributes,
  MoveFormFragment,
  MovePositionSelectFragment,
  ReversalMoveAttributes,
  ThrowMoveAttributes,
  useMoveFormLazyQuery,
  useUpdateAttackMoveMutation,
  useUpdateReversalMoveMutation,
  useUpdateThrowMoveMutation,
} from '@/generated/graphql';
import { handleApolloError, loadingState } from '@/lib';

interface Props {
  moveId: string;
  moves: MovePositionSelectFragment[];
}

export const UpdateButton: React.FC<Props> = ({ moveId, moves }) => {
  const [open, setOpen] = useState(false);
  const [move, setMove] = useState<MoveFormFragment>();
  const setLoading = useSetRecoilState(loadingState);

  const [fetch, { loading }] = useMoveFormLazyQuery({
    variables: { moveId },
    onCompleted: data => setMove(data.move),
    onError: handleApolloError,
  });

  const [updateAttack, { loading: attackLoading }] = useUpdateAttackMoveMutation({
    onCompleted: () => toast.success('コマンドを更新しました。'),
    onError: handleApolloError,
  });
  const onClickUpdateAttack = useCallback((attributes: AttackMoveAttributes) => {
    updateAttack({ variables: { moveId, attributes } });
    setOpen(false);
  }, []);

  const [updateThrow, { loading: throwLoading }] = useUpdateThrowMoveMutation({
    onCompleted: () => toast.success('コマンドを更新しました。'),
    onError: handleApolloError,
  });
  const onClickUpdateThrow = useCallback((attributes: ThrowMoveAttributes) => {
    updateThrow({ variables: { moveId, attributes } });
    setOpen(false);
  }, []);

  const [updateReversal, { loading: reversalLoading }] = useUpdateReversalMoveMutation({
    onCompleted: () => toast.success('コマンドを更新しました。'),
    onError: handleApolloError,
  });
  const onClickUpdateReversal = useCallback((attributes: ReversalMoveAttributes) => {
    updateReversal({ variables: { moveId, attributes } });
    setOpen(false);
  }, []);

  setLoading(loading || attackLoading || throwLoading || reversalLoading);

  return (
    <>
      <IconButton
        size='large'
        onClick={() => {
          fetch().then(() => setOpen(true));
        }}
      >
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        {move?.moveable.__typename === 'AttackMove' && (
          <AttackMoveForm move={move} moves={moves} onSubmit={onClickUpdateAttack} />
        )}
        {move?.moveable.__typename === 'ThrowMove' && (
          <ThrowMoveForm move={move} moves={moves} onSubmit={onClickUpdateThrow} />
        )}
        {move?.moveable.__typename === 'ReversalMove' && (
          <ReversalMoveForm move={move} moves={moves} onSubmit={onClickUpdateReversal} />
        )}
      </Dialog>
    </>
  );
};
