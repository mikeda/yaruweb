import React, { useCallback, useState } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Dialog, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { ComboForm } from '@/components';
import {
  ComboPositionSelectFragment,
  useCreateComboMutation,
  ComboAttributes,
  ComboFormFragment,
  useComboFormLazyQuery,
  MoveSelectOptionFragment,
} from '@/generated/graphql';
import { handleApolloError, loadingState } from '@/lib';

interface Props {
  comboId: string;
  comboCategoryId: string;
  combos: ComboPositionSelectFragment[];
  moveCategories: MoveSelectOptionFragment[];
}

export const CopyButton: React.FC<Props> = ({ comboId, comboCategoryId, combos, moveCategories }) => {
  const [open, setOpen] = useState(false);
  const [combo, setCombo] = useState<ComboFormFragment>();
  const setLoading = useSetRecoilState(loadingState);

  const [fetch, { loading }] = useComboFormLazyQuery({
    variables: { comboId },
    onCompleted: data => setCombo(data.combo),
    onError: handleApolloError,
  });

  const [create, { loading: createLoading }] = useCreateComboMutation({
    onCompleted: () => {
      setOpen(false);
      toast.success('コンボを登録しました。');
    },
    onError: handleApolloError,
  });
  const onClickCreate = useCallback((attributes: ComboAttributes) => {
    create({ variables: { comboCategoryId, attributes } });
  }, []);

  setLoading(loading || createLoading);

  return (
    <>
      <IconButton
        size='large'
        onClick={() => {
          fetch().then(() => setOpen(true));
        }}
      >
        <ContentCopyIcon />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <ComboForm combo={combo} combos={combos} moveCategories={moveCategories} onSubmit={onClickCreate} />
      </Dialog>
    </>
  );
};
