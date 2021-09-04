import React from 'react';
import { GetStaticProps } from 'next';

import { CharacterCard } from '@/components/CharacterCard';
import { CharactersPageDocument, CharactersPageQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Grid } from '@material-ui/core';

const Page: React.FC<CharactersPageQuery> = ({ characters }) => {
  return (
    <Content activeTab="characters" title="キャラクター" breadcrumb={<Breadcrumbs to="characters" />}>
      <Head title="キャラクター一覧" description="鉄拳7のキャラクター一覧です。" />

      <Grid container spacing={2}>
        {characters.records.map(character => (
          <Grid item key={character.slug} xs={12} sm={6}>
            <CharacterCard character={character} />
          </Grid>
        ))}
      </Grid>
    </Content>
  );
};

export const getStaticProps: GetStaticProps<CharactersPageQuery> = async () => {
  const data: CharactersPageQuery = await fetchGraphql(CharactersPageDocument);

  return { props: data };
};

export default Page;
