import React from 'react';

import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { NotFound } from '@/components/NotFound';
import { dashboardPath } from '@/lib';
import { Button, Grid } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { CharacterCard, DashboardBreadcrumbs } from '@/components';
import { useDashboardCharactersPageQuery } from '@/lib/graphql/types';

const Page: React.FC = () => (
  <DashboardContent
    title="キャラクター"
    breadcrumb={<DashboardBreadcrumbs to="characters" />}
    actions={
      <Button variant="contained" color="primary" startIcon={<AddIcon />} href={dashboardPath({ to: 'charactersNew' })}>
        作成する
      </Button>
    }
  >
    <CharacterList />
  </DashboardContent>
);

const CharacterList: React.FC = () => {
  const { data, loading, error } = useDashboardCharactersPageQuery();

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
