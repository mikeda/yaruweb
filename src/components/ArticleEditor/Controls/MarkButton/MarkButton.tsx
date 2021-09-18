import React from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';
import { Button } from '../Button';

type Format = 'bold' | 'italic' | 'code' | 'icon';
interface Props {
  format: Format;
  icon: number;
}

export const MarkButton: React.FC<Props> = ({ format, icon }) => {
  const editor = useSlate();

  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      icon={icon}
    />
  );
};

const isMarkActive = (editor: Editor, format: Format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor: Editor, format: Format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
