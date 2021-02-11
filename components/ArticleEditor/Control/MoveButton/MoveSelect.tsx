import React from 'react';
import { useMovesQuery } from '@/lib/graphql/types';

interface Props {
  characterSlug: string;
  onChange: (moveId: string) => void;
}

export const MoveSelect: React.FC<Props> = ({ characterSlug, onChange }) => {
  const { data, error, loading } = useMovesQuery({ variables: { characterSlug } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>読み込みに失敗しました。</p>;
  if (!data) return <p>読み込みに失敗しました。</p>;

  return (
    <div className="el_form_group">
      <div className="el_form_select">
        <select
          className="el_form_input"
          onChange={event => {
            event.preventDefault();
            onChange(event.target.value);
          }}
        >
          <option value=""></option>
          {data.moves.map(move => (
            <option key={move.id} value={move.id}>
              {move.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
