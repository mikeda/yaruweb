import React from 'react';

import {
  MoveCategoryAttributes,
  PageDashboardMoveCategoryNewQuery,
  useCreateMoveCategoryMutation,
  usePageDashboardMoveCategoryNewQuery,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { MoveCategoryForm } from '@/components/MoveCategoryForm';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { characterSlug } = router.query;
  const { data, loading } = usePageDashboardMoveCategoryNewQuery({
    variables: { characterSlug: characterSlug as string },
    skip: !characterSlug,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);
  if (!data) return null;
  const { character } = data;

  return (
    <DashboardContent activeTab="character">
      <Head title="技データカテゴリ作成" />

      <PageHeader title="技データカテゴリ作成" />

      <PageContent character={character} />
    </DashboardContent>
  );
};

const PageContent: React.FC<PageDashboardMoveCategoryNewQuery> = ({ character }) => {
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
