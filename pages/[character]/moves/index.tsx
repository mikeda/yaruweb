import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

import {
  CharacterDocument,
  CharacterFragment,
  CharacterPathsDocument,
  CharacterPathsQuery,
  CharacterQuery,
  MoveCategoriesDocument,
  MoveCategoriesQuery,
  MoveCategoryFragment,
  MoveFragment,
  MovesDocument,
  MovesQuery,
} from '@/lib/graphql/types';
import { CharacterPageLayout } from '@/components/layouts/CharacterPageLayout';
import { MoveList } from '@/components/MoveList';
import { Routes } from '@/lib/Routes';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { useCurrentPlayer } from 'hooks/useCurrentPlayer';
import { TabLinkGroup } from '@/components/blocks/TabLinkGroup';
import { TabLink } from '@/components/blocks/TabLink';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';

interface Props {
  character: CharacterFragment;
  moveCategories: MoveCategoryFragment[];
  moves: MoveFragment[];
}

const Page: React.FC<Props> = ({ character, moveCategories, moves: allMoves }) => {
  const { currentPlayer } = useCurrentPlayer();
  const [moveCategory, setMoveCategory] = useState<MoveCategoryFragment>();
  const [moves, setMoves] = useState(allMoves);

  return (
    <Content>
      <Head
        title={`${character.longName}の動画`}
        description={`ユーザーが投稿した${character.longName}のオススメ動画です。`}
      />

      <CharacterPageLayout character={character} activeTab="moves">
        <TabLinkGroup>
          <TabLink
            text="全て"
            active={!moveCategory}
            onClick={() => {
              setMoveCategory(undefined);
            }}
          />
          {moveCategories.map(c => (
            <TabLink
              key={c.id}
              text={c.name}
              active={c === moveCategory}
              onClick={() => {
                setMoveCategory(c);
                setMoves(c ? allMoves.filter(move => move.moveCategoryId === c.id) : allMoves);
              }}
            />
          ))}
        </TabLinkGroup>
        {currentPlayer && (
          <div className="bl_myContHeader">
            <Link href={Routes.createMove(character.slug)}>
              <a className="el_btn">登録する</a>
            </Link>
          </div>
        )}
        <MoveList moves={moves} />
      </CharacterPageLayout>
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const characterSlug = params?.character as string;

  const characterData: CharacterQuery = await fetchGraphql(CharacterDocument, { slug: characterSlug });
  const moveCategoriesData: MoveCategoriesQuery = await fetchGraphql(MoveCategoriesDocument, {
    characterSlug,
  });
  const movesData: MovesQuery = await fetchGraphql(MovesDocument, { characterSlug });

  return {
    props: {
      character: characterData.character,
      moveCategories: moveCategoriesData.moveCategories,
      moves: movesData.moves,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: CharacterPathsQuery = await fetchGraphql(CharacterPathsDocument);

  const paths = data.characters.map(c => ({
    params: {
      character: c.slug,
    },
  }));

  return { paths, fallback: false };
};

export default Page;
