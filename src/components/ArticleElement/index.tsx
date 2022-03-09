import React from 'react';
import { Element as SlateElement } from 'slate';

import { Image } from './Image';
import { Video } from './Video';
import { EmbedLink } from './EmbedLink';
import { BulletedList } from './BulletedList';
import { Move } from './Move';
import { EmbedYouTube } from './EmbedYouTube';
import { EmbedTweet } from './EmbedTweet';
import { Paragraph } from './Paragraph';
import { HeadingOne } from './HeadingOne';
import { HeadingTwo } from './HeadingTwo';
import { Combo } from './Combo';

interface Props {
  attributes: { [key: string]: unknown };
  element: SlateElement;
}

export const Element: React.FC<Props> = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'paragraph':
      return <Paragraph attributes={attributes}>{children}</Paragraph>;
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'heading-one':
      return (
        <HeadingOne attributes={attributes} id={element.id}>
          {children}
        </HeadingOne>
      );
    case 'heading-two':
      return (
        <HeadingTwo attributes={attributes} id={element.id}>
          {children}
        </HeadingTwo>
      );
    case 'bulleted-list':
      return <BulletedList attributes={attributes}>{children}</BulletedList>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'image':
      return (
        <Image url={element.url} attributes={attributes}>
          {children}
        </Image>
      );
    case 'video':
      return (
        <Video m3u8Url={element.m3u8Url} thumbnailUrl={element.thumbnailUrl} attributes={attributes}>
          {children}
        </Video>
      );
    case 'link':
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      );
    case 'embed-link':
      return (
        <EmbedLink
          url={element.url}
          title={element.title}
          description={element.description}
          imageUrl={element.imageUrl}
          attributes={attributes}
        >
          {children}
        </EmbedLink>
      );
    case 'embed-youtube':
      return (
        <EmbedYouTube videoId={element.videoId} startSec={element.startSec} attributes={attributes}>
          {children}
        </EmbedYouTube>
      );
    case 'embed-tweet':
      return (
        <EmbedTweet tweetId={element.tweetId} attributes={attributes}>
          {children}
        </EmbedTweet>
      );
    case 'embed-move':
      return (
        <Move moveId={element.moveId} attributes={attributes}>
          {children}
        </Move>
      );
    case 'embed-combo':
      return (
        <Combo comboId={element.comboId} attributes={attributes}>
          {children}
        </Combo>
      );
    default:
      return <p {...attributes}>存在しないTypeが指定されました。{children}</p>;
  }
};

export * from './Image';
