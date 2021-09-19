type Options =
  | { to: 'top' }
  | { to: 'articles' }
  | { to: 'article'; articleId: string }
  | { to: 'battles' }
  | { to: 'characters' }
  | { to: 'character'; characterSlug: string }
  | { to: 'characterBattles'; characterSlug: string }
  | { to: 'characterCombos'; characterSlug: string }
  | { to: 'characterMoves'; characterSlug: string }
  | { to: 'login' }
  | { to: 'move'; moveId: string }
  | { to: 'passwordEdit' }
  | { to: 'passwordReset' }
  | { to: 'players' }
  | { to: 'player'; playerSlug: string }
  | { to: 'playerBattles'; player: string }
  | { to: 'playerStandings'; playerSlug: string }
  | { to: 'signup' }
  | { to: 'tournaments' }
  | { to: 'tournament'; tournamentId: string; battleId?: string };

export const path = (options: Options): string => {
  switch (options.to) {
    case 'top':
      return '/';
    case 'articles':
      return '/articles';
    case 'article':
      return `/articles/${options.articleId}`;
    case 'battles':
      return '/battles';
    case 'characters':
      return '/characters';
    case 'character':
      return `/characters/${options.characterSlug}`;
    case 'characterBattles':
      return `/characters/${options.characterSlug}/battles`;
    case 'characterCombos':
      return `/characters/${options.characterSlug}/combos`;
    case 'characterMoves':
      return `/characters/${options.characterSlug}/moves`;
    case 'login':
      return '/login';
    case 'move':
      return `/moves/${options.moveId}`;
    case 'passwordEdit':
      return '/password/edit';
    case 'passwordReset':
      return '/password/reset';
    case 'players':
      return '/players';
    case 'player':
      return `/players/${options.playerSlug}`;
    case 'playerBattles':
      return `/players/${options.player}/battles`;
    case 'playerStandings':
      return `/players/${options.playerSlug}/standings`;
    case 'tournaments':
      return '/tournaments';
    case 'tournament':
      return options.battleId
        ? `/tournaments/${options.tournamentId}#battle${options.battleId}`
        : `/tournaments/${options.tournamentId}`;
    case 'signup':
      return '/signup';
  }
};
