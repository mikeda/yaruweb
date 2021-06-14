import React from 'react';

import { useCharactersQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { NotFound } from '@/components/NotFound';
import Link from 'next/link';
import { Routes } from '@/lib/Routes';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { PageHeader } from '@/components/layouts/PageHeader';

const Page: React.FC = () => (
  <DashboardContent activeTab="character">
    <Head title="キャラクター" />
    <Breadcrumbs current="キャラクター" />
    <PageHeader title="キャラクター" addPageUrl={Routes.dashboard.character.new()} />

    <CharacterList />
  </DashboardContent>
);

const CharacterList: React.FC = () => {
  const { data, loading, error } = useCharactersQuery();

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
                  <a href={Routes.character.detail(character.slug)} target="_blank" rel="noreferrer">
                    {character.longName}
                  </a>
                </td>
                <td>
                  <Link href={Routes.dashboard.character.edit(character.slug)}>
                    <a>編集</a>
                  </Link>
                  /
                  <Link href={Routes.dashboard.moveCategory.index(character.slug)}>
                    <a>技データ</a>
                  </Link>
                  /
                  <Link href={Routes.dashboard.comboCategory.index(character.slug)}>
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
