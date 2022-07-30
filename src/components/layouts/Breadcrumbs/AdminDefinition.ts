import { CharactersParam, OrganizerParam, PlayerParam, TournamentParam, TournamentVideoParam } from './params';

import { BreadcrumbChainItem } from '.';

import { pagesPath } from '@/generated/$path';

export type AdminBreadcrumbParams =
  | { to: 'characters' }
  | { to: 'character'; character: CharactersParam }
  | { to: 'charactersNew' }
  | { to: 'characterEdit'; character: CharactersParam }
  | { to: 'combos'; character: CharactersParam }
  | { to: 'moves'; character: CharactersParam }
  | { to: 'organizers' }
  | { to: 'organizer'; organizer: OrganizerParam }
  | { to: 'organizersNew' }
  | { to: 'organizerEdit'; organizer: OrganizerParam }
  | { to: 'players' }
  | { to: 'player'; player: PlayerParam }
  | { to: 'playersNew' }
  | { to: 'playerEdit'; player: PlayerParam }
  | { to: 'tournaments' }
  | { to: 'tournament'; tournament: TournamentParam }
  | { to: 'tournamentsNew' }
  | { to: 'tournamentEdit'; tournament: TournamentParam }
  | { to: 'battles'; tournamentVideo: TournamentVideoParam }
  | { to: 'tournamentVideo'; tournamentVideo: TournamentVideoParam }
  | { to: 'tournamentVideoEdit'; tournamentVideo: TournamentVideoParam };

export const breadcrumbChain = (props: AdminBreadcrumbParams): BreadcrumbChainItem => {
  switch (props.to) {
    case 'characters':
      return { name: 'キャラクター', url: pagesPath.dashboard.characters.$url() };
    case 'character':
      return { name: props.character.name, parent: breadcrumbChain({ to: 'characters' }) };
    case 'charactersNew':
      return { name: 'キャラクターを登録', parent: breadcrumbChain({ to: 'characters' }) };
    case 'characterEdit':
      return { name: '編集', parent: breadcrumbChain({ to: 'character', character: props.character }) };
    case 'combos':
      return {
        name: 'コンボ',
        url: pagesPath.dashboard.characters._slug(props.character.slug).combos.$url(),
        parent: breadcrumbChain({ to: 'character', character: props.character }),
      };
    case 'moves':
      return {
        name: 'コマンドリスト',
        url: pagesPath.dashboard.characters._slug(props.character.slug).moves.$url(),
        parent: breadcrumbChain({ to: 'character', character: props.character }),
      };
    case 'organizers':
      return { name: 'オーガナイザー', url: pagesPath.dashboard.organizers.$url() };
    case 'organizer':
      return { name: props.organizer.name, parent: breadcrumbChain({ to: 'organizers' }) };
    case 'organizersNew':
      return { name: 'オーガナイザーを登録', parent: breadcrumbChain({ to: 'organizers' }) };
    case 'organizerEdit':
      return { name: 'オーガナイザーを編集', parent: breadcrumbChain({ to: 'organizer', organizer: props.organizer }) };
    case 'players':
      return { name: 'プレイヤー', url: pagesPath.dashboard.players.$url() };
    case 'player':
      return { name: props.player.name, parent: breadcrumbChain({ to: 'players' }) };
    case 'playersNew':
      return { name: 'プレイヤーを登録', parent: breadcrumbChain({ to: 'players' }) };
    case 'playerEdit':
      return { name: 'プレイヤーを編集', parent: breadcrumbChain({ to: 'player', player: props.player }) };
    case 'tournaments':
      return { name: '大会', url: pagesPath.dashboard.tournaments.$url() };
    case 'tournament':
      return {
        name: props.tournament.name,
        url: pagesPath.dashboard.tournaments._id(props.tournament.id).$url(),
        parent: breadcrumbChain({ to: 'tournaments' }),
      };
    case 'tournamentsNew':
      return { name: '大会を登録', parent: breadcrumbChain({ to: 'tournaments' }) };
    case 'tournamentEdit':
      return { name: '大会を編集', parent: breadcrumbChain({ to: 'tournament', tournament: props.tournament }) };
    case 'battles':
      return {
        name: '対戦',
        url: pagesPath.dashboard.tournament_videos._id(props.tournamentVideo.id).battles.$url(),
        parent: breadcrumbChain({ to: 'tournamentVideo', tournamentVideo: props.tournamentVideo }),
      };
    case 'tournamentVideo':
      return {
        name: props.tournamentVideo.label ? `${props.tournamentVideo.label}の対戦動画` : '対戦動画',
        parent: breadcrumbChain({ to: 'tournament', tournament: props.tournamentVideo.tournament }),
      };
    case 'tournamentVideoEdit':
      return {
        name: '大会動画を編集',
        parent: breadcrumbChain({ to: 'tournament', tournament: props.tournamentVideo.tournament }),
      };
  }
};
