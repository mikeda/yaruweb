import React, { useState } from 'react';

import { Autocomplete, Dialog, DialogContent, Stack, TextField } from '@mui/material';
import { Transforms, Editor } from 'slate';
import { useSlate } from 'slate-react';

import { TextButton } from '../TextButton';

import { MoveSelect } from './MoveSelect';

import { Character } from '@/generated/graphql';

type CharacterFragment = Pick<Character, 'slug' | 'name'>;

interface Props {
  characters: CharacterFragment[];
}

export const MoveButton: React.FC<Props> = ({ characters }) => {
  const [expanded, setExpanded] = useState(false);
  const [character, setCharacter] = useState<CharacterFragment>();

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
        text="コマンドリスト"
      />

      <Dialog open={expanded} onClose={() => setExpanded(false)}>
        <DialogContent sx={{ width: 300 }}>
          <Stack spacing={1}>
            <Autocomplete<CharacterFragment, undefined, true>
              options={characters}
              value={character}
              getOptionLabel={option => option.name}
              onChange={(e, option) => {
                setCharacter(option);
              }}
              renderInput={params => (
                <TextField {...params} label="キャラクター" variant="outlined" fullWidth size="small" />
              )}
              disableClearable
            />

            {character && (
              <MoveSelect
                characterSlug={character.slug}
                onChange={moveId => {
                  if (!editor.selection) {
                    Transforms.select(editor, savedSelection.current ?? Editor.end(editor, []));
                  }
                  editor.insertNode({
                    type: 'embed-move',
                    moveId,
                    children: [{ text: '' }],
                  });
                  editor.insertNode({ type: 'paragraph', children: [{ text: '' }] });
                  setExpanded(false);
                }}
              />
            )}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
