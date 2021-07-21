import React from 'react';

import {
  DashboardMoveCategoryNewPageQuery,
  MoveCategoryAttributes,
  useCreateMoveCategoryMutation,
  useDashboardMoveCategoryNewPageQuery,
} from '@/lib/graphql/types';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { MoveCategoryForm } from '@/components/MoveCategoryForm';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { useRouteParams } from './hooks';

const Page: React.FC = () => {
  const { characterSlug } = useRouteParams();
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = useDashboardMoveCategoryNewPageQuery({
    variables: { characterSlug: characterSlug as string },
    skip: !characterSlug,
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

  return <MoveCategoryForm onSubmit={onSubmit} />;
};

export default Page;
