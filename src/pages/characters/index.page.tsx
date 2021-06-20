import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import { CharacterCard } from '@/components/CharacterCard';
import { Routes } from '@/lib/Routes';
import { PageCharactersDocument, PageCharactersQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

const Page: React.FC<PageCharactersQuery> = ({ characters }) => {
  return (
    <Content>
      <Head title="キャラクター一覧" description="鉄拳7のキャラクター一覧です。" />
      <Breadcrumbs items={[{ name: 'キャラクター' }]} />

      <div className="ly_row">
        {characters.map(character => {
          if (!character) return;

          return (
            <div key={character.slug} className="ly_col_6 ly_smCol_12 hp_mg_b_md">
              <Link href={Routes.character.detail(character.slug)}>
                <a>
                  <CharacterCard character={character} />
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: PageCharactersQuery = await fetchGraphql(PageCharactersDocument);

  return { props: data };
};

export default Page;
