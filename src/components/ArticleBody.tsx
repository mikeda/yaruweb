import { List, ListItemButton, Paper, Typography } from '@mui/material';
import React, { useCallback, useMemo } from 'react';

import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { Element } from './ArticleElement';
import { Leaf } from './ArticleElement/Leaf';
import theme from '@/theme';

interface Props {
  slateContent: Descendant[];
}

const setTocLinks = (slateContent: Descendant[]): TocRow[] => {
  const tocRows: TocRow[] = [];
  const counts: { [key: string]: number } = {};

  slateContent.forEach(element => {
    if (!(element.type === 'heading-one' || element.type === 'heading-two')) return;

    const text = element.children
      .filter(e => e.text && !e.icon)
      .map(e => e.text)
      .join();

    let title: string;
    if (counts[text]) {
      counts[text] += 1;
      title = `${text}-${counts[text]}`;
    } else {
      counts[text] = 1;
      title = text;
    }

    element.id = title;
    tocRows.push({ title, lebel: element.type === 'heading-one' ? 1 : 2 });
  });

  return tocRows;
};

const Toc: React.FC<{ tocRows: TocRow[] }> = ({ tocRows }) => {
  return (
    <Paper sx={{ p: 2, bgcolor: theme.palette.grey[100] }}>
      <Typography variant="h5">目次</Typography>

      <List component="nav" dense>
        {tocRows.map((tocRow, i) => (
          <ListItemButton key={i} component="a" href={`#${tocRow.title}`} sx={{ pl: tocRow.lebel === 2 ? 4 : 0 }}>
            {tocRow.title}
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};

export interface TocRow {
  title: string;
  lebel: 1 | 2;
}

export const ArticleBody: React.FC<Props> = ({ slateContent }) => {
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const onChange = useCallback(() => {}, []);
  const value = useMemo<Descendant[]>(() => slateContent, []);
  const editor = useMemo(() => withReact(createEditor()), []);
  const tocRows = useMemo(() => setTocLinks(slateContent), []);

  return (
    <>
      <Toc tocRows={tocRows} />
      <Slate editor={editor} value={value} onChange={onChange}>
        <Editable renderElement={renderElement} renderLeaf={renderLeaf} readOnly />
      </Slate>
    </>
  );
};
