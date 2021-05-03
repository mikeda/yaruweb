import React from 'react';

import { useStagesQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { NotFound } from '@/components/NotFound';
import Link from 'next/link';
import { Routes } from '@/lib/Routes';
import { Heading } from '@/components/Heading';

const Page: React.FC = () => (
  <DashboardContent activeTab="stage">
    <Head title="ステージ" />

    <Heading lv="h1">ステージ</Heading>

    <StageList />
  </DashboardContent>
);

const StageList: React.FC = () => {
  const { data, loading } = useStagesQuery();
  if (loading) return <NotFound>読み込み中</NotFound>;
  if (!data) return <NotFound>読み込みに失敗しました</NotFound>;

  const stages = data.stages;

  return (
    <div className="bl_horizTable">
      <table>
        <thead>
          <tr>
            <th>名前</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {stages.map(stage => {
            if (!stage) return;

            return (
              <tr key={stage.id}>
                <td>{stage.name}</td>
                <td>
                  <Link href={Routes.dashboard.stage.edit(stage.id)}>
                    <a>編集</a>
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
