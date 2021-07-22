import {
  Article,
  Character,
  Combo,
  ComboCategory,
  Move,
  MoveCategory,
  Player,
  Tournament,
  TournamentVideo,
} from '@/lib/graphql/types';

export type ArticleParam = Pick<Article, 'id' | 'title'>;
export type TournamentParam = Pick<Tournament, 'id' | 'name'>;
export type TournamentVideoParam = Pick<TournamentVideo, 'id' | 'title'> & { tournament: TournamentParam };
export type CharactersParam = Pick<Character, 'slug' | 'name'>;
export type ComboCategoryParam = Pick<ComboCategory, 'id' | 'name'> & { character: CharactersParam };
export type ComboParam = Pick<Combo, 'id' | 'name'> & { comboCategory: ComboCategoryParam };
export type MoveCategoryParam = Pick<MoveCategory, 'id' | 'name'> & { character: CharactersParam };
export type MoveParam = Pick<Move, 'id' | 'name'> & { moveCategory: MoveCategoryParam };
export type PlayerParam = Pick<Player, 'slug' | 'name'>;
