import React from 'react';

import { Box, Card, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';


import { StandingList } from './components/StandingList';
import { VideoList } from './components/VideoList';

import { DashboardBreadcrumbs, DashboardContent } from '@/components';
import { useDashboardTournamentPageQuery, dayjs, theme, NO_IMAGE_URL } from '@/lib';

const useStyles = makeStyles(() =>
  createStyles({
    section: {
      marginTop: theme.spacing(4),
      maxWidth: 500,
    },
    list: {
      maxHeight: 300,
      overflowY: 'auto',
    },
    media: {
      maxWidth: 320,
      height: 320,
    },
  }),
);

const Page: React.FC = () => {
  const router = useRouter();
  const tournamentId = router.query.id as string | undefined;
  const { data } = useDashboardTournamentPageQuery({
    variables: { tournamentId: tournamentId as string },
    skip: !tournamentId,
  });

  const classes = useStyles();

  if (!data) return null;
  const { tournament, players } = data;

  return (
    <DashboardContent
      title={tournament.name}
      breadcrumb={<DashboardBreadcrumbs to="tournament" tournament={tournament} />}
    >
      <Box mb={4}>
        <Card>
          <CardMedia image={tournament.mainImageUrl || NO_IMAGE_URL} className={classes.media} />
          <CardContent>
            <Typography variant="body2">{dayjs(tournament.startsAt).format('YYYY/M/D H:mm')}</Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {tournament.description}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Grid container spacing={2}>
        <Grid item sm={12} md={6}>
          <Paper>
            <Box p={2}>
              <Typography variant="h3">結果</Typography>
            </Box>

            <StandingList tournamentId={tournament.id} players={players.records} />
          </Paper>
        </Grid>

        <Grid item sm={12} md={6}>
          <Paper>
            <Box p={2}>
              <Typography variant="h3">動画</Typography>
            </Box>

            <VideoList tournamentId={tournament.id} />
          </Paper>
        </Grid>
      </Grid>
    </DashboardContent>
  );
};

export default Page;
