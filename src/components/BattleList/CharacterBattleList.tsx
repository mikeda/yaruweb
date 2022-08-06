import React, { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import { BattleList } from './BattleList';

import { PlayerBattleCountChip, SelectChipContainer } from '@/components';
import { useCharacterBattleListQuery } from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  characterSlug: string;
}

export const CharacterBattleList: React.FC<Props> = ({ characterSlug }) => {
  const setLoading = useSetRecoilState(loadingState);
  const [playerSlug, setPlayerSlug] = useState<string>();

  const { data, fetchMore, refetch } = useCharacterBattleListQuery({
    variables: { characterSlug },
    onCompleted: () => {
      setLoading(false);
    },
    notifyOnNetworkStatusChange: true,
  });

  const onClickMore = () => {
    fetchMore({ variables: { after: pageInfo.endCursor } });
  };

  if (!data) return null;

  const battles = data.character.battles.edges.map(edge => edge.node);
  const pageInfo = data.character.battles.pageInfo;
  const playerBattleCounts = data.character.playerBattleCounts;

  return (
    <BattleList
      battles={battles}
      selector={
        <SelectChipContainer>
          {playerBattleCounts.map(bc => (
            <PlayerBattleCountChip
              key={bc.player.id}
              battleCount={bc}
              active={playerSlug === bc.player.slug}
              onClick={() => {
                if (playerSlug === bc.player.slug) {
                  setPlayerSlug(undefined);
                  refetch({ playerSlug: undefined });
                } else {
                  setPlayerSlug(bc.player.slug);
                  refetch({ playerSlug: bc.player.slug });
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
