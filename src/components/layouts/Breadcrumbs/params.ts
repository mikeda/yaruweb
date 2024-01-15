import {
  Character,
  ComboCategory,
  Move,
  MoveCategory,
  Player,
  Tournament,
  TournamentVideo,
} from '@/generated/graphql';

export type TournamentParam = Pick<Tournament, 'id' | 'name'>;
export type TournamentVideoParam = Pick<TournamentVideo, 'id' | 'label'> & { tournament: TournamentParam };
export type CharactersParam = Pick<Character, 'slug' | 'name'>;
export type ComboCategoryParam = Pick<ComboCategory, 'id' | 'name'> & { character: CharactersParam };
export type MoveCategoryParam = Pick<MoveCategory, 'id' | 'name'> & { character: CharactersParam };
export type MoveParam = Pick<Move, 'id' | 'name'> & { moveCategory: MoveCategoryParam };
export type PlayerParam = Pick<Player, 'slug' | 'name'>;
