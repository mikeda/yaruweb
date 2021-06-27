import React from 'react';
import { GetStaticProps } from 'next';

import { CharacterCard } from '@/components/CharacterCard';
import { CharacterCardsDocument, CharacterCardsQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Grid } from '@material-ui/core';

const Page: React.FC<CharacterCardsQuery> = ({ characters }) => {
  return (
    <Content>
      <Head title="キャラクター一覧" description="鉄拳7のキャラクター一覧です。" />
      <Breadcrumbs to="characters" />

      <Grid container spacing={2}>
        {characters.map(character => (
          <Grid item key={character.slug} xs={12} sm={6}>
            <CharacterCard character={character} />
          </Grid>
        ))}
      </Grid>
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: CharacterCardsQuery = await fetchGraphql(CharacterCardsDocument);

  return { props: data };
};

export default Page;
