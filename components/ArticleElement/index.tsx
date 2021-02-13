import React from 'react';

import { Image } from './Image';
import { EmbedLink } from './EmbedLink';
import { BulletedList } from './BulletedList';
import { Move } from './Move';
import { EmbedYouTube } from './EmbedYouTube';
import { EmbedTweet } from './EmbedTweet';
import { ArticleElement } from './ArticleElement';

interface Props {
  attributes: { [key: string]: unknown };
  element: ArticleElement;
}

export const Element: React.FC<Props> = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'heading-one':
      return <h2 {...attributes}>{children}</h2>;
    case 'heading-two':
      return <h3 {...attributes}>{children}</h3>;
    case 'bulleted-list':
      return <BulletedList attributes={attributes}>{children}</BulletedList>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'image':
      return <Image url={element.url} attributes={attributes} />;
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
      return <p {...attributes}>{children}</p>;
  }
};

export * from './Image';
