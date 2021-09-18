import { Element as SlateElement, Transforms, Editor, Range } from 'slate';
import { LinkElement } from '@/custom-types';
import isUrl from 'is-url';

//export const withLink = (editor: ReactEditor) => {
//  const { isInline, normalizeNode } = editor;
//
//  editor.isInline = element => {
//    return element.type === 'link' ? true : isInline(element);
//  };
//
//  editor.normalizeNode = entry => {
//    const [node, path] = entry;
//
//    if (SlateElement.isElement(node) && node.type === 'link') {
//      const x = Node.children(editor, path).next();
//      if (!x.done && !x.value[0].text) {
//        Transforms.unwrapNodes(editor, { at: path });
//        return;
//      }
//    }
//
//    normalizeNode(entry);
//  };
//
//  return editor;
//};

export const withLink = (editor: Editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.insertText = text => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = data => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export const insertLink = (editor: Editor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

export const isLinkActive = (editor: Editor) => {
  const match = Editor.nodes(editor, {
    match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  }).next().value;

  return !!match;
};

//const isLinkActive = (editor: Editor) => {
//  const [link] = Editor.nodes(editor, {
//    match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
//  }).next;
//  return !!link;
//};

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
  const link: LinkElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};
