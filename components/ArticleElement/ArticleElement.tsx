import { Element } from 'slate';

export type ArticleElement =
  | Paragraph
  | BlockQuote
  | HeadingOne
  | HeadingTwo
  | BulletedList
  | ListItem
  | Image
  | Video
  | Link
  | EmbedLink
  | EmbedYoutube
  | EmbedTweet
  | EmbedMove;

export const ArticleElementTypes = {
  Paragraph: 'paragraph',
  BlockQuote: 'block-quote',
  HeadingOne: 'heading-one',
  HeadingTwo: 'heading-two',
  BulletedList: 'bulleted-list',
  ListItem: 'list-item',
  Image: 'image',
  Video: 'video',
  Link: 'link',
  EmbedLink: 'embed-link',
  EmbedYoutube: 'embed-youtube',
  EmbedTweet: 'embed-tweet',
  EmbedMove: 'embed-move',
} as const;

type ArticleElementType =
  | 'paragraph'
  | 'block-quote'
  | 'heading-one'
  | 'heading-two'
  | 'bulleted-list'
  | 'list-item'
  | 'image'
  | 'video'
  | 'link'
  | 'embed-link'
  | 'embed-youtube'
  | 'embed-tweet'
  | 'embed-move';

interface Base extends Element {
  type: ArticleElementType;
}

interface Paragraph extends Base {
  type: 'paragraph';
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

interface Video extends Base {
  type: 'video';
  m3u8Url: string;
  thumbnailUrl: string;
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
  startSec?: number;
}

interface EmbedTweet extends Base {
  type: 'embed-tweet';
  tweetId: string;
}

interface EmbedMove extends Base {
  type: 'embed-move';
  moveId: string;
}
