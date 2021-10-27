import {
  Article,
  Character,
  ComboCategory,
  Move,
  MoveCategory,
  Organizer,
  Player,
  Tournament,
  TournamentVideo,
} from '@/lib/graphql/types';

export type ArticleParam = Pick<Article, 'id' | 'title'>;
export type TournamentParam = Pick<Tournament, 'id' | 'name'>;
export type TournamentVideoParam = Pick<TournamentVideo, 'id' | 'title'> & { tournament: TournamentParam };
export type CharactersParam = Pick<Character, 'slug' | 'name'>;
export type ComboCategoryParam = Pick<ComboCategory, 'id' | 'name'> & { character: CharactersParam };
export type MoveCategoryParam = Pick<MoveCategory, 'id' | 'name'> & { character: CharactersParam };
export type MoveParam = Pick<Move, 'id' | 'name'> & { moveCategory: MoveCategoryParam };
export type OrganizerParam = Pick<Organizer, 'slug' | 'name'>;
export type PlayerParam = Pick<Player, 'slug' | 'name'>;
