import React from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { useRouteParams } from './hooks';

import { ComboCategoryForm, DashboardContent } from '@/components';
import {
  DashboardComboCategoryNewPageQuery,
  ComboCategoryAttributes,
  useCreateComboCategoryMutation,
  useDashboardComboCategoryNewPageQuery,
  loadingState,
} from '@/lib';



const Page: React.FC = () => {
  const { slug } = useRouteParams();
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = useDashboardComboCategoryNewPageQuery({
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

const PageContent: React.FC<DashboardComboCategoryNewPageQuery> = ({ character }) => {
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

  return <ComboCategoryForm comboCategories={character.comboCategories} onSubmit={onSubmit} />;
};

export default Page;
