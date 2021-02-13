import React, { useCallback } from 'react';
import { Editable, useSlate } from 'slate-react';
import { BlockButton } from './Control/BlockButton';
import { MarkButton } from './Control/MarkButton';
import { Element } from '@/components/ArticleElement';
import { Leaf } from '../ArticleElement/Leaf';
import { YAROUYO_FONT_CODE } from '@/lib/YarouyoFont';
import { OperationButton } from './Control/OperationButton';
import { ImageButton } from './Control/ImageButton';
import { LinkButton } from './Control/LinkButton';
import { MoveButton } from './Control/MoveButton';
import { ArticleElementTypes } from '../ArticleElement/ArticleElement';

export const ArticleEditor: React.FC = () => {
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.shiftKey && event.key === 'Enter') {
      event.preventDefault();
      editor.insertText('\n');
    }
  }, []);

  const editor = useSlate();
  const { isVoid } = editor;

  editor.isVoid = element => {
    return element.type === ArticleElementTypes.Image || element.type === ArticleElementTypes.EmbedMove
      ? true
      : isVoid(element);
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
