import React, { useState } from 'react';
import { useSlate } from 'slate-react';
import Select from 'react-select';

import { Button } from '../Button';
import { YAROUYO_FONT_CODE } from '@/lib/YarouyoFont';
import Modal from 'react-modal';

import styles from './MoveButton.module.scss';
import { MoveSelect } from './MoveSelect';
import { ArticleElementTypes } from '@/components/ArticleElement/ArticleElement';
import { FormGroup } from '@/components/form2/FormGroup';
import { Transforms, Editor } from 'slate';
import { Character } from '@/lib/graphql/types';

type CharacterFragment = Pick<Character, 'slug' | 'name'>;

interface Props {
  characters: CharacterFragment[];
}

export const MoveButton: React.FC<Props> = ({ characters }) => {
  const [expanded, setExpanded] = useState(false);
  const [characterSlug, setCharacterSlug] = useState('');

  const editor = useSlate();
  const savedSelection = React.useRef(editor.selection);

  return (
    <>
      <Button
        active={false}
        onMouseDown={event => {
          event.preventDefault();
          savedSelection.current = editor.selection;
          setExpanded(!expanded);
        }}
        icon={YAROUYO_FONT_CODE.access}
      />

      <Modal
        isOpen={expanded}
        onRequestClose={() => setExpanded(false)}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <FormGroup>
          <Select
            options={characters.map(c => ({ label: c.name, value: c.slug }))}
            placeholder="キャラクター"
            onChange={item => {
              if (item) setCharacterSlug(item.value);
            }}
          />
        </FormGroup>

        {characterSlug && (
          <div>
            <MoveSelect
              characterSlug={characterSlug}
              onChange={moveId => {
                if (!editor.selection) {
                  Transforms.select(editor, savedSelection.current ?? Editor.end(editor, []));
                }
                editor.insertNode({
                  type: ArticleElementTypes.EmbedMove,
                  moveId,
                  children: [{ text: '' }],
                });
                editor.insertNode({ type: ArticleElementTypes.Paragraph, children: [{ text: '' }] });
                setExpanded(false);
              }}
            />
          </div>
        )}
      </Modal>
    </>
  );
};
