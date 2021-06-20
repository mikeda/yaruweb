import { path } from '@/lib';

type Item = {
  name: string;
  url?: string;
};

type DefinitionItem = Item & { parent?: DefinitionItem };

type Article = { id: string; title: string };
type MoveCategory = { id: string; name: string };
type Move = { id: string; name: string; moveCategory: MoveCategory };

type Props =
  | { to: 'articles' }
  | { to: 'article'; article: Article }
  | { to: 'moveCategory'; moveCategory: MoveCategory }
  | { to: 'move'; move: Move };

//const Definition = (props: Props): DefinitionItem => {
//  switch (props.to) {
//    case 'articles':
//      return { name: '記事', url: path({ to: 'articles' }) };
//    case 'article': {
//      const { article } = props;
//      return {
//        name: article.title,
//        url: path({ to: 'article', articleId: article.id }),
//        parent: Definition({ type: 'articles' }),
//      };
//    }
//    case 'moveCategory': {
//      const { moveCategory } = props;
//      return { name: moveCategory.name, url: path({ to: 'moveCategory', moveCategoryId: moveCategory.id }) };
//    }
//    case 'move': {
//      const { move } = props;
//      return { name: move.name, url: path({ to: 'move', moveId: move.id }) };
//    }
//  }
//};
//
