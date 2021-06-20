import React from 'react';

import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { NotFound } from '@/components/NotFound';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { PageHeader } from '@/components/layouts/PageHeader';
import { usePageDashboardCharactersQuery } from '@/lib/graphql/types';
import { dashboardPath, path } from '@/lib';

const Page: React.FC = () => (
  <DashboardContent activeTab="character">
    <Head title="キャラクター" />
    <Breadcrumbs items={[{ name: 'キャラクター' }]} />
    <PageHeader title="キャラクター" addPageUrl={dashboardPath({ to: 'charactersNew' })} />

    <CharacterList />
  </DashboardContent>
);

const CharacterList: React.FC = () => {
  const { data, loading, error } = usePageDashboardCharactersQuery();

  if (loading) return <NotFound>Loading...</NotFound>;
  if (error) return <NotFound>エラーが発生しました。{error.message}</NotFound>;
  const characters = data?.characters;
  if (!(characters && characters.length > 0)) return <NotFound>キャラクターが登録されていません。</NotFound>;

  return (
    <div className="bl_horizTable">
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {characters.map(character => {
            return (
              <tr key={character.slug}>
                <td>
                  <a href={path({ to: 'character', characterSlug: character.slug })} target="_blank" rel="noreferrer">
                    {character.longName}
                  </a>
                </td>
                <td>
                  <Link href={dashboardPath({ to: 'characterEdit', characterId: character.slug })}>
                    <a>編集</a>
                  </Link>
                  /
                  <Link href={dashboardPath({ to: 'moveCategories', characterSlug: character.slug })}>
                    <a>技データ</a>
                  </Link>
                  /
                  <Link href={dashboardPath({ to: 'comboCategories', characterSlug: character.slug })}>
                    <a>コンボ</a>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
