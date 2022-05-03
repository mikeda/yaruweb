import React, { useState } from 'react';
import { useSlate } from 'slate-react';
import { Transforms, Editor } from 'slate';
import { Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { Character } from '@/lib';

import { ComboSelect } from './ComboSelect';
import { TextButton } from '../TextButton';

type CharacterFragment = Pick<Character, 'slug' | 'name'>;

interface Props {
  characters: CharacterFragment[];
}

export const ComboButton: React.FC<Props> = ({ characters }) => {
  const [expanded, setExpanded] = useState(false);
  const [characterSlug, setCharacterSlug] = useState('');

  const editor = useSlate();
  const savedSelection = React.useRef(editor.selection);

  return (
    <>
      <TextButton
        active={false}
        onMouseDown={event => {
          event.preventDefault();
          savedSelection.current = editor.selection;
          setExpanded(!expanded);
        }}
        text="コンボ"
      />

      <Dialog open={expanded} onClose={() => setExpanded(false)}>
        <DialogContent>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel>キャラクター</InputLabel>

            <Select
              placeholder="キャラクター"
              onChange={item => {
                if (item) setCharacterSlug(item.target.value as string);
              }}
            >
              {characters.map(c => (
                <MenuItem key={c.slug} value={c.slug}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {characterSlug && (
            <ComboSelect
              characterSlug={characterSlug}
              onChange={comboId => {
                if (!editor.selection) {
                  Transforms.select(editor, savedSelection.current ?? Editor.end(editor, []));
                }
                editor.insertNode({
                  type: 'embed-combo',
                  comboId,
                  children: [{ text: '' }],
                });
                editor.insertNode({ type: 'paragraph', children: [{ text: '' }] });
                setExpanded(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
