import { EmbedYoutubeElement } from '@/custom-types';

export const getYoutubeNode = (url: URL): EmbedYoutubeElement | null => {
  switch (url.hostname) {
    case 'www.youtube.com': {
      const videoId = url.searchParams.get('v');
      if (!videoId) return null;

      const startSec = Number(url.searchParams.get('t'));

      return {
        type: 'embed-youtube',
        videoId,
        startSec: startSec || undefined,
        children: [{ text: '' }],
      };
    }

    case 'youtu.be': {
      const videoId = url.pathname.substring(1);
      const startSec = Number(url.searchParams.get('t'));
      return {
        type: 'embed-youtube',
        videoId,
        startSec: startSec || undefined,
        children: [{ text: '' }],
      };
    }

    default:
      return null;
  }
};

export const isYoutubeUrl = (url: URL) => {
  return url.hostname === 'www.youtube.com' || url.hostname === 'youtu.be';
};
