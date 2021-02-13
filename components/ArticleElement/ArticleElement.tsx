import { Element } from 'slate';

export type ArticleElement =
  | BlockQuote
  | HeadingOne
  | HeadingTwo
  | BulletedList
  | ListItem
  | Image
  | Link
  | EmbedLink
  | EmbedYoutube
  | EmbedTweet
  | EmbedMove;

type ArticleElementType =
  | 'block-quote'
  | 'heading-one'
  | 'heading-two'
  | 'bulleted-list'
  | 'list-item'
  | 'image'
  | 'link'
  | 'embed-link'
  | 'embed-youtube'
  | 'embed-tweet'
  | 'embed-move';

interface Base extends Element {
  type: ArticleElementType;
}

interface BlockQuote extends Base {
  type: 'block-quote';
}

interface HeadingOne extends Base {
  type: 'heading-one';
}

interface HeadingTwo extends Base {
  type: 'heading-two';
}

interface BulletedList extends Base {
  type: 'bulleted-list';
}

interface ListItem extends Base {
  type: 'list-item';
}

interface Image extends Base {
  type: 'image';
  url: string;
}

interface Link extends Base {
  type: 'link';
  url: string;
}

interface EmbedLink extends Base {
  type: 'embed-link';
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

interface EmbedYoutube extends Base {
  type: 'embed-youtube';
  videoId: string;
}

interface EmbedTweet extends Base {
  type: 'embed-tweet';
  tweetId: string;
}

interface EmbedMove extends Base {
  type: 'embed-move';
  moveId: string;
}
