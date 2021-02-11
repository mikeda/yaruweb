import React from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { Button } from './Button';

import { Editor, Range, Element as SlateElement, Transforms } from 'slate';
import { YAROUYO_FONT_CODE } from '@/lib/YarouyoFont';

export const LinkButton: React.FC = () => {
  const editor = useSlate();

  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={event => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the link:');
        if (!url) return;
        insertLink(editor, url);
      }}
      icon={YAROUYO_FONT_CODE.link}
    />
  );
};
const insertLink = (editor: Editor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const isLinkActive = (editor: Editor) => {
  const match = Editor.nodes(editor, {
    match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  }).next().value;

  return !!match;
};

const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
};

const wrapLink = (editor: Editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    //Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const withLinks = (editor: ReactEditor) => {
  const { insertData, insertText, isInline, normalizeNode } = editor;

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element);
  };

  //editor.insertText = text => {
  //  if (text && isUrl(text)) {
  //    wrapLink(editor, text);
  //  } else {
  //    insertText(text);
  //  }
  //};

  //editor.insertData = data => {
  //  const text = data.getData('text/plain');

  //  if (text && isUrl(text)) {
  //    wrapLink(editor, text);
  //  } else {
  //    insertData(data);
  //  }
  //};

  //editor.normalizeNode = entry => {
  //  const [node, path] = entry;

  //  if (SlateElement.isElement(node) && node.type === 'link') {
  //    console.log(node);
  //    console.log(path);
  //    const x = Node.children(editor, path).next();
  //    if (!x.done && !x.value[0].text) {
  //      console.log(1111);
  //      Transforms.removeNodes(editor, { at: path });
  //      Transforms.removeNodes(editor, { at: [0, 1] });
  //      Transforms.removeNodes(editor, { at: [0, 0] });
  //    }
  //    //for (const node of Node.children(editor, path)) {
  //    //}
  //    //Transforms.removeNodes(editor, { at: path });
  //    //for (const [child, childPath] of Node.children(editor, path)) {
  //    //  if (SlateElement.isElement(child) && !editor.isInline(child)) {
  //    //    Transforms.unwrapNodes(editor, { at: childPath });
  //    //    return;
  //    //  }
  //    //}
  //  }

  //  normalizeNode(entry);
  //};

  return editor;
};
