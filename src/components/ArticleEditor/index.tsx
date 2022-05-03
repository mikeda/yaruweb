import React, { useCallback } from 'react';
import { Editable, RenderElementProps, RenderLeafProps, useSlate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

import { Element } from '@/components/ArticleElement';
import { Leaf } from '../ArticleElement/Leaf';
import { withIcon } from './IconHelper';
import { createEditor, Transforms, Node } from 'slate';
import { withLink } from './LinkHelper';
import { getYoutubeNode, isYoutubeUrl } from './YoutubeHelper';
import { getTweetNode, isTweetUrl } from './TweetHelper';
import { useCreateArticleLinkMutation } from '@/lib/$types';
import isUrl from 'is-url';
import { Controls } from './Controls';
import { EmbedLinkElement } from '@/custom-types';

export const createArticleEditor = () => {
  return withIcon(withLink(withHistory(withReact(createEditor()))));
};

export const ArticleEditor: React.FC = () => {
  const editor = useSlate();
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
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

          if (!selectedLeaf.type) {
            const text = selectedLeaf.text;

            if (text.length === editor.selection.anchor.offset) {
              Transforms.insertNodes(editor, {
                type: 'paragraph',
                children: [{ text: '' }],
              });
            } else {
              Transforms.splitNodes(editor);
              Transforms.setNodes(editor, { type: 'paragraph' });
            }
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
      const embedLint: EmbedLinkElement = {
        type: 'embed-link',
        url,
        title,
        description: description as string | undefined,
        imageUrl: imageUrl as string | undefined,
        children: [{ text: '' }],
      };
      editor.insertNode(embedLint);
      editor.insertNode({ type: 'paragraph', children: [{ text: '' }] });
    },
    onError: e => {
      alert(e.message);
    },
  });

  const { insertData, isVoid } = editor;

  editor.isVoid = element => {
    return element.type === 'image' ||
      element.type === 'embed-move' ||
      element.type === 'embed-combo' ||
      element.type === 'embed-link' ||
      element.type === 'embed-youtube' ||
      element.type === 'embed-tweet'
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
          editor.insertNode({ type: 'paragraph', children: [{ text: '' }] });
        }
        return;
      } else if (isTweetUrl(url)) {
        const tweetNode = getTweetNode(url);
        if (tweetNode) {
          editor.insertNode(tweetNode);
          editor.insertNode({ type: 'paragraph', children: [{ text: '' }] });
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
