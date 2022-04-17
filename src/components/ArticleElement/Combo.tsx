import React from 'react';
import { useArticleElementComboQuery } from '@/lib/graphql/types';
import { ComboMedia } from '@/components/ComboMedia';

interface Props {
  comboId: string;
  attributes: { [key: string]: unknown };
}

export const Combo: React.FC<Props> = ({ comboId, attributes }) => {
  const { data } = useArticleElementComboQuery({ variables: { comboId } });

  return (
    <div {...attributes}>
      <div style={{ userSelect: 'none' }} contentEditable={false}>
        {data && <ComboMedia combo={data.combo} />}
      </div>
    </div>
  );
};
