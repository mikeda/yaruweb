import React from 'react';
import { useSlate } from 'slate-react';
import { Button } from './Button';

import { YAROUYO_FONT_CODE } from '@/lib/YarouyoFont';
import { insertLink, isLinkActive } from '../LinkHelper';

export const LinkButton: React.FC = () => {
  const editor = useSlate();

  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={event => {
        event.preventDefault();
        const url = window.prompt('リンクするURLを入力してください。');

        if (!url) return;
        insertLink(editor, url);
      }}
      icon={YAROUYO_FONT_CODE.link}
    />
  );
};
