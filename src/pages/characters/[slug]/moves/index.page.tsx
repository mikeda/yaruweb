import React from 'react';

import { ParsedUrlQuery } from 'querystring';

import { Box, List, Paper, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Breadcrumbs, Content, Head, CharacterProfile, CharacterTabs, MoveListItem } from '@/components';
import {
  CharacterMovesPageDocument,
  CharacterMovesPageQuery,
  CharacterMovesPageQueryVariables,
  SsgCharacterPathsDocument,
  SsgCharacterPathsQuery,
} from '@/generated/graphql';
import { fetchGraphql } from '@/lib';

const Page: React.FC<CharacterMovesPageQuery> = ({ character }) => {
  return (
    <Content activeTab="characters" breadcrumb={<Breadcrumbs to="characterMoves" character={character} />}>
      <Head title={`${character.longName}のコマンドリスト`} />

      <CharacterProfile character={character} />

      <Box mt={2}>
        <CharacterTabs character={character} activeTab="moves" />
      </Box>

      {character.moveCategories.map(moveCategory => {
        return (
          <Box key={moveCategory.id} mt={4}>
            <Typography variant="h3" gutterBottom>
              {moveCategory.name}
            </Typography>

            {moveCategory.moves.length > 0 && (
              <Paper>
                <List>
                  {moveCategory.moves.map((move, i) => (
                    <MoveListItem key={move.id} move={move} first={i === 0} />
                  ))}
                </List>
              </Paper>
            )}
          </Box>
        );
      })}
    </Content>
  );
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<CharacterMovesPageQuery, Params> = async ({ params }) => {
  const characterSlug = params?.slug as string;
  const variables: CharacterMovesPageQueryVariables = { characterSlug };
  const data: CharacterMovesPageQuery = await fetchGraphql(CharacterMovesPageDocument, variables);

  return { props: data };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: SsgCharacterPathsQuery = await fetchGraphql(SsgCharacterPathsDocument);

  const paths = data.characters.nodes.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export default Page;
