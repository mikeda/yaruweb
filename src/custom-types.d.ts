import { Descendant, BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type BlockQuoteElement = { type: 'block-quote'; children: Descendant[] };
export type BulletedListElement = { type: 'bulleted-list'; children: Descendant[] };
export type HeadingOneElement = { type: 'heading-one'; id?: string; children: CustomText[] };
export type HeadingTwoElement = { type: 'heading-two'; id?: string; children: CustomText[] };
export type ImageElement = { type: 'image'; url: string; children: CustomText[] };
export type LinkElement = { type: 'link'; url: string; children: CustomText[] };
export type ListItemElement = { type: 'list-item'; children: Descendant[] };

export type ParagraphElement = { type: 'paragraph'; children: Descendant[] };

export type VideoElement = { type: 'video'; m3u8Url: string; thumbnailUrl: string; children: CustomText[] };

export type EmbedLinkElement = {
  type: 'embed-link';
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
  children: CustomText[];
};

export type EmbedYoutubeElement = {
  type: 'embed-youtube';
  videoId: string;
  startSec?: number;
  children: CustomText[];
};

export type EmbedTweetElement = {
  type: 'embed-tweet';
  user: string;
  tweetId: string;
  children: CustomText[];
};

export type EmbedMoveElement = {
  type: 'embed-move';
  moveId: string;
  children: CustomText[];
};

export type EmbedComboElement = {
  type: 'embed-combo';
  comboId: string;
  children: CustomText[];
};

type CustomElement =
  | ParagraphElement
  | BlockQuoteElement
  | HeadingOneElement
  | HeadingTwoElement
  | BulletedListElement
  | ListItemElement
  | ImageElement
  | VideoElement
  | LinkElement
  | EmbedLinkElement
  | EmbedYoutubeElement
  | EmbedTweetElement
  | EmbedMoveElement
  | EmbedComboElement;

export type CustomText = {
  type?: undefined;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  icon?: boolean;
  text: string;
};

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
