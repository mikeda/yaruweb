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
  | { type: 'articles' }
  | { type: 'article'; article: Article }
  | { type: 'moveCategory'; moveCategory: MoveCategory }
  | { type: 'move'; move: Move };

const Definition = (props: Props): DefinitionItem => {
  switch (props.type) {
    case 'articles':
      return { name: '記事', url: path({ to: 'articles' }) };
    case 'article': {
      const { article } = props;
      return {
        name: article.title,
        url: path({ to: 'article', articleId: article.id }),
        parent: Definition({ type: 'articles' }),
      };
    }
    case 'moveCategory': {
      const { moveCategory } = props;
      return { name: moveCategory.name, url: path({ to: 'moveCategory', moveCategoryId: moveCategory.id }) };
    }
    case 'move': {
      const { move } = props;
      return { name: move.name, url: path({ to: 'move', moveId: move.id }) };
    }
  }
};

export const breadcrumbs = (props: Props): Item[] => {
  let current: DefinitionItem | undefined = Definition(props);
  const result: DefinitionItem[] = [{ name: current.name }];

  while (current) {
    current = current.parent;
    if (current) result.unshift({ name: current.name, url: current.url });
  }

  result.unshift({ name: 'TOP', url: '/' });

  return result;
};
