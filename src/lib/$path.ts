/* eslint-disable */
// prettier-ignore
import { Query as Query0 } from '../pages/dashboard/move_categories/[id]/moves/new/index.page'

// prettier-ignore
export const pagesPath = {
  articles: {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/articles/[id]' as const, query: { id }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/articles' as const, hash: url?.hash })
  },
  battles: {
    $url: (url?: { hash?: string }) => ({ pathname: '/battles' as const, hash: url?.hash })
  },
  characters: {
    _slug: (slug: string | number) => ({
      battles: {
        $url: (url?: { hash?: string }) => ({ pathname: '/characters/[slug]/battles' as const, query: { slug }, hash: url?.hash })
      },
      combos: {
        $url: (url?: { hash?: string }) => ({ pathname: '/characters/[slug]/combos' as const, query: { slug }, hash: url?.hash })
      },
      moves: {
        $url: (url?: { hash?: string }) => ({ pathname: '/characters/[slug]/moves' as const, query: { slug }, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/characters/[slug]' as const, query: { slug }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/characters' as const, hash: url?.hash })
  },
  dashboard: {
    articles: {
      _id: (id: string | number) => ({
        edit: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/articles/[id]/edit' as const, query: { id }, hash: url?.hash })
        }
      }),
      new: {
        $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/articles/new' as const, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/articles' as const, hash: url?.hash })
    },
    characters: {
      _slug: (slug: string | number) => ({
        combo_categories: {
          new: {
            $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/characters/[slug]/combo_categories/new' as const, query: { slug }, hash: url?.hash })
          },
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/characters/[slug]/combo_categories' as const, query: { slug }, hash: url?.hash })
        },
        edit: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/characters/[slug]/edit' as const, query: { slug }, hash: url?.hash })
        },
        move_categories: {
          new: {
            $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/characters/[slug]/move_categories/new' as const, query: { slug }, hash: url?.hash })
          },
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/characters/[slug]/move_categories' as const, query: { slug }, hash: url?.hash })
        }
      }),
      new: {
        $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/characters/new' as const, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/characters' as const, hash: url?.hash })
    },
    combo_categories: {
      _id: (id: string | number) => ({
        combos: {
          new: {
            $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/combo_categories/[id]/combos/new' as const, query: { id }, hash: url?.hash })
          }
        },
        edit: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/combo_categories/[id]/edit' as const, query: { id }, hash: url?.hash })
        }
      })
    },
    combos: {
      _id: (id: string | number) => ({
        edit: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/combos/[id]/edit' as const, query: { id }, hash: url?.hash })
        }
      })
    },
    move_categories: {
      _id: (id: string | number) => ({
        edit: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/move_categories/[id]/edit' as const, query: { id }, hash: url?.hash })
        },
        moves: {
          new: {
            $url: (url: { query: Query0, hash?: string }) => ({ pathname: '/dashboard/move_categories/[id]/moves/new' as const, query: { id, ...url.query }, hash: url.hash })
          }
        }
      })
    },
    moves: {
      _id: (id: string | number) => ({
        copy: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/moves/[id]/copy' as const, query: { id }, hash: url?.hash })
        },
        edit: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/moves/[id]/edit' as const, query: { id }, hash: url?.hash })
        }
      })
    },
    organizers: {
      _slug: (slug: string | number) => ({
        edit: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/organizers/[slug]/edit' as const, query: { slug }, hash: url?.hash })
        }
      }),
      new: {
        $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/organizers/new' as const, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/organizers' as const, hash: url?.hash })
    },
    players: {
      _slug: (slug: string | number) => ({
        edit: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/players/[slug]/edit' as const, query: { slug }, hash: url?.hash })
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
      _id: (id: string | number) => ({
        battles: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/tournament_videos/[id]/battles' as const, query: { id }, hash: url?.hash })
        }
      })
    },
    tournaments: {
      _id: (id: string | number) => ({
        edit: {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/tournaments/[id]/edit' as const, query: { id }, hash: url?.hash })
        },
        $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/tournaments/[id]' as const, query: { id }, hash: url?.hash })
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
  nagenuke: {
    $url: (url?: { hash?: string }) => ({ pathname: '/nagenuke' as const, hash: url?.hash })
  },
  players: {
    _slug: (slug: string | number) => ({
      battles: {
        $url: (url?: { hash?: string }) => ({ pathname: '/players/[slug]/battles' as const, query: { slug }, hash: url?.hash })
      },
      standings: {
        $url: (url?: { hash?: string }) => ({ pathname: '/players/[slug]/standings' as const, query: { slug }, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/players/[slug]' as const, query: { slug }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/players' as const, hash: url?.hash })
  },
  signup: {
    $url: (url?: { hash?: string }) => ({ pathname: '/signup' as const, hash: url?.hash })
  },
  tournament_videos: {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/tournament_videos/[id]' as const, query: { id }, hash: url?.hash })
    })
  },
  tournaments: {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/tournaments/[id]' as const, query: { id }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/tournaments' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
