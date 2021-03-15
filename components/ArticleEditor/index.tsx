import React, { useCallback } from 'react';
import { Editable, useSlate, withReact } from 'slate-react';
import { Element } from '@/components/ArticleElement';
import { Leaf } from '../ArticleElement/Leaf';
import { ArticleElementTypes } from '../ArticleElement/ArticleElement';
import { withIcon } from './IconHelper';
import { createEditor } from 'slate';
import { withLink } from './LinkHelper';
import { withEmbedYoutube } from './YoutubeHelper';
import { withEmbedTwitter } from './TwitterHelper';
import { useCreateArticleLinkMutation } from '@/lib/graphql/types';
import isUrl from 'is-url';
import { Controls } from './Controls';

export const createArticleEditor = () => {
  return withEmbedTwitter(withEmbedYoutube(withIcon(withLink(withReact(createEditor())))));
};

export const ArticleEditor: React.FC = () => {
  const editor = useSlate();
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.shiftKey && event.key === 'Enter') {
      event.preventDefault();
      editor.insertText('\n');
    }
  }, []);
  const [createArticleLink] = useCreateArticleLinkMutation({
    onCompleted: data => {
      const articleLink = data.createArticleLink?.articleLink;
      if (!articleLink) return;

      const { url, title, description, imageUrl } = articleLink;
      editor.insertNode({
        type: ArticleElementTypes.EmbedLink,
        url,
        title,
        description,
        imageUrl,
        children: [{ text: '' }],
      });
      editor.insertNode({ type: ArticleElementTypes.Paragraph, children: [{ text: '' }] });
    },
    onError: e => {
      alert(e.message);
    },
  });

  const { insertData, isVoid } = editor;

  editor.isVoid = element => {
    return element.type === ArticleElementTypes.Image ||
      element.type === ArticleElementTypes.EmbedMove ||
      element.type === ArticleElementTypes.EmbedLink
      ? true
      : isVoid(element);
  };

  editor.insertData = data => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      createArticleLink({ variables: { url: text } });
    } else {
      insertData(data);
    }
  };

  return (
    <>
      <Controls />

      <Editable placeholder="本文" renderElement={renderElement} renderLeaf={renderLeaf} onKeyDown={onKeyDown} />
    </>
  );
};
