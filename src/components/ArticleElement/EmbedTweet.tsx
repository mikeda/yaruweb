import React from 'react';
import { Tweet } from 'react-twitter-widgets';

interface Props {
  tweetId: string;
  attributes: { [key: string]: unknown };
}

export const EmbedTweet: React.FC<Props> = ({ tweetId, attributes }) => {
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <Tweet tweetId={tweetId} />
      </div>
    </div>
  );
};
