import { Tournament, TournamentVideo } from '@/generated/graphql';

type TitleArgs = Pick<TournamentVideo, 'label'> & { tournament: Pick<Tournament, 'name'> };

export const title = (tournamentVideo: TitleArgs) => {
  return tournamentVideo.label
    ? `${tournamentVideo.tournament.name}（${tournamentVideo.label}）`
    : tournamentVideo.tournament.name;
};
