import React from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { AdminContent, ComboCategoryForm } from '@/components';
import {
  ComboCategoryAttributes,
  ComboCategoryPositionSelectFragment,
  usePageAdminComboCategoryEditQuery,
  useUpdateComboCategoryMutation,
} from '@/generated/graphql';
import { loadingState } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { id } = router.query;
  const { data, loading } = usePageAdminComboCategoryEditQuery({
    variables: { comboCategoryId: id as string },
    skip: !id,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);
  if (!data) return null;
  const { comboCategory } = data;

  return (
    <AdminContent title="カテゴリ編集">
      <PageContent
        comboCategoryId={comboCategory.id}
        comboCategory={comboCategory}
        comboCategories={comboCategory.character.comboCategories}
      />
    </AdminContent>
  );
};

const PageContent: React.FC<{
  comboCategoryId: string;
  comboCategory: ComboCategoryAttributes;
  comboCategories: ComboCategoryPositionSelectFragment[];
}> = ({ comboCategoryId, comboCategory, comboCategories }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateComboCategory, { loading }] = useUpdateComboCategoryMutation({
    onCompleted: () => {
      toast.success('コンボカテゴリを更新しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: ComboCategoryAttributes) => {
    updateComboCategory({ variables: { comboCategoryId, attributes } });
  };

  setLoading(loading);

  return <ComboCategoryForm comboCategory={comboCategory} comboCategories={comboCategories} onSubmit={onSubmit} />;
};

export default Page;
