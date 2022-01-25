import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  CharacterCombosPageDocument,
  CharacterCombosPageQuery,
  CharacterPathsDocument,
  CharacterPathsQuery,
} from '@/lib/graphql/types';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Profile } from '../components/Profile';
import { Tabs } from '../components/Tabs';
import { Content, Head, Breadcrumbs, Command } from '@/components';
import { ParsedUrlQuery } from 'querystring';

const useStyles = makeStyles({
  table: {
    minWidth: 640,
  },
});

const Page: React.FC<CharacterCombosPageQuery> = ({ character }) => {
  const classes = useStyles();

  return (
    <Content activeTab="characters" breadcrumb={<Breadcrumbs to="characterCombos" character={character} />}>
      <Head title={`${character.longName}のコンボ`} />

      <Profile character={character} />

      <Box mt={2}>
        <Tabs character={character} activeTab="combos" />
      </Box>

      {character.comboCategories.map(comboCategory => (
        <Box key={comboCategory.id} mt={4}>
          <Typography variant="h3" gutterBottom>
            {comboCategory.name}
          </Typography>

          <TableContainer component={Paper}>
            <Table className={classes.table} size="small">
              <TableBody>
                {comboCategory.combos.map(combo => (
                  <TableRow key={combo.id}>
                    <TableCell>
                      <Command command={combo.command} />
                      {combo.note && (
                        <Typography variant="caption" component="p">
                          {combo.note}
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Content>
  );
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<CharacterCombosPageQuery, Params> = async ({ params }) => {
  const data: CharacterCombosPageQuery = await fetchGraphql(CharacterCombosPageDocument, {
    characterSlug: params?.slug,
  });

  return { props: data };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: CharacterPathsQuery = await fetchGraphql(CharacterPathsDocument);

  const paths = data.characters.records.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export default Page;
