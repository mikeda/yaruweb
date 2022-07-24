import React, { useCallback, useState } from 'react';

import { Edit as EditIcon } from '@mui/icons-material';
import { Dialog, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { ComboForm } from '@/components';
import {
  ComboAttributes,
  ComboFormFragment,
  ComboPositionSelectFragment,
  MoveSelectOptionFragment,
  useComboFormLazyQuery,
  useUpdateComboMutation,
} from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  comboId: string;
  combos: ComboPositionSelectFragment[];
  moveCategories: MoveSelectOptionFragment[];
}

export const UpdateButton: React.FC<Props> = ({ comboId, combos, moveCategories }) => {
  const [open, setOpen] = useState(false);
  const [combo, setCombo] = useState<ComboFormFragment>();
  const setLoading = useSetRecoilState(loadingState);

  const [fetch, { loading }] = useComboFormLazyQuery({
    variables: { comboId },
    onCompleted: data => setCombo(data.combo),
    onError: e => toast.error(e.message),
  });

  const [update, { loading: attackLoading }] = useUpdateComboMutation({
    onCompleted: () => toast.success('コンボを更新しました。'),
    onError: e => toast.error(e.message),
  });
  const onClickUpdate = useCallback((attributes: ComboAttributes) => {
    update({ variables: { comboId, attributes } });
    setOpen(false);
  }, []);

  setLoading(loading || attackLoading);

  return (
    <>
      <IconButton
        size="large"
        onClick={() => {
          fetch().then(() => setOpen(true));
        }}
      >
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <ComboForm combo={combo} combos={combos} moveCategories={moveCategories} onSubmit={onClickUpdate} />
      </Dialog>
    </>
  );
};
