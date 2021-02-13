import React from 'react';

import { Image } from './Image';
import { EmbedLink } from './EmbedLink';
import { BulletedList } from './BulletedList';
import { Move } from './Move';
import { EmbedYouTube } from './EmbedYouTube';
import { EmbedTweet } from './EmbedTweet';
import { ArticleElement } from './ArticleElement';
import { Paragraph } from './Paragraph';
import { HeadingOne } from './HeadingOne';
import { HeadingTwo } from './HeadingTwo';

interface Props {
  attributes: { [key: string]: unknown };
  element: ArticleElement;
}

export const Element: React.FC<Props> = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'paragraph':
      return <Paragraph attributes={attributes}>{children}</Paragraph>;
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'heading-one':
      return <HeadingOne attributes={attributes}>{children}</HeadingOne>;
    case 'heading-two':
      return <HeadingTwo attributes={attributes}>{children}</HeadingTwo>;
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
        <EmbedYouTube videoId={element.videoId} attributes={attributes}>
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
    default:
      return <p {...attributes}>存在しないTypeが指定されました。{children}</p>;
  }
};

export * from './Image';
