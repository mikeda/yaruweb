import { ReactEditor } from 'slate-react';
import isUrl from 'is-url';

export const withEmbedYoutube = (editor: ReactEditor) => {
  const { insertData, isVoid } = editor;

  editor.insertData = data => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      const url = new URL(text);

      const youtubeNode = getYoutubeNode(url);
      if (youtubeNode) {
        editor.insertNode({
          type: 'embed-youtube',
          ...youtubeNode,
          children: [{ text: '' }],
        });
        return;
      }
    }

    insertData(data);
  };

  editor.isVoid = element => {
    return element.type === 'embed-youtube' ? true : isVoid(element);
  };

  return editor;
};

const getYoutubeNode = (url: URL) => {
  switch (url.hostname) {
    case 'www.youtube.com': {
      const videoId = url.searchParams.get('v');
      if (!videoId) return null;

      const startSec = Number(url.searchParams.get('t'));
      return { videoId, startSec: startSec || undefined };
    }
    case 'youtu.be':
      const videoId = url.pathname.substring(1);
      const startSec = Number(url.searchParams.get('t'));
      return { videoId, startSec: startSec || undefined };
  }
  return null;
};
