import React from 'react';

import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { NotFound } from '@/components/NotFound';
import { useCharacterCardsQuery } from '@/lib/graphql/types';
import { dashboardPath } from '@/lib';
import { Button, Grid } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { CharacterCard, DashboardBreadcrumbs } from '@/components';

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
  const { data, loading, error } = useCharacterCardsQuery();

  if (loading) return <NotFound>Loading...</NotFound>;
  if (error) return <NotFound>エラーが発生しました。{error.message}</NotFound>;
  const characters = data?.characters;
  if (!(characters && characters.length > 0)) return <NotFound>キャラクターが登録されていません。</NotFound>;

  return (
    <Grid container spacing={2}>
      {characters.map(character => (
        <Grid item key={character.slug} xs={12} sm={6}>
          <CharacterCard character={character} dashboard />
        </Grid>
      ))}
    </Grid>
  );
};

export default Page;
