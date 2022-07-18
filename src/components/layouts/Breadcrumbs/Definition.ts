import { ArticleParam, CharactersParam, PlayerParam, TournamentParam, TournamentVideoParam } from './params';

import { BreadcrumbChainItem } from '.';

import { pagesPath } from '@/generated/$path';

export type ChainParam =
  | { to: 'articles' }
  | { to: 'article'; article: ArticleParam }
  | { to: 'characters' }
  | { to: 'character'; character: CharactersParam }
  | { to: 'characterBattles'; character: CharactersParam }
  | { to: 'characterCombos'; character: CharactersParam }
  | { to: 'characterMoves'; character: CharactersParam }
  | { to: 'login' }
  | { to: 'players' }
  | { to: 'player'; player: PlayerParam }
  | { to: 'playerBattles'; player: PlayerParam }
  | { to: 'playerStandings'; player: PlayerParam }
  | { to: 'passwordEdit' }
  | { to: 'passwordReset' }
  | { to: 'signup' }
  | { to: 'tournaments' }
  | { to: 'tournament'; tournament: TournamentParam }
  | { to: 'tournamentBattles'; tournament: TournamentParam }
  | { to: 'tournamentVideo'; tournamentVideo: TournamentVideoParam };

export const breadcrumbChain = (props: ChainParam): BreadcrumbChainItem => {
  switch (props.to) {
    case 'articles':
      return { name: '記事', url: pagesPath.articles.$url() };
    case 'article':
      return { name: props.article.title, parent: breadcrumbChain({ to: 'articles' }) };
    case 'characters':
      return { name: 'キャラクター', url: pagesPath.characters.$url() };
    case 'character':
      return {
        name: props.character.name,
        url: pagesPath.characters._slug(props.character.slug).$url(),
        parent: breadcrumbChain({ to: 'characters' }),
      };
    case 'characterBattles':
      return {
        name: '対戦動画',
        url: pagesPath.characters._slug(props.character.slug).battles.$url(),
        parent: breadcrumbChain({ to: 'character', character: props.character }),
      };
    case 'characterCombos':
      return {
        name: 'コンボ',
        url: pagesPath.characters._slug(props.character.slug).combos.$url(),
        parent: breadcrumbChain({ to: 'character', character: props.character }),
      };
    case 'characterMoves':
      return {
        name: 'コマンドリスト',
        url: pagesPath.characters._slug(props.character.slug).moves.$url(),
        parent: breadcrumbChain({ to: 'character', character: props.character }),
      };
    case 'login':
      return { name: 'ログイン' };
    case 'passwordEdit':
      return { name: 'パスワード変更' };
    case 'passwordReset':
      return { name: 'パスワードリセット' };
    case 'players':
      return { name: 'プレイヤー', url: pagesPath.players.$url() };
    case 'player':
      return {
        name: props.player.name,
        url: pagesPath.players._slug(props.player.slug).$url(),
        parent: breadcrumbChain({ to: 'players' }),
      };
    case 'playerBattles':
      return { name: '対戦動画', parent: breadcrumbChain({ to: 'player', player: props.player }) };
    case 'playerStandings':
      return { name: '大会戦績', parent: breadcrumbChain({ to: 'player', player: props.player }) };
    case 'signup':
      return { name: 'ログイン' };
    case 'tournaments':
      return { name: '大会', url: pagesPath.tournaments.$url() };
    case 'tournament':
      return {
        name: props.tournament.name,
        url: pagesPath.tournaments._id(props.tournament.id).$url(),
        parent: breadcrumbChain({ to: 'tournaments' }),
      };
    case 'tournamentBattles':
      return { name: '対戦動画', parent: breadcrumbChain({ to: 'tournament', tournament: props.tournament }) };
    case 'tournamentVideo':
      return {
        name: props.tournamentVideo.label ? `${props.tournamentVideo.label}の対戦動画` : '対戦動画',
        parent: breadcrumbChain({ to: 'tournament', tournament: props.tournamentVideo.tournament }),
      };
  }
};
