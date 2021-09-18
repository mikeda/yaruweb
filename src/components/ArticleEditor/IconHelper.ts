import { Editor } from 'slate';

export const withIcon = (editor: Editor) => {
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
