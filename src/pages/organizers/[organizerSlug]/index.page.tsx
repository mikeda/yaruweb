import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { OrganizerCard } from '@/components/OrganizerCard';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { List, ListItem, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core';
import theme from '@/theme';
import { OrganizerPageDocument, OrganizerPageQuery } from '@/lib/graphql/types';
import dayjs from '@/lib/dayjs';
import Link from 'next/link';
import { path } from '@/lib';

const useStyles = makeStyles({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  body: {
    whiteSpace: 'pre-line',
  },
});

const Page: React.FC<OrganizerPageQuery> = ({ organizer }) => {
  const classes = useStyles();

  return (
    <Content
      activeTab="tournaments"
      title={organizer.name}
      breadcrumb={<Breadcrumbs to="organizer" organizer={organizer} />}
    >
      <Head title={organizer.name} />

      <OrganizerCard organizer={organizer} />

      {organizer.description && (
        <Paper className={classes.paper}>
          <Typography className={classes.title} variant="h5">
            概要
          </Typography>
          <Typography className={classes.body}>{organizer.description}</Typography>
        </Paper>
      )}

      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h5">
          大会
        </Typography>
        <List>
          {organizer.tournaments.map(tournament => (
            <Link key={tournament.id} href={path({ to: 'tournament', tournamentId: tournament.id })} passHref>
              <ListItem button>
                <ListItemText primary={tournament.name} secondary={dayjs(tournament.startsAt).format('YYYY/M/D')} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const organizerSlug = params?.organizerSlug as string;
  const data: OrganizerPageQuery = await fetchGraphql(OrganizerPageDocument, { organizerSlug });

  return { props: data };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export default Page;
