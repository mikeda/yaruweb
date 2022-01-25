/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  articles: {
    _articleId: (articleId: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/articles/[articleId]' as const, query: { articleId }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/articles' as const, hash: url?.hash })
  },
  battles: {
    $url: (url?: { hash?: string }) => ({ pathname: '/battles' as const, hash: url?.hash })
  },
  characters: {
    _character: (character: string | number) => ({
      battles: {
        $url: (url?: { hash?: string }) => ({ pathname: '/characters/[character]/battles' as const, query: { character }, hash: url?.hash })
      },
      combos: {
        $url: (url?: { hash?: string }) => ({ pathname: '/characters/[character]/combos' as const, query: { character }, hash: url?.hash })
      },
      moves: {
        $url: (url?: { hash?: string }) => ({ pathname: '/characters/[character]/moves' as const, query: { character }, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/characters/[character]' as const, query: { character }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/characters' as const, hash: url?.hash })
  },
  dashboard: {
    articles: {
      _articleId: (articleId: string | number) => ({
        edit: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/articles/[articleId]/edit' as const, query: { articleId }, hash: url?.hash })
        }
      }),
      new: {
        $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/articles/new' as const, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/articles' as const, hash: url?.hash })
    },
    characters: {
      _characterSlug: (characterSlug: string | number) => ({
        combo_categories: {
          new: {
            $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/characters/[characterSlug]/combo_categories/new' as const, query: { characterSlug }, hash: url?.hash })
          },
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/characters/[characterSlug]/combo_categories' as const, query: { characterSlug }, hash: url?.hash })
        },
        edit: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/characters/[characterSlug]/edit' as const, query: { characterSlug }, hash: url?.hash })
        },
        move_categories: {
          new: {
            $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/characters/[characterSlug]/move_categories/new' as const, query: { characterSlug }, hash: url?.hash })
          },
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/characters/[characterSlug]/move_categories' as const, query: { characterSlug }, hash: url?.hash })
        }
      }),
      new: {
        $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/characters/new' as const, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/characters' as const, hash: url?.hash })
    },
    combo_categories: {
      _comboCategoryId: (comboCategoryId: string | number) => ({
        combos: {
          new: {
            $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/combo_categories/[comboCategoryId]/combos/new' as const, query: { comboCategoryId }, hash: url?.hash })
          }
        },
        edit: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/combo_categories/[comboCategoryId]/edit' as const, query: { comboCategoryId }, hash: url?.hash })
        }
      })
    },
    combos: {
      _comboId: (comboId: string | number) => ({
        edit: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/combos/[comboId]/edit' as const, query: { comboId }, hash: url?.hash })
        }
      })
    },
    move_categories: {
      _moveCategoryId: (moveCategoryId: string | number) => ({
        edit: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/move_categories/[moveCategoryId]/edit' as const, query: { moveCategoryId }, hash: url?.hash })
        },
        moves: {
          new: {
            $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/move_categories/[moveCategoryId]/moves/new' as const, query: { moveCategoryId }, hash: url?.hash })
          }
        }
      })
    },
    moves: {
      _moveId: (moveId: string | number) => ({
        copy: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/moves/[moveId]/copy' as const, query: { moveId }, hash: url?.hash })
        },
        edit: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/moves/[moveId]/edit' as const, query: { moveId }, hash: url?.hash })
        }
      })
    },
    organizers: {
      _organizerSlug: (organizerSlug: string | number) => ({
        edit: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/organizers/[organizerSlug]/edit' as const, query: { organizerSlug }, hash: url?.hash })
        }
      }),
      new: {
        $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/organizers/new' as const, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/organizers' as const, hash: url?.hash })
    },
    players: {
      _playerSlug: (playerSlug: string | number) => ({
        edit: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/players/[playerSlug]/edit' as const, query: { playerSlug }, hash: url?.hash })
        }
      }),
      new: {
        $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/players/new' as const, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/players' as const, hash: url?.hash })
    },
    profile: {
      edit: {
        $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/profile/edit' as const, hash: url?.hash })
      }
    },
    tournament_videos: {
      _tournamentVideoId: (tournamentVideoId: string | number) => ({
        battles: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/tournament_videos/[tournamentVideoId]/battles' as const, query: { tournamentVideoId }, hash: url?.hash })
        }
      })
    },
    tournaments: {
      _tournamentId: (tournamentId: string | number) => ({
        edit: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/tournaments/[tournamentId]/edit' as const, query: { tournamentId }, hash: url?.hash })
        },
        $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/tournaments/[tournamentId]' as const, query: { tournamentId }, hash: url?.hash })
      }),
      new: {
        $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/tournaments/new' as const, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/tournaments' as const, hash: url?.hash })
    }
  },
  login: {
    $url: (url?: { hash?: string }) => ({ pathname: '/login' as const, hash: url?.hash })
  },
  players: {
    _player: (player: string | number) => ({
      battles: {
        $url: (url?: { hash?: string }) => ({ pathname: '/players/[player]/battles' as const, query: { player }, hash: url?.hash })
      },
      standings: {
        $url: (url?: { hash?: string }) => ({ pathname: '/players/[player]/standings' as const, query: { player }, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/players/[player]' as const, query: { player }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/players' as const, hash: url?.hash })
  },
  signup: {
    $url: (url?: { hash?: string }) => ({ pathname: '/signup' as const, hash: url?.hash })
  },
  tournament_videos: {
    _tournamentVideoId: (tournamentVideoId: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/tournament_videos/[tournamentVideoId]' as const, query: { tournamentVideoId }, hash: url?.hash })
    })
  },
  tournaments: {
    _tournamentId: (tournamentId: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/tournaments/[tournamentId]' as const, query: { tournamentId }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/tournaments' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
