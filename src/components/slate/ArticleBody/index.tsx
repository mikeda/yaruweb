import React, { useCallback, useMemo } from 'react';

import { List, ListItemButton, Paper, Typography } from '@mui/material';
import { createEditor, Descendant } from 'slate';
import { Editable, RenderElementProps, RenderLeafProps, Slate, withReact } from 'slate-react';

import { ArticleElement } from '../ArticleElement';
import { ArticleLeaf } from '../ArticleLeaf';

import { theme } from '@/lib';

interface Props {
  content: string;
}

const setTocLinks = (slateContent: Descendant[]): TocRow[] => {
  const tocRows: TocRow[] = [];
  const counts: { [key: string]: number } = {};

  slateContent.forEach(element => {
    if (!(element.type === 'heading-one' || element.type === 'heading-two')) return;

    const title = element.children
      .filter(e => e.text && !e.icon)
      .map(e => e.text)
      .join();

    let id: string;
    if (counts[title]) {
      counts[title] += 1;
      id = `${title}-${counts[title]}`;
    } else {
      counts[title] = 1;
      id = title;
    }

    element.id = id;
    tocRows.push({ title, id, lebel: element.type === 'heading-one' ? 1 : 2 });
  });

  return tocRows;
};

const Toc: React.FC<{ tocRows: TocRow[] }> = ({ tocRows }) => {
  return (
    <Paper sx={{ p: 2, bgcolor: theme.palette.grey[100] }}>
      <Typography variant="h5">目次</Typography>

      <List component="nav" dense>
        {tocRows.map((tocRow, i) => (
          <ListItemButton key={i} component="a" href={`#${tocRow.id}`} sx={{ pl: tocRow.lebel === 2 ? 4 : 0 }}>
            {tocRow.title}
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};

export interface TocRow {
  title: string;
  id: string;
  lebel: 1 | 2;
}

export const ArticleBody: React.FC<Props> = ({ content }) => {
  const renderElement = useCallback((props: RenderElementProps) => <ArticleElement {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <ArticleLeaf {...props} />, []);
  const onChange = useCallback(() => {}, []);
  const value = useMemo<Descendant[]>(() => JSON.parse(content), []);
  const editor = useMemo(() => withReact(createEditor()), []);
  const tocRows = useMemo(() => setTocLinks(value), []);

  return (
    <>
      <Toc tocRows={tocRows} />
      <Slate editor={editor} value={value} onChange={onChange}>
        <Editable renderElement={renderElement} renderLeaf={renderLeaf} readOnly />
      </Slate>
    </>
  );
};
