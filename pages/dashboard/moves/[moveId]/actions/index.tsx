import React from 'react';

import { ActionFragment, PageDashboardMoveActionsDocument, PageDashboardMoveActionsQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { PageHeader } from '@/components/layouts/PageHeader';
import { Routes } from '@/lib/Routes';
import Link from 'next/link';
import { parseAction } from '@/lib/graphql/parseAction';

interface Props {
  data: PageDashboardMoveActionsQuery;
}

const Page: React.FC<Props> = ({ data: { move } }) => {
  const title = move.name;

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />

      <PageHeader title={title} addPageUrl={Routes.dashboard.move.new(move.id)} />

      <PageContent actions={move.actions} />
    </DashboardContent>
  );
};

const PageContent: React.FC<{ actions: ActionFragment[] }> = ({ actions }) => {
  return (
    <div className="bl_horizTable">
      <table>
        <thead>
          <tr>
            <th>判定(投げ抜け)</th>
            <th>ダメージ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {actions.map(a => {
            const action = parseAction(a);
            return (
              <tr key={action.id}>
                <td>
                  {action.type}
                  {action.escape && `(${action.escape})`}
                </td>
                <td>{action.damage}</td>
                <td>
                  <Link href={Routes.dashboard.action.edit(action.id)}>
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const moveId = params?.moveId as string;
  const data: PageDashboardMoveActionsQuery = await fetchGraphql(PageDashboardMoveActionsDocument, { moveId });

  return { props: { data } };
};

export default Page;
