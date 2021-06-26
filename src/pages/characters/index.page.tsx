import React from 'react';
import { GetStaticProps } from 'next';

import { CharacterCard } from '@/components/CharacterCard';
import { PageCharactersDocument, PageCharactersQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { path } from '@/lib';
import { Link } from '@/components';
import { Grid } from '@material-ui/core';

const Page: React.FC<PageCharactersQuery> = ({ characters }) => {
  return (
    <Content>
      <Head title="キャラクター一覧" description="鉄拳7のキャラクター一覧です。" />
      <Breadcrumbs to="characters" />

      <Grid container spacing={2}>
        {characters.map(character => (
          <Grid item key={character.slug} xs={12} sm={6}>
            <Link href={path({ to: 'character', characterSlug: character.slug })}>
              <CharacterCard character={character} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: PageCharactersQuery = await fetchGraphql(PageCharactersDocument);

  return { props: data };
};

export default Page;
