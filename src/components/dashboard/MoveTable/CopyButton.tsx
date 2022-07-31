import React, { useCallback, useState } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Dialog, IconButton } from '@mui/material';
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
  MoveFormFragment,
  useMoveFormLazyQuery,
} from '@/generated/graphql';
import { handleApolloError, loadingState } from '@/lib';

interface Props {
  moveId: string;
  moveCategoryId: string;
  moves: MovePositionSelectFragment[];
}

export const CopyButton: React.FC<Props> = ({ moveId, moveCategoryId, moves }) => {
  const [open, setOpen] = useState(false);
  const [move, setMove] = useState<MoveFormFragment>();
  const setLoading = useSetRecoilState(loadingState);

  const [fetch, { loading }] = useMoveFormLazyQuery({
    variables: { moveId },
    onCompleted: data => setMove(data.move),
    onError: handleApolloError,
  });

  const onCompleted = () => {
    setOpen(false);
    toast.success('コマンドを登録しました。');
  };

  const [createAttack, { loading: createAttackLoading }] = useCreateAttackMoveMutation({
    onCompleted,
    onError: handleApolloError,
  });
  const onClickCreateAttack = useCallback((attributes: AttackMoveAttributes) => {
    createAttack({ variables: { moveCategoryId, attributes } });
  }, []);

  const [createThrow, { loading: createThrowLoading }] = useCreateThrowMoveMutation({
    onCompleted,
    onError: handleApolloError,
  });
  const onClickCreateThrow = useCallback((attributes: ThrowMoveAttributes) => {
    createThrow({ variables: { moveCategoryId, attributes } });
  }, []);

  const [createReversal, { loading: createReversalLoading }] = useCreateReversalMoveMutation({
    onCompleted,
    onError: handleApolloError,
  });
  const onClickCreateReversal = useCallback((attributes: ReversalMoveAttributes) => {
    createReversal({ variables: { moveCategoryId, attributes } });
  }, []);

  setLoading(loading || createAttackLoading || createThrowLoading || createReversalLoading);

  return (
    <>
      <IconButton
        size="large"
        onClick={() => {
          fetch().then(() => setOpen(true));
        }}
      >
        <ContentCopyIcon />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        {move?.moveable.__typename === 'AttackMove' && (
          <AttackMoveForm move={move} moves={moves} onSubmit={onClickCreateAttack} />
        )}
        {move?.moveable.__typename === 'ThrowMove' && (
          <ThrowMoveForm move={move} moves={moves} onSubmit={onClickCreateThrow} />
        )}
        {move?.moveable.__typename === 'ReversalMove' && (
          <ReversalMoveForm move={move} moves={moves} onSubmit={onClickCreateReversal} />
        )}
      </Dialog>
    </>
  );
};
