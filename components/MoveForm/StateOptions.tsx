import { StateFragment } from '@/lib/graphql/types';
import React from 'react';

interface Props {
  states: StateFragment[];
}

export const StateOptions: React.FC<Props> = ({ states }) => {
  return (
    <>
      <option value=""></option>
      {states.map(state => (
        <option key={state.id} value={state.id}>
          {state.name}
        </option>
      ))}
    </>
  );
};
