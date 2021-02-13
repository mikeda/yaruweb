import React from 'react';
import { useMoveQuery } from '@/lib/graphql/types';
import { MoveMedia } from '@/components/MoveMedia';

interface Props {
  moveId: string;
  attributes: { [key: string]: unknown };
}

export const Move: React.FC<Props> = ({ moveId, attributes, children }) => {
  const { data, error, loading } = useMoveQuery({ variables: { id: moveId } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>技データの読み込みに失敗しました。</p>;
  if (!data) return <p>技データの読み込みに失敗しました。</p>;

  return (
    <div {...attributes}>
      <div style={{ userSelect: 'none' }} contentEditable={false}>
        <MoveMedia move={data.move} />
      </div>
      {children}
    </div>
  );
};
