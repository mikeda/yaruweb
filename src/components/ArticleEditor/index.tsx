import React, { useCallback } from 'react';
import { Editable, useSlate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

import { Element } from '@/components/ArticleElement';
import { Leaf } from '../ArticleElement/Leaf';
import { ArticleElementTypes } from '../ArticleElement/ArticleElement';
import { withIcon } from './IconHelper';
import { createEditor, Transforms, Node } from 'slate';
import { withLink } from './LinkHelper';
import { getYoutubeNode, isYoutubeUrl } from './YoutubeHelper';
import { getTweetNode, isTweetUrl } from './TweetHelper';
import { useCreateArticleLinkMutation } from '@/lib/graphql/types';
import isUrl from 'is-url';
import { Controls } from './Controls';

export const createArticleEditor = () => {
  return withIcon(withLink(withHistory(withReact(createEditor()))));
};

export const ArticleEditor: React.FC = () => {
  const editor = useSlate();
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        event.preventDefault();
        editor.insertText('\n');
      } else {
        if (!editor.selection) return;

        const selectedElement = Node.descendant(editor, editor.selection.anchor.path.slice(0, -1));

        if (selectedElement.type === 'heading-one' || selectedElement.type === 'heading-two') {
          event.preventDefault();
          const selectedLeaf = Node.descendant(editor, editor.selection.anchor.path);

          const text = selectedLeaf.text as string;

          if (text.length === editor.selection.anchor.offset) {
            Transforms.insertNodes(editor, {
              type: 'paragraph',
              children: [{ text: '', marks: [] }],
            });
          } else {
            Transforms.splitNodes(editor);
            Transforms.setNodes(editor, { type: 'paragraph' });
          }
        }
      }
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
      element.type === ArticleElementTypes.EmbedLink ||
      element.type === ArticleElementTypes.EmbedYoutube ||
      element.type === ArticleElementTypes.EmbedTweet
      ? true
      : isVoid(element);
  };

  editor.insertData = data => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      const url = new URL(text);

      if (isYoutubeUrl(url)) {
        const youtubeNode = getYoutubeNode(url);
        if (youtubeNode) {
          editor.insertNode(youtubeNode);
          editor.insertNode({ type: ArticleElementTypes.Paragraph, children: [{ text: '' }] });
        }
        return;
      } else if (isTweetUrl(url)) {
        const tweetNode = getTweetNode(url);
        if (tweetNode) {
          editor.insertNode(tweetNode);
          editor.insertNode({ type: ArticleElementTypes.Paragraph, children: [{ text: '' }] });
        }
        return;
      }

      createArticleLink({ variables: { url: text } });
    } else {
      insertData(data);
    }
  };

  return (
    <div style={{ border: '1px solid #d1d8dc', padding: 8 }}>
      <Controls />

      <Editable
        placeholder="本文"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
        style={{ maxHeight: 400, overflowY: 'auto' }}
      />
    </div>
  );
};
