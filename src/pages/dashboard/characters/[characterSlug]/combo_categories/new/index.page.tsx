import React from 'react';

import {
  ComboCategoryAttributes,
  PageDashboardComboCategoryNewQuery,
  useCreateComboCategoryMutation,
  usePageDashboardComboCategoryNewQuery,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { ComboCategoryForm } from '@/components/ComboCategoryForm';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { characterSlug } = router.query;
  const { data, loading } = usePageDashboardComboCategoryNewQuery({
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
      <Head title="コンボカテゴリ作成" />

      <PageHeader title="コンボカテゴリ作成" />

      <PageContent character={character} />
    </DashboardContent>
  );
};

const PageContent: React.FC<PageDashboardComboCategoryNewQuery> = ({ character }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createComboCategory, { loading }] = useCreateComboCategoryMutation({
    onCompleted: () => {
      toast.success('コンボカテゴリを登録しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: ComboCategoryAttributes) => {
    createComboCategory({ variables: { characterSlug: character.slug, attributes } });
  };

  setLoading(loading);

  return <ComboCategoryForm onSubmit={onSubmit} />;
};

export default Page;
