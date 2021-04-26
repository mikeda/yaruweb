import React from 'react';
import {
  MoveCategoryAttributes,
  MoveCategoryDocument,
  MoveCategoryFragment,
  MoveCategoryQuery,
  useUpdateMoveCategoryMutation,
} from '@/lib/graphql/types';
import { useForm } from 'react-hook-form';

import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { useRouter } from 'next/router';
import { Routes } from '@/lib/Routes';
import { toast } from 'react-toastify';

interface Props {
  moveCategory: MoveCategoryFragment;
}

export const Page: React.FC<Props> = ({ moveCategory }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<MoveCategoryAttributes>();
  const [updateMoveCategory, { loading }] = useUpdateMoveCategoryMutation({
    onCompleted: () => {
      toast.success('技データカテゴリを作成しました。');
      router.push(Routes.dashboard.comboCategory.index(moveCategory.character.slug));
    },
    onError: e => {
      toast.error(e.message);
    },
  });
  const onSubmit = (attributes: MoveCategoryAttributes) => {
    updateMoveCategory({ variables: { moveCategoryId: moveCategory.id, attributes } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="name" ref={register({ valueAsNumber: true })} />

      <input type="submit" disabled={loading} />
    </form>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const comboCategoryId = params?.comboCategoryId as string;
  const data: MoveCategoryQuery = await fetchGraphql(MoveCategoryDocument, { comboCategoryId });

  return { props: { moveCategory: data.moveCategory } };
};
