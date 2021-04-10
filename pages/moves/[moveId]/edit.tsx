import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useMoveQuery, useUpdateMoveMutation } from '@/lib/graphql/types';
import { Routes } from '@/lib/Routes';
import { MoveForm } from '@/components/MoveForm';
import { NotFound } from '@/components/NotFound';
import { Heading } from '@/components/Heading';

const Page: React.FC = () => {
  const router = useRouter();

  const moveId = router.query.moveId as string;

  const { data, loading: moveLoading, error: moveError } = useMoveQuery({ variables: { id: moveId } });
  const [updateMove, { loading }] = useUpdateMoveMutation({
    onCompleted: data => {
      const move = data.updateMove?.move;
      if (!move) return;

      router.push(Routes.characterMoves(move.character.slug));
      toast.success('技データを更新しました。');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  if (!moveId) return <NotFound>Loading...</NotFound>;
  if (moveLoading) return <NotFound>技データがありません。</NotFound>;
  if (moveError) return <NotFound>技データの読み込みに失敗しました。</NotFound>;
  if (!data) return <NotFound>技データがありません。</NotFound>;
  const character = data.move.character;
  if (!character) return <NotFound>技データがありません。</NotFound>;

  return (
    <>
      <Heading lv="h1">技登録</Heading>

      <MoveForm
        move={data.move}
        characterSlug={character.slug}
        onSubmit={attributes => {
          updateMove({ variables: { id: data.move.id, attributes } });
        }}
        loading={loading}
      />
    </>
  );
};

export default Page;
