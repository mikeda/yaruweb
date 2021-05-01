import React from 'react';

import {
  ComboCategoryDetailDocument,
  ComboCategoryDetailFragment,
  ComboCategoryDetailQuery,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Heading } from '@/components/Heading';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';

interface Props {
  comboCategory: ComboCategoryDetailFragment;
}

const Page: React.FC<Props> = ({ comboCategory }) => {
  const title = `コンボ(${comboCategory.character.longName}/${comboCategory.name})`;

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />

      <Heading lv="h1">{title}</Heading>

      <PageContent comboCategory={comboCategory} />
    </DashboardContent>
  );
};

const PageContent: React.FC<Props> = ({ comboCategory }) => {
  return (
    <div className="bl_horizTable">
      <table>
        <thead>
          <tr>
            <th>名前</th>
          </tr>
        </thead>
        <tbody>
          {comboCategory.combos.map(combo => {
            return (
              <tr key={combo.id}>
                <td>{combo.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const comboCategoryId = params?.comboCategoryId as string;
  const data: ComboCategoryDetailQuery = await fetchGraphql(ComboCategoryDetailDocument, { comboCategoryId });

  return { props: { comboCategory: data.comboCategory } };
};

export default Page;
