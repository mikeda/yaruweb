import React from 'react';

import { Button, TableCell, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { DashboardTableMenu } from '@/components';
import { pagesPath } from '@/generated/$path';
import { TournamentTableRowFragment } from '@/generated/graphql';
import { NO_IMAGE_URL, dayjs, resolveUrlObject } from '@/lib';

interface Props {
  tournament: TournamentTableRowFragment;
  onClickDelete: () => void;
}

export const TournamentTableRow = ({ tournament, onClickDelete }: Props) => {
  const router = useRouter();

  return (
    <TableRow>
      <TableCell scope="row" width={80}>
        <img src={tournament.mainImageUrl || NO_IMAGE_URL} width={80} />
      </TableCell>

      <TableCell scope="row">
        <Typography>{tournament.name}</Typography>
        <Typography variant={'caption'}>{`結果${tournament.standingsCount} 動画${tournament.videosCount}`}</Typography>
      </TableCell>

      <TableCell scope="row">
        <Typography variant="body2">{dayjs(tournament.startsAt).format('YYYY/M/D H:mm')}</Typography>
      </TableCell>

      <TableCell align="right" scope="row">
        <Button
          variant="outlined"
          href={resolveUrlObject(router, pagesPath.dashboard.tournaments._id(tournament.id).edit.$url())}
        >
          編集
        </Button>

        <DashboardTableMenu
          items={[
            {
              label: '結果・動画を登録',
              onClick: () => {
                router.push(pagesPath.dashboard.tournaments._id(tournament.id).$url());
              },
            },
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
