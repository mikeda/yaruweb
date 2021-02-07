import React from 'react';

import { OutputData } from '@editorjs/editorjs';
import { EditorJsOutput } from '@/lib/EditorJsOutput/EditorJsOutput';

interface Props {
  data: OutputData;
}

export const ArticleBody: React.FC<Props> = ({ data }) => {
  return (
    <div className="bl_article_body">
      <EditorJsOutput data={data} />
    </div>
  );
};
