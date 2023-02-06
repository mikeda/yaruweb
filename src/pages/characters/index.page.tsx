import React from 'react';

import { Grid } from '@mui/material';
import { GetStaticProps } from 'next';

import { Breadcrumbs, CharacterCard, Content, Head } from '@/components';
import { CharactersPageDocument, CharactersPageQuery } from '@/generated/graphql';
import { fetchGraphql } from '@/lib';

const Page: React.FC<CharactersPageQuery> = ({ characters }) => {
  return (
    <Content activeTab='characters' title='キャラクター' breadcrumb={<Breadcrumbs to='characters' />}>
      <Head title='キャラクター一覧' description='鉄拳7のキャラクター一覧です。' />

      <Grid container spacing={2}>
        {characters.nodes.map(character => (
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
