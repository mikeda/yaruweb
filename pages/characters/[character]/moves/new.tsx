import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useCreateMoveMutation } from '@/lib/graphql/types';
import { Routes } from '@/lib/Routes';
import { MoveForm } from '@/components/MoveForm';
import { Heading } from '@/components/Heading';

const Page: React.FC = () => {
  const router = useRouter();

  const [createMove, { loading }] = useCreateMoveMutation({
    onCompleted: data => {
      const moveCategorySlug = data.createMove?.move.moveCategory.slug;
      if (!moveCategorySlug) return;

      router.push(Routes.characterMoves(characterSlug));
      toast.success('技を作成しました。');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const characterSlug = router.query.character as string;
  if (!characterSlug) return null;

  return (
    <>
      <Heading lv="h1">技登録</Heading>

      <MoveForm
        characterSlug={characterSlug}
        onSubmit={attributes => {
          createMove({ variables: { characterSlug, attributes } });
        }}
        loading={loading}
      />
    </>
  );
};

export default Page;
