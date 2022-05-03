import React from 'react';
import { GetStaticProps } from 'next';
import { Grid } from '@mui/material';

import { CharactersPageDocument, CharactersPageQuery } from '@/lib/$types';
import { fetchGraphql } from '@/lib/fetchGraphql';

import { Breadcrumbs, CharacterCard, Content, Head } from '@/components';

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
