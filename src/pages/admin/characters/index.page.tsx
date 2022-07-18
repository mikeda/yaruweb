import React from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';

import { CharacterCard, AdminBreadcrumbs, AdminContent, NotFound } from '@/components';
import { pagesPath } from '@/generated/$path';
import { useAdminCharactersPageQuery } from '@/generated/graphql';
import { resolveUrlObject } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();

  return (
    <AdminContent
      title="キャラクター"
      breadcrumb={<AdminBreadcrumbs to="characters" />}
      actions={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          href={resolveUrlObject(router, pagesPath.admin.characters.new.$url())}
        >
          作成する
        </Button>
      }
    >
      <CharacterList />
    </AdminContent>
  );
};

const CharacterList: React.FC = () => {
  const { data, loading, error } = useAdminCharactersPageQuery();

  if (loading) return <NotFound>Loading...</NotFound>;
  if (error) return <NotFound>エラーが発生しました。{error.message}</NotFound>;
  const characters = data?.characters;
  if (!(characters && characters.records.length > 0)) return <NotFound>キャラクターが登録されていません。</NotFound>;

  return (
    <Grid container spacing={2}>
      {characters.records.map(character => (
        <Grid item key={character.slug} xs={12} sm={6}>
          <CharacterCard character={character} dashboard />
        </Grid>
      ))}
    </Grid>
  );
};

export default Page;
