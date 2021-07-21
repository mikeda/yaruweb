import { Node } from 'slate';

export const getTweetNode = (url: URL): Node => {
  const paths = url.pathname.split('/');

  return {
    type: 'embed-tweet',
    user: paths[1],
    tweetId: paths[3],
    children: [{ text: '' }],
  };
};

export const isTweetUrl = (url: URL) => {
  if (url.hostname !== 'twitter.com') return false;

  const paths = url.pathname.split('/');
  return paths.length === 4 && paths[2] === 'status';
};
