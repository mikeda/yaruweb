import React, { useState } from 'react';
import { useMoveSelectOptionsQuery } from '@/lib/graphql/types';

interface Props {
  characterSlug: string;
  onChange: (moveId: string) => void;
}

export const MoveSelect: React.FC<Props> = ({ characterSlug, onChange }) => {
  const [moveCategoryId, setMoveCategoryId] = useState<string>();
  const { data, error, loading } = useMoveSelectOptionsQuery({ variables: { characterSlug } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>読み込みに失敗しました。</p>;
  if (!data) return <p>読み込みに失敗しました。</p>;
  if (data.moveCategories.length === 0) return <p>技データが登録されていません。</p>;

  const moveCategory = data.moveCategories.find(c => c.id === moveCategoryId);

  return (
    <>
      <div className="el_form_group">
        <div className="el_form_select">
          <select
            className="el_form_input"
            value={moveCategoryId}
            onChange={event => {
              event.preventDefault();

              const moveCategoryId = event.target.value;
              if (!moveCategoryId) {
                setMoveCategoryId(undefined);
                return;
              }

              setMoveCategoryId(moveCategoryId);
            }}
          >
            <option value=""></option>
            {data.moveCategories.map(moveCategory => (
              <option key={moveCategory.id} value={moveCategory.id}>
                {moveCategory.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {moveCategory && moveCategory.moves.length > 0 && (
        <div className="el_form_group">
          <div className="el_form_select">
            <select
              className="el_form_input"
              onChange={event => {
                event.preventDefault();

                const moveId = event.target.value;
                if (!moveId) return;

                onChange(moveId);
              }}
            >
              <option value=""></option>
              {moveCategory.moves.map(move => (
                <option key={move.id} value={move.id}>
                  {move.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  );
};
