import { Editor } from 'slate';
import { ReactEditor } from 'slate-react';

export const withIcon = (editor: ReactEditor) => {
  const { insertText, isInline } = editor;

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.insertText = text => {
    const marks = Editor.marks(editor);
    if (marks && marks['icon']) {
      editor.removeMark('icon');
    }

    insertText(text);
  };

  return editor;
};
