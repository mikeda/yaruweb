import React from 'react';

import { useMyCombosQuery } from '@/lib/graphql/types';
import { Layout } from '@/pages-lib/mypage/Layout';
import { NotFound } from '@/components/NotFound';

const ComboList: React.FC = () => {
  const { data, loading } = useMyCombosQuery();
  if (loading) return <NotFound>読み込み中</NotFound>;

  const combos = data?.myCombos.nodes;
  if (!(combos && combos.length > 0)) return <NotFound>記事がありません。</NotFound>;

  return (
    <div className="bl_horizTable">
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>ステータス</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {combos.map(combo => {
            if (!combo) return;

            return (
              <tr key={combo.id}>
                <td>{combo.character.name}</td>
                <td>
                  <ul>
                    {combo.commands.map(command => {
                      if (!command) return;

                      return <li key={command.id}>{command.move.name}</li>;
                    })}
                  </ul>
                </td>
                <td>
                  <a href={`/me/combos/${combo.id}/edit`}>編集</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Page: React.FC = () => (
  <Layout activeTab="combos">
    <div className="bl_myContHeader">
      <a href="/me/combos/new" className="el_btn">
        投稿する
      </a>
    </div>

    <ComboList />
  </Layout>
);

export default Page;
