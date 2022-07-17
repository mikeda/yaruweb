import React, { useState } from 'react';

import { ParsedUrlQuery } from 'querystring';

import { Box, List, Paper, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import {
  Content,
  Head,
  Breadcrumbs,
  SelectChip,
  SelectChipContainer,
  ComboListItem,
  CharacterProfile,
  CharacterTabs,
} from '@/components';
import {
  CharacterCombosPageDocument,
  CharacterCombosPageQuery,
  CharacterPathsDocument,
  CharacterPathsQuery,
} from '@/generated/graphql';
import { fetchGraphql } from '@/lib';

const Page: NextPage<CharacterCombosPageQuery> = ({ character }) => {
  const [comboStarterId, setComboStarterId] = useState<string>();

  let comboCategories = character.comboCategories;
  if (comboStarterId) {
    comboCategories = comboCategories
      .map(comboCategory => ({
        ...comboCategory,
        combos: comboCategory.combos.filter(combo => combo.move?.id === comboStarterId),
      }))
      .filter(comboCategory => comboCategory.combos.length);
  }

  return (
    <Content activeTab="characters" breadcrumb={<Breadcrumbs to="characterCombos" character={character} />}>
      <Head title={`${character.longName}のコンボ`} />

      <CharacterProfile character={character} />

      <Box mt={2}>
        <CharacterTabs character={character} activeTab="combos" />
      </Box>

      {character.comboStarters.length > 0 && (
        <Box mt={2}>
          <SelectChipContainer>
            {character.comboStarters.map(move => (
              <SelectChip
                key={move.id}
                label={move.name}
                count={move.combosCount}
                active={move.id === comboStarterId}
                onClick={() => {
                  setComboStarterId(move.id === comboStarterId ? undefined : move.id);
                }}
              />
            ))}
          </SelectChipContainer>
        </Box>
      )}

      {comboCategories.map(comboCategory => {
        return (
          <Box key={comboCategory.id} mt={4}>
            <Typography variant="h3" gutterBottom>
              {comboCategory.name}
            </Typography>

            {comboCategory.combos.length > 0 && (
              <Paper>
                <List>
                  {comboCategory.combos.map((combo, i) => (
                    <ComboListItem key={combo.id} combo={combo} first={i === 0} />
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

export const getStaticProps: GetStaticProps<CharacterCombosPageQuery, Params> = async ({ params }) => {
  const data: CharacterCombosPageQuery = await fetchGraphql(CharacterCombosPageDocument, {
    characterSlug: params?.slug,
  });

  return { props: data, revalidate: 300 };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: CharacterPathsQuery = await fetchGraphql(CharacterPathsDocument);

  const paths = data.characters.records.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export default Page;
