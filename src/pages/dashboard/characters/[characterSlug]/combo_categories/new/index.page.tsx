import React from 'react';

import {
  ComboCategoryAttributes,
  PageDashboardComboCategoryNewQuery,
  useCreateComboCategoryMutation,
  usePageDashboardComboCategoryNewQuery,
} from '@/lib/graphql/types';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { ComboCategoryForm } from '@/components/ComboCategoryForm';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { DashboardBreadcrumbs } from '@/components';

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
    <DashboardContent
      title="カテゴリ登録"
      breadcrumb={<DashboardBreadcrumbs to="comboCategoriesNew" character={character} />}
    >
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
