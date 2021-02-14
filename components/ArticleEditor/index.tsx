import React, { useCallback } from 'react';
import { Editable, useSlate, withReact } from 'slate-react';
import { BlockButton } from './Controls/BlockButton';
import { MarkButton } from './Controls/MarkButton';
import { Element } from '@/components/ArticleElement';
import { Leaf } from '../ArticleElement/Leaf';
import { YAROUYO_FONT_CODE } from '@/lib/YarouyoFont';
import { OperationButton } from './Controls/OperationButton';
import { ImageButton } from './Controls/ImageButton';
import { LinkButton } from './Controls/LinkButton';
import { MoveButton } from './Controls/MoveButton';
import { ArticleElementTypes } from '../ArticleElement/ArticleElement';
import { withIcon } from './IconHelper';
import { createEditor } from 'slate';
import { withLink } from './LinkHelper';
import { withEmbedYoutube } from './YoutubeHelper';
import { withEmbedTwitter } from './TwitterHelper';
import { useCreateArticleLinkMutation } from '@/lib/graphql/types';
import isUrl from 'is-url';

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
      <MarkButton format="bold" icon={YAROUYO_FONT_CODE.bold} />
      <BlockButton format="heading-one" icon={YAROUYO_FONT_CODE.h1} />
      <BlockButton format="heading-two" icon={YAROUYO_FONT_CODE.h2} />
      <BlockButton format="bulleted-list" icon={YAROUYO_FONT_CODE.list} />

      <OperationButton icon={YAROUYO_FONT_CODE.lp} />
      <MoveButton />
      <ImageButton />
      <LinkButton />

      <Editable placeholder="本文" renderElement={renderElement} renderLeaf={renderLeaf} onKeyDown={onKeyDown} />
    </>
  );
};
