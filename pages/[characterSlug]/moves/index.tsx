import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  CharacterDocument,
  CharacterFragment,
  CharacterPathsDocument,
  CharacterPathsQuery,
  CharacterQuery,
  MoveCategoryFragment,
} from '@/lib/graphql/types';
import { CharacterPageLayout } from '@/components/layouts/CharacterPageLayout';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { TabLinkGroup } from '@/components/blocks/TabLinkGroup';
import { TabLink } from '@/components/blocks/TabLink';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';

interface Props {
  character: CharacterFragment;
}

const Page: React.FC<Props> = ({ character }) => {
  const [moveCategory, setMoveCategory] = useState<MoveCategoryFragment>();

  return (
    <Content>
      <Head title={`${character.longName}の動画`} description={`${character.longName}のオススメ動画です。`} />

      <CharacterPageLayout character={character} activeTab="moves">
        <TabLinkGroup>
          <TabLink
            text="全て"
            active={!moveCategory}
            onClick={() => {
              setMoveCategory(undefined);
            }}
          />
        </TabLinkGroup>
      </CharacterPageLayout>
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const characterSlug = params?.character as string;

  const data: CharacterQuery = await fetchGraphql(CharacterDocument, { slug: characterSlug });

  return {
    props: { character: data.character },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: CharacterPathsQuery = await fetchGraphql(CharacterPathsDocument);

  const paths = data.characters.map(c => ({
    params: {
      characterSlug: c.slug,
    },
  }));

  return { paths, fallback: false };
};

export default Page;
