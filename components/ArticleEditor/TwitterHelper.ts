import { ReactEditor } from 'slate-react';
import isUrl from 'is-url';

export const withEmbedTwitter = (editor: ReactEditor) => {
  const { insertData, isVoid } = editor;

  editor.insertData = data => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      const url = new URL(text);

      const twitterNode = getTwitterNode(url);
      if (twitterNode) {
        editor.insertNode({
          type: 'embed-tweet',
          ...twitterNode,
          children: [{ text: '' }],
        });
        return;
      }
    }

    insertData(data);
  };

  editor.isVoid = element => {
    return element.type === 'embed-tweet' ? true : isVoid(element);
  };

  return editor;
};

const getTwitterNode = (url: URL) => {
  if (url.hostname !== 'twitter.com') return null;
  const paths = url.pathname.split('/');
  if (paths.length !== 4 || paths[2] !== 'status') return null;

  return { user: paths[1], tweetId: paths[3] };
};
