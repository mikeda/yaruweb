import React from 'react';
import { useMoveQuery } from '@/lib/graphql/types';
import { MoveMedia } from '../../MoveMedia';

interface Props {
  moveId: string;
}

export const Preview: React.FC<Props> = ({ moveId }) => {
  const { data, error, loading } = useMoveQuery({ variables: { id: moveId } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>技データの読み込みに失敗しました。</p>;
  if (!data) return <p>技データの読み込みに失敗しました。</p>;

  return <MoveMedia move={data.move} />;
};
