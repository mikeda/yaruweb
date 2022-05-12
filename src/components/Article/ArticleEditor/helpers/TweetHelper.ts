import { EmbedTweetElement } from '@/custom-types';

export const getTweetNode = (url: URL): EmbedTweetElement | undefined => {
  if (url.hostname !== 'twitter.com') return;

  const paths = url.pathname.split('/');
  if (paths.length !== 4 || paths[2] !== 'status') return;

  return {
    type: 'embed-tweet',
    user: paths[1] as string,
    tweetId: paths[3] as string,
    children: [{ text: '' }],
  };
};
