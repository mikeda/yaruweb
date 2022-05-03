import React from 'react';
import { useArticleElementComboQuery } from '@/lib';
import { ComboMedia } from '@/components';

interface Props {
  comboId: string;
  attributes: { [key: string]: unknown };
  children: React.ReactNode;
}

export const Combo: React.FC<Props> = ({ comboId, attributes, children }) => {
  const { data } = useArticleElementComboQuery({ variables: { comboId } });

  return (
    <div {...attributes}>
      <div style={{ userSelect: 'none' }} contentEditable={false}>
        {data && <ComboMedia combo={data.combo} />}
      </div>
      {children}
    </div>
  );
};
