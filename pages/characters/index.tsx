import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import { CharacterCard } from '@/components/CharacterCard';
import { Routes } from '@/lib/Routes';
import { CharactersDocument } from '@/lib/graphql/types';

interface Character {
  slug: string;
  longName: string;
  faceImageUrl: string;
  country: string;
  fightingStyle: string;
}

interface Props {
  characters: Character[];
}

const Page: React.FC<Props> = ({ characters }) => {
  return (
    <div className="ly_row">
      {characters.map(character => {
        if (!character) return;

        return (
          <div key={character.slug} className="ly_col_6 ly_mbCol_12 hp_mg_b_md">
            <Link href={Routes.character(character.slug)}>
              <a>
                <CharacterCard character={character} />
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const query = CharactersDocument.loc?.source.body;

  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDOPOINT as string, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.toString());
  }

  return { props: { characters: json.data.characters } };
};

export default Page;
