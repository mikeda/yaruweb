import React, { useState } from 'react';

import { Move, usePageDashboardMovesQuery, useUpdateMovePositionMutation } from '@/lib/graphql/types';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { DashboardContent, DashboardBreadcrumbs } from '@/components';
import { toast } from 'react-toastify';
import { SortableObjectCardList } from '@/components/ObjectCardList';
import { dashboardPath } from '@/lib';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const Page: React.FC = () => {
  const router = useRouter();
  const { moveCategoryId } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageDashboardMovesQuery({
    variables: { moveCategoryId: moveCategoryId as string },
    fetchPolicy: 'network-only',
    skip: !moveCategoryId,
  });

  setLoading(loading);
  if (!data) return null;

  const { moveCategory } = data;

  return (
    <DashboardContent
      title={moveCategory.name}
      breadcrumb={<DashboardBreadcrumbs to="moves" moveCategory={moveCategory} />}
      actions={<MovesNewButton moveCategoryId={moveCategory.id} />}
    >
      <PageContent moves={data.moveCategory.moves} />
    </DashboardContent>
  );
};

type MoveFragment = Pick<Move, 'id' | 'name'>;

const PageContent: React.FC<{ moves: MoveFragment[] }> = ({ moves }) => {
  const setLoading = useSetRecoilState(loadingState);
  const [updateMovePosition, { loading }] = useUpdateMovePositionMutation({
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);

  return (
    <SortableObjectCardList
      items={moves.map(move => ({
        id: move.id,
        title: move.name,
        links: [{ text: '編集する', url: dashboardPath({ to: 'moveEdit', moveId: move.id }) }],
      }))}
      onMove={(moveId, newPosition) => updateMovePosition({ variables: { moveId, newPosition } })}
    />
  );
};

const MovesNewButton = ({ moveCategoryId }: { moveCategoryId: string }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleClick}>
        作成する
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            router.push(dashboardPath({ to: 'movesNew', moveCategoryId, moveType: 'attack' }));
          }}
        >
          打撃
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            router.push(dashboardPath({ to: 'movesNew', moveCategoryId, moveType: 'throw' }));
          }}
        >
          投げ
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            router.push(dashboardPath({ to: 'movesNew', moveCategoryId, moveType: 'reversal' }));
          }}
        >
          返し技
        </MenuItem>
      </Menu>
    </>
  );
};

export default Page;
