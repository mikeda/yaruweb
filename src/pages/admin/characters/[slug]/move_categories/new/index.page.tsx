import React from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { useRouteParams } from './hooks/useRouteParams';

import { MoveCategoryForm, AdminContent } from '@/components';
import {
  AdminMoveCategoryNewPageQuery,
  MoveCategoryAttributes,
  useCreateMoveCategoryMutation,
  useAdminMoveCategoryNewPageQuery,
} from '@/generated/graphql';
import { loadingState } from '@/lib';

const Page: React.FC = () => {
  const { slug } = useRouteParams();
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = useAdminMoveCategoryNewPageQuery({
    variables: { characterSlug: slug as string },
    skip: !slug,
  });

  setLoading(loading);
  if (!data) return null;
  const { character } = data;

  return (
    <AdminContent title="カテゴリ作成">
      <PageContent character={character} />
    </AdminContent>
  );
};

const PageContent: React.FC<AdminMoveCategoryNewPageQuery> = ({ character }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createMoveCategory, { loading }] = useCreateMoveCategoryMutation({
    onCompleted: () => {
      toast.success('技データカテゴリを登録しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: MoveCategoryAttributes) => {
    createMoveCategory({ variables: { characterSlug: character.slug, attributes } });
  };

  setLoading(loading);

  return <MoveCategoryForm moveCategories={character.moveCategories} onSubmit={onSubmit} />;
};

export default Page;
