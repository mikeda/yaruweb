import React from 'react';

import { Button, TableCell, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { DashboardTableMenu } from '@/components';
import { pagesPath } from '@/generated/$path';
import { PlayerTableRowFragment } from '@/generated/graphql';
import { resolveUrlObject, DEFAULT_AVATAR_URL } from '@/lib';

interface Props {
  player: PlayerTableRowFragment;
  onClickDelete: () => void;
}

export const PlayerTableRow: React.FC<Props> = ({ player, onClickDelete }) => {
  const router = useRouter();

  return (
    <TableRow>
      <TableCell scope="row" width={64}>
        <img src={player.avatarUrl || DEFAULT_AVATAR_URL} width={64} />
      </TableCell>

      <TableCell scope="row">
        <Typography>{player.name}</Typography>
      </TableCell>

      <TableCell align="right" scope="row">
        <Button
          variant="outlined"
          href={resolveUrlObject(router, pagesPath.dashboard.players._slug(player.slug).edit.$url())}
        >
          編集
        </Button>

        <DashboardTableMenu
          items={[
            {
              label: '削除する',
              onClick: onClickDelete,
            },
          ]}
        />
      </TableCell>
    </TableRow>
  );
};
