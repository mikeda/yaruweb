import React from 'react';
import { useComboQuery } from '@/lib/graphql/types';
import { ComboMedia } from '@/components/ComboMedia';

interface Props {
  comboId: string;
  attributes: { [key: string]: unknown };
}

export const Combo: React.FC<Props> = ({ comboId, attributes, children }) => {
  const { data, error, loading } = useComboQuery({ variables: { comboId } });

  return (
    <div {...attributes}>
      <div style={{ userSelect: 'none' }} contentEditable={false}>
        {!loading && !error && data && <ComboMedia combo={data.combo} />}
      </div>
      {children}
    </div>
  );
};
