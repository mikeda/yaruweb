import React, { useCallback } from 'react';
import { Editable, useSlate } from 'slate-react';
import { BlockButton } from './Control/BlockButton';
import { MarkButton } from './Control/MarkButton';
import { Element } from './Element';
import { Leaf } from './Leaf';
import { YAROUYO_FONT_CODE } from '@/lib/YarouyoFont';
import { OperationButton } from './Control/OperationButton';
import { Editor, Node, Element as SlateElement, Transforms } from 'slate';
import { ImageButton } from './Control/ImageButton';
import isUrl from 'is-url';
import { LinkButton } from './Control/LinkButton';
import { useCreateArticleLinkMutation } from '@/lib/graphql/types';
import { MoveButton } from './Control/MoveButton';

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

const getTwitterNode = (url: URL) => {
  if (url.hostname !== 'twitter.com') return null;
  const paths = url.pathname.split('/');
  if (paths.length !== 4 || paths[2] !== 'status') return null;

  return { user: paths[1], tweetId: paths[3] };
};

export const ArticleEditor: React.FC = () => {
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
        type: 'embed-link',
        link: { url, title, description, imageUrl },
        children: [{ text: '' }],
      });
    },
    onError: e => {
      alert(e.message);
    },
  });

  const editor = useSlate();
  const { insertText, normalizeNode, insertData, isVoid } = editor;

  editor.insertText = text => {
    const marks = Editor.marks(editor);
    if (marks && marks['icon']) {
      editor.removeMark('icon');
    }

    insertText(text);
  };

  editor.isVoid = element => {
    return element.type === 'embed-link' || element.type === 'image' || element.type === 'move'
      ? true
      : isVoid(element);
  };

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

      const twitterNode = getTwitterNode(url);
      if (twitterNode) {
        editor.insertNode({
          type: 'embed-tweet',
          ...twitterNode,
          children: [{ text: '' }],
        });
        return;
      }

      createArticleLink({ variables: { url: text } });
    } else {
      insertData(data);
    }
  };

  editor.normalizeNode = entry => {
    const [node, path] = entry;

    if (SlateElement.isElement(node) && node.type === 'link') {
      const x = Node.children(editor, path).next();
      if (!x.done && !x.value[0].text) {
        Transforms.unwrapNodes(editor, { at: path });
        return;
      }
    }

    normalizeNode(entry);
  };

  return (
    <>
      <MarkButton format="bold" icon={YAROUYO_FONT_CODE.bold} />
      <BlockButton format="heading-one" icon={YAROUYO_FONT_CODE.h1} />
      <BlockButton format="bulleted-list" icon={YAROUYO_FONT_CODE.list} />

      <OperationButton icon={YAROUYO_FONT_CODE.lp} />
      <MoveButton />
      <ImageButton />
      <LinkButton />

      <Editable placeholder="本文" renderElement={renderElement} renderLeaf={renderLeaf} onKeyDown={onKeyDown} />
    </>
  );
};
