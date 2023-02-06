import React, { useState } from 'react';

import { Button, Dialog, TableCell, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { DashboardTableMenu, StandingList, VideoList } from '@/components';
import { pagesPath } from '@/generated/$path';
import { TournamentTableRowFragment } from '@/generated/graphql';
import { NO_IMAGE_URL, dayjs, resolveUrlObject } from '@/lib';

interface Props {
  tournament: TournamentTableRowFragment;
  onClickDelete: () => void;
}

export const TournamentTableRow = ({ tournament, onClickDelete }: Props) => {
  const router = useRouter();
  const [standingDialogOpen, setStandingDialogOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);

  return (
    <TableRow>
      <TableCell scope='row' width={80}>
        <img src={tournament.mainImageUrl || NO_IMAGE_URL} width={80} />
      </TableCell>

      <TableCell scope='row'>
        <Typography>{tournament.name}</Typography>
        <Typography variant={'caption'}>{`結果${tournament.standingsCount} 動画${tournament.videosCount}`}</Typography>
      </TableCell>

      <TableCell scope='row'>
        <Typography variant='body2'>{dayjs(tournament.startsAt).format('YYYY/M/D H:mm')}</Typography>
      </TableCell>

      <TableCell align='right' scope='row'>
        <Button
          variant='outlined'
          href={resolveUrlObject(router, pagesPath.dashboard.tournaments._id(tournament.id).edit.$url())}
        >
          編集
        </Button>

        <Button
          variant='outlined'
          onClick={() => {
            setStandingDialogOpen(true);
          }}
        >
          順位
        </Button>

        <Dialog open={standingDialogOpen} onClose={() => setStandingDialogOpen(false)}>
          <StandingList tournamentId={tournament.id} />
        </Dialog>

        <Button
          variant='outlined'
          onClick={() => {
            setVideoDialogOpen(true);
          }}
        >
          動画
        </Button>

        <Dialog open={videoDialogOpen} onClose={() => setVideoDialogOpen(false)}>
          <VideoList tournamentId={tournament.id} />
        </Dialog>

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
