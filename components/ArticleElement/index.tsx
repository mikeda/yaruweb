import React from 'react';

import { ArticleLinkFragment } from '@/lib/graphql/types';
import { Image } from './Image';
import { EmbedLink } from './EmbedLink';
import { BulletedList } from './BulletedList';
import { Move } from './Move';
import { EmbedYouTube } from './EmbedYouTube';
import { EmbedTweet } from './EmbedTweet';

interface Props {
  attributes: { [key: string]: unknown };
  element:
    | {
        type: 'block-quote';
      }
    | {
        type: 'heading-one';
      }
    | {
        type: 'heading-two';
      }
    | {
        type: 'bulleted-list';
      }
    | {
        type: 'list-item';
      }
    | {
        type: 'image';
        url: string;
      }
    | {
        type: 'link';
        url: string;
      }
    | {
        type: 'embed-link';
        link: ArticleLinkFragment;
      }
    | {
        type: 'embed-youtube';
        videoId: string;
      }
    | {
        type: 'embed-tweet';
        tweetId: string;
      }
    | {
        type: 'move';
        moveId: string;
      };
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
        <EmbedLink link={element.link} attributes={attributes}>
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
    case 'move':
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
