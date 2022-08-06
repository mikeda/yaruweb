import React, { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import { BattleList } from './BattleList';

import { CharacterBattleCountChip, SelectChipContainer } from '@/components';
import { usePlayerBattleListQuery } from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  playerSlug: string;
}

export const PlayerBattleList: React.FC<Props> = ({ playerSlug }) => {
  const setLoading = useSetRecoilState(loadingState);
  const [characterSlug, setCharacterSlug] = useState<string>();

  const { data, fetchMore, refetch } = usePlayerBattleListQuery({
    variables: { playerSlug },
    onCompleted: () => {
      setLoading(false);
    },
    notifyOnNetworkStatusChange: true,
  });

  const onClickMore = () => {
    fetchMore({ variables: { after: pageInfo.endCursor } });
  };

  if (!data) return null;

  const battles = data.player.battles.edges.map(edge => edge.node);
  const pageInfo = data.player.battles.pageInfo;
  const characterBattleCounts = data.player.characterBattleCounts;

  return (
    <BattleList
      battles={battles}
      selector={
        <SelectChipContainer>
          {characterBattleCounts.map(bc => (
            <CharacterBattleCountChip
              key={bc.character.id}
              battleCount={bc}
              active={characterSlug === bc.character.slug}
              onClick={() => {
                if (characterSlug === bc.character.slug) {
                  setCharacterSlug(undefined);
                  refetch({ characterSlug: undefined });
                } else {
                  setCharacterSlug(bc.character.slug);
                  refetch({ characterSlug: bc.character.slug });
                }
              }}
            />
          ))}
        </SelectChipContainer>
      }
      hasNextPage={pageInfo.hasNextPage}
      onClickMore={onClickMore}
    />
  );
};
