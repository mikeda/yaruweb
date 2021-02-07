import React from 'react';
import { OutputData } from '@editorjs/editorjs';
import { HeaderOutput } from './HeaderOutput';
import { ParagraphOutput } from './ParagraphOutput';
import { ImageOutput } from './ImageOutput';
import { EmbedOutput } from './EmbedOutput';
import { LinkToolOutput } from './LinkToolOutput';
import { ListOutput } from './ListOutput';
import { MoveOutput } from './MoveOutput';

interface Props {
  data: OutputData;
}

export const EditorJsOutput: React.FC<Props> = ({ data }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const BlockOutput = ({ block: block }: { block: any }) => {
    switch (block.type) {
      case 'header':
        return <HeaderOutput data={block.data} />;
      case 'paragraph':
        return <ParagraphOutput data={block.data} />;
      case 'list':
        return <ListOutput data={block.data} />;
      case 'image':
        return <ImageOutput data={block.data} />;
      case 'embed':
        return <EmbedOutput data={block.data} />;
      case 'linkTool':
        return <LinkToolOutput data={block.data} />;
      case 'move':
        return <MoveOutput data={block.data} />;
      default:
        return null;
    }
  };

  return (
    <>
      {data.blocks.map((block, i) => (
        <div key={i} className="bl_article__block">
          <BlockOutput block={block} />
        </div>
      ))}
    </>
  );
};
