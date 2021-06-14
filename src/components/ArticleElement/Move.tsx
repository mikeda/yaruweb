import React from 'react';
import { useMoveQuery } from '@/lib/graphql/types';
import { MoveMedia } from '@/components/MoveMedia';

interface Props {
  moveId: string;
  attributes: { [key: string]: unknown };
}

export const Move: React.FC<Props> = ({ moveId, attributes, children }) => {
  const { data, error, loading } = useMoveQuery({ variables: { moveId } });

  return (
    <div {...attributes}>
      <div style={{ userSelect: 'none' }} contentEditable={false}>
        {!loading && !error && data && <MoveMedia move={data.move} />}
      </div>
      {children}
    </div>
  );
};
