import React from 'react';

import { useSetRecoilState } from 'recoil';

import { BattleList } from './BattleList';

import { useTournamentBattleListQuery } from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  tournamentId: string;
}

export const TournamentBattleList: React.FC<Props> = ({ tournamentId }) => {
  const setLoading = useSetRecoilState(loadingState);

  const { data, fetchMore } = useTournamentBattleListQuery({
    variables: { tournamentId },
    onCompleted: () => {
      setLoading(false);
    },
    notifyOnNetworkStatusChange: true,
  });

  const onClickMore = () => {
    fetchMore({ variables: { after: pageInfo.endCursor } });
  };

  if (!data) return null;

  const battles = data.tournament.battles.edges.map(edge => edge.node);
  const pageInfo = data.tournament.battles.pageInfo;

  return <BattleList battles={battles} hasNextPage={pageInfo.hasNextPage} onClickMore={onClickMore} />;
};
