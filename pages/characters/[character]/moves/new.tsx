import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import {
  CharacterDocument,
  CharacterPathsDocument,
  CharacterPathsQuery,
  CharacterQuery,
  CharacterSummaryFragment,
  useCreateMoveMutation,
} from '@/lib/graphql/types';
import { Routes } from '@/lib/Routes';
import { MoveForm } from '@/components/MoveForm';
import { Heading } from '@/components/Heading';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';

interface Props {
  character: CharacterSummaryFragment;
}

const Page: React.FC<Props> = ({ character }) => {
  const title = `技データ登録 (${character.longName})`;

  return (
    <Content>
      <Head title={title} />
      <Heading lv="h1">{title}</Heading>

      <PageContent character={character} />
    </Content>
  );
};

const PageContent: React.FC<Props> = ({ character }) => {
  const router = useRouter();

  const [createMove, { loading }] = useCreateMoveMutation({
    onCompleted: data => {
      const moveCategorySlug = data.createMove?.move.moveCategory.slug;
      if (!moveCategorySlug) return;

      router.push(Routes.characterMoves(character.slug));
      toast.success('技を作成しました。');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return (
    <MoveForm
      characterSlug={character.slug}
      onSubmit={attributes => {
        createMove({ variables: { characterSlug: character.slug, attributes } });
      }}
      loading={loading}
    />
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.character as string;
  const data: CharacterQuery = await fetchGraphql(CharacterDocument, { slug });

  return { props: { character: data.character } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: CharacterPathsQuery = await fetchGraphql(CharacterPathsDocument);

  const paths = data.characters.map(c => ({ params: { character: c.slug } }));

  return { paths, fallback: false };
};

export default Page;
