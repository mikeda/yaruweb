import React, { useContext } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

import {
  CharacterDocument,
  CharacterFragment,
  CharacterQuery,
  MoveCategoriesDocument,
  MoveCategoriesQuery,
  MoveCategoryFragment,
  MoveCategoryPathsDocument,
  MoveCategoryPathsQuery,
  useMovesQuery,
} from '@/lib/graphql/types';
import { CharacterPageLayout } from '@/components/layouts/CharacterPageLayout';
import { MoveList } from '@/components/MoveList';
import { Routes } from '@/lib/Routes';
import { CurrentPlayerContext } from '@/lib/contexts/CurrentPlayerContext';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { TabNav } from '@/components/TabNav';
import { NotFound } from '@/components/NotFound';

interface Props {
  character: CharacterFragment;
  moveCategories: MoveCategoryFragment[];
  moveCategorySlug: string;
}

const Page: React.FC<Props> = ({ character, moveCategories, moveCategorySlug }) => {
  const { currentPlayer } = useContext(CurrentPlayerContext);

  return (
    <CharacterPageLayout character={character} activeTab="moves">
      <TabNav
        tabs={moveCategories.map(c => ({
          key: c.slug,
          href: Routes.characterMoves(character.slug, c.slug),
          label: c.name,
        }))}
        activeTabKey={moveCategorySlug}
      />

      {currentPlayer && (
        <div className="bl_myContHeader">
          <Link href={Routes.createMove(character.slug)}>
            <a className="el_btn">登録する</a>
          </Link>
        </div>
      )}

      <Content character={character} moveCategorySlug={moveCategorySlug} />
    </CharacterPageLayout>
  );
};

interface ContentProps {
  character: CharacterFragment;
  moveCategorySlug: string;
}

const Content: React.FC<ContentProps> = ({ character, moveCategorySlug }) => {
  const { data, loading } = useMovesQuery({ variables: { characterSlug: character.slug, moveCategorySlug } });
  if (loading) return <NotFound>Loading...</NotFound>;
  if (!data) return <NotFound>読み込みに失敗しました。</NotFound>;

  return <MoveList moves={data.moves} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const characterSlug = params?.character as string;
  const moveCategorySlug = params?.moveCategory as string;

  const characterData: CharacterQuery = await fetchGraphql(CharacterDocument, { slug: characterSlug });
  const moveCategoriesData: MoveCategoriesQuery = await fetchGraphql(MoveCategoriesDocument, {
    characterSlug,
    moveCategorySlug,
  });

  return {
    props: {
      character: characterData.character,
      moveCategories: moveCategoriesData.moveCategories,
      moveCategorySlug: moveCategorySlug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: MoveCategoryPathsQuery = await fetchGraphql(MoveCategoryPathsDocument);

  const paths = data.moveCategories.map(c => ({
    params: {
      character: c.character.slug,
      moveCategory: c.slug,
    },
  }));

  return { paths, fallback: false };
};

export default Page;
