import { ReactEditor } from 'slate-react';
import isUrl from 'is-url';

import { useCreateArticleLinkMutation } from '@/lib/graphql/types';

export const withLink = (editor: ReactEditor) => {
  const [createArticleLink] = useCreateArticleLinkMutation({
    onCompleted: data => {
      const articleLink = data.createArticleLink?.articleLink;
      if (!articleLink) return;

      const { url, title, description, imageUrl } = articleLink;
      editor.insertNode({
        type: 'embed-link',
        link: { url, title, description, imageUrl },
        children: [{ text: '' }],
      });
    },
    onError: e => {
      alert(e.message);
    },
  });

  const { insertData, isVoid } = editor;

  editor.insertData = data => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      createArticleLink({ variables: { url: text } });
    } else {
      insertData(data);
    }
  };

  editor.isVoid = element => (element.type === 'embed-link' ? true : isVoid(element));

  return editor;
};
