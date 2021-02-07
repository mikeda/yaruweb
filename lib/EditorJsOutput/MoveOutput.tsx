import React from 'react';
import { useMoveQuery } from '../graphql/types';
import { MoveMedia } from '@/components/MoveMedia';

type OutputData = {
  moveId: string;
};

interface Props {
  data: OutputData;
}

export const MoveOutput: React.FC<Props> = ({ data: { moveId } }) => {
  const { data, loading, error } = useMoveQuery({ variables: { id: moveId } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>技データの読込に失敗しました。{error.message}</p>;
  if (!data) return <p>技データの読込に失敗しました。</p>;

  return <MoveMedia move={data.move} />;
};
