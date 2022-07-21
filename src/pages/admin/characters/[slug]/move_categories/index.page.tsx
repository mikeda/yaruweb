import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import { AdminContent, AdminBreadcrumbs, MoveTables } from '@/components';
import { pagesPath } from '@/generated/$path';
import { useDashboardCharacterMovesPageQuery } from '@/generated/graphql';
import { loadingState, resolveUrlObject } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, loading } = useDashboardCharacterMovesPageQuery({
    variables: { characterSlug: slug as string },
    skip: !slug,
  });

  const setLoading = useSetRecoilState(loadingState);

  setLoading(loading);

  if (!data) return null;
  const { character } = data;

  return (
    <AdminContent
      title="コマンドリスト"
      breadcrumb={<AdminBreadcrumbs to="moveCategories" character={character} />}
      actions={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          href={resolveUrlObject(router, pagesPath.admin.characters._slug(character.slug).move_categories.new.$url())}
        >
          カテゴリ追加
        </Button>
      }
    >
      <MoveTables characterSlug={character.slug} />
    </AdminContent>
  );
};

export default Page;
