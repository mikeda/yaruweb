import React from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { useRouteParams } from './hooks/useRouteParams';

import { MoveCategoryForm, DashboardContent } from '@/components';
import {
  DashboardMoveCategoryNewPageQuery,
  MoveCategoryAttributes,
  useCreateMoveCategoryMutation,
  useDashboardMoveCategoryNewPageQuery,
} from '@/generated/graphql';
import { loadingState } from '@/lib';

const Page: React.FC = () => {
  const { slug } = useRouteParams();
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = useDashboardMoveCategoryNewPageQuery({
    variables: { characterSlug: slug as string },
    skip: !slug,
  });

  setLoading(loading);
  if (!data) return null;
  const { character } = data;

  return (
    <DashboardContent title="カテゴリ作成">
      <PageContent character={character} />
    </DashboardContent>
  );
};

const PageContent: React.FC<DashboardMoveCategoryNewPageQuery> = ({ character }) => {
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
