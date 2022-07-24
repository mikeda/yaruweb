export const pagesPath = {
  "admin": {
    "characters": {
      _slug: (slug: string | number) => ({
        "combos": {
          $url: (url?: { hash?: string }) => ({ pathname: '/admin/characters/[slug]/combos' as const, query: { slug }, hash: url?.hash })
        },
        "edit": {
          $url: (url?: { hash?: string }) => ({ pathname: '/admin/characters/[slug]/edit' as const, query: { slug }, hash: url?.hash })
        },
        "moves": {
          $url: (url?: { hash?: string }) => ({ pathname: '/admin/characters/[slug]/moves' as const, query: { slug }, hash: url?.hash })
        }
      }),
      "new": {
        $url: (url?: { hash?: string }) => ({ pathname: '/admin/characters/new' as const, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/admin/characters' as const, hash: url?.hash })
    },
    "organizers": {
      _slug: (slug: string | number) => ({
        "edit": {
          $url: (url?: { hash?: string }) => ({ pathname: '/admin/organizers/[slug]/edit' as const, query: { slug }, hash: url?.hash })
        }
      }),
      "new": {
        $url: (url?: { hash?: string }) => ({ pathname: '/admin/organizers/new' as const, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/admin/organizers' as const, hash: url?.hash })
    },
    "players": {
      _slug: (slug: string | number) => ({
        "edit": {
          $url: (url?: { hash?: string }) => ({ pathname: '/admin/players/[slug]/edit' as const, query: { slug }, hash: url?.hash })
        }
      }),
      "new": {
        $url: (url?: { hash?: string }) => ({ pathname: '/admin/players/new' as const, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/admin/players' as const, hash: url?.hash })
    },
    "tournament_videos": {
      _id: (id: string | number) => ({
        "battles": {
          $url: (url?: { hash?: string }) => ({ pathname: '/admin/tournament_videos/[id]/battles' as const, query: { id }, hash: url?.hash })
        },
        "edit": {
          $url: (url?: { hash?: string }) => ({ pathname: '/admin/tournament_videos/[id]/edit' as const, query: { id }, hash: url?.hash })
        }
      })
    },
    "tournaments": {
      _id: (id: string | number) => ({
        "edit": {
          $url: (url?: { hash?: string }) => ({ pathname: '/admin/tournaments/[id]/edit' as const, query: { id }, hash: url?.hash })
        },
        $url: (url?: { hash?: string }) => ({ pathname: '/admin/tournaments/[id]' as const, query: { id }, hash: url?.hash })
      }),
      "new": {
        $url: (url?: { hash?: string }) => ({ pathname: '/admin/tournaments/new' as const, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/admin/tournaments' as const, hash: url?.hash })
    }
  },
  "articles": {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/articles/[id]' as const, query: { id }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/articles' as const, hash: url?.hash })
  },
  "characters": {
    _slug: (slug: string | number) => ({
      "battles": {
        $url: (url?: { hash?: string }) => ({ pathname: '/characters/[slug]/battles' as const, query: { slug }, hash: url?.hash })
      },
      "combos": {
        $url: (url?: { hash?: string }) => ({ pathname: '/characters/[slug]/combos' as const, query: { slug }, hash: url?.hash })
      },
      "moves": {
        $url: (url?: { hash?: string }) => ({ pathname: '/characters/[slug]/moves' as const, query: { slug }, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/characters/[slug]' as const, query: { slug }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/characters' as const, hash: url?.hash })
  },
  "dashboard": {
    "articles": {
      _id: (id: string | number) => ({
        "edit": {
          $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/articles/[id]/edit' as const, query: { id }, hash: url?.hash })
        }
      }),
      "new": {
        $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/articles/new' as const, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/articles' as const, hash: url?.hash })
    },
    "profile": {
      "edit": {
        $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/profile/edit' as const, hash: url?.hash })
      }
    }
  },
  "login": {
    $url: (url?: { hash?: string }) => ({ pathname: '/login' as const, hash: url?.hash })
  },
  "nagenuke": {
    $url: (url?: { hash?: string }) => ({ pathname: '/nagenuke' as const, hash: url?.hash })
  },
  "players": {
    _slug: (slug: string | number) => ({
      "battles": {
        $url: (url?: { hash?: string }) => ({ pathname: '/players/[slug]/battles' as const, query: { slug }, hash: url?.hash })
      },
      "standings": {
        $url: (url?: { hash?: string }) => ({ pathname: '/players/[slug]/standings' as const, query: { slug }, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/players/[slug]' as const, query: { slug }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/players' as const, hash: url?.hash })
  },
  "signup": {
    $url: (url?: { hash?: string }) => ({ pathname: '/signup' as const, hash: url?.hash })
  },
  "tournaments": {
    _id: (id: string | number) => ({
      "battles": {
        $url: (url?: { hash?: string }) => ({ pathname: '/tournaments/[id]/battles' as const, query: { id }, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/tournaments/[id]' as const, query: { id }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/tournaments' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
