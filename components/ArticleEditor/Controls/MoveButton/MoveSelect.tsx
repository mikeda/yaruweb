import React, { useState } from 'react';
import { MoveCategoryFragment, MoveFragment, useMoveCategoriesQuery, useMovesLazyQuery } from '@/lib/graphql/types';
import { toast } from 'react-toastify';

interface Props {
  characterSlug: string;
  onChange: (moveId: string) => void;
}

export const MoveSelect: React.FC<Props> = ({ characterSlug, onChange }) => {
  const [moveCategory, setMoveCategory] = useState<MoveCategoryFragment>();
  const [moves, setMoves] = useState<MoveFragment[]>();
  const { data, error, loading } = useMoveCategoriesQuery({ variables: { characterSlug } });
  const [getMoves, { loading: movesLoading }] = useMovesLazyQuery({
    onCompleted: ({ moves }) => {
      if (!moves) return;
      if (moves.length === 0) toast.error('技データが登録されていません。');

      setMoves(moves);
    },
    onError: e => {
      toast.error(e.message);
    },
    fetchPolicy: 'network-only',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>読み込みに失敗しました。</p>;
  if (!data) return <p>読み込みに失敗しました。</p>;
  if (data.moveCategories.length === 0) return <p>技データが登録されていません。</p>;

  return (
    <>
      <div className="el_form_group">
        <div className="el_form_select">
          <select
            className="el_form_input"
            onChange={event => {
              event.preventDefault();

              setMoves(undefined);
              const moveCategoryId = event.target.value;
              if (!moveCategoryId) return;

              getMoves({ variables: { moveCategoryId } });
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

      {moves && moves.length > 0 && (
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
              {moves.map(move => (
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
