import React from 'react';
import { useCombosQuery } from '@/lib/graphql/types';
import { ComboMedia } from '@/components/ComboMedia';
import { NotFound } from '@/components/NotFound';

interface Props {
  comboCategoryId: string;
}

export const ComboList: React.FC<Props> = ({ comboCategoryId }) => {
  const { data, loading } = useCombosQuery({ variables: { comboCategoryId } });

  if (loading) return <NotFound>読み込み中</NotFound>;
  const combos = data?.combos;
  if (!combos || combos.length === 0) return <NotFound>コンボがありません。</NotFound>;

  return (
    <>
      <div className="ly_row ly_row__mg_md">
        {combos.map(combo => {
          if (!combo) return;

          return (
            <div className="ly_col_12" key={combo.id}>
              <ComboMedia combo={combo} />
            </div>
          );
        })}
      </div>
    </>
  );
};
