import { Node } from 'slate';

const defaultNodeParams = {
  type: 'embed-youtube',
  children: [{ text: '' }],
};

export const getYoutubeNode = (url: URL): Node | null => {
  switch (url.hostname) {
    case 'www.youtube.com': {
      const videoId = url.searchParams.get('v');
      if (!videoId) return null;

      const startSec = Number(url.searchParams.get('t'));
      return {
        ...defaultNodeParams,
        videoId,
        startSec: startSec || undefined,
      };
    }

    case 'youtu.be': {
      const videoId = url.pathname.substring(1);
      const startSec = Number(url.searchParams.get('t'));
      return {
        ...defaultNodeParams,
        videoId,
        startSec: startSec || undefined,
      };
    }

    default:
      return null;
  }
};

export const isYoutubeUrl = (url: URL) => {
  return url.hostname === 'www.youtube.com' || url.hostname === 'youtu.be';
};
