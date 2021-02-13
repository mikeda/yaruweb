import React, { useCallback, useMemo } from 'react';

import { createEditor, Node } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { Element } from './ArticleElement';
import { Leaf } from './ArticleElement/Leaf';

interface Props {
  content: string;
}

export const ArticleBody: React.FC<Props> = ({ content }) => {
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const value = useMemo<Node[]>(() => JSON.parse(content), []);
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <div className="bl_article_body">
      <Slate editor={editor} value={value} onChange={() => {}}>
        <Editable placeholder="本文" renderElement={renderElement} renderLeaf={renderLeaf} readOnly />
      </Slate>
    </div>
  );
};
