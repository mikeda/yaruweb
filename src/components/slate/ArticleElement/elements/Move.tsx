import React from 'react';

import { MoveMedia } from '@/components';
import { useArticleElementMoveQuery } from '@/generated/graphql';

interface Props {
  moveId: string;
  attributes: { [key: string]: unknown };
  children: React.ReactNode;
}

export const Move: React.FC<Props> = ({ moveId, attributes, children }) => {
  const { data } = useArticleElementMoveQuery({ variables: { moveId } });

  return (
    <div {...attributes}>
      <div style={{ userSelect: 'none' }} contentEditable={false}>
        {data && <MoveMedia move={data.move} />}
      </div>
      {children}
    </div>
  );
};
