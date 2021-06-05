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

const CHARACTERS = [
  { value: 'asuka', label: '飛鳥' },
  { value: 'alisa', label: 'アリサ' },
  { value: 'anna', label: 'アンナ' },
  { value: 'armor_king', label: 'アーマーキング' },
  { value: 'eddy', label: 'エディ' },
  { value: 'eliza', label: 'エリザ' },
  { value: 'kazumi', label: '一美' },
  { value: 'kazuya', label: 'カズヤ' },
  { value: 'katarina', label: 'カタリーナ' },
  { value: 'ganryu', label: '巌竜' },
  { value: 'king', label: 'キング' },
  { value: 'gigas', label: 'ギガース' },
  { value: 'geese', label: 'ギース' },
  { value: 'kunimitsu', label: '州光' },
  { value: 'kuma', label: 'クマ・パンダ' },
  { value: 'claudio', label: 'クラウディオ' },
  { value: 'chloe', label: 'クロエ' },
  { value: 'gouki', label: '豪鬼' },
  { value: 'zafina', label: 'ザフィーナ' },
  { value: 'xiaoyu', label: 'シャオユウ' },
  { value: 'shaheen', label: 'シャヒーン' },
  { value: 'jack7', label: 'ジャック7' },
  { value: 'julia', label: 'ジュリア' },
  { value: 'josie', label: 'ジョシー' },
  { value: 'jin', label: '仁' },
  { value: 'steve', label: 'スティーブ' },
  { value: 'devil_jin', label: 'デビル仁' },
  { value: 'dragunov', label: 'ドラグノフ' },
  { value: 'negan', label: 'ニーガン' },
  { value: 'nina', label: 'ニーナ' },
  { value: 'noctis', label: 'ノクティス' },
  { value: 'hwoarang', label: 'ファラン' },
  { value: 'fahkumram', label: 'ファーカムラム' },
  { value: 'feng', label: 'フェン' },
  { value: 'bryan', label: 'ブライアン' },
  { value: 'heihachi', label: '平八' },
  { value: 'bob', label: 'ボブ' },
  { value: 'paul', label: 'ポール' },
  { value: 'master_raven', label: 'マスターレイヴン' },
  { value: 'marduk', label: 'マードック' },
  { value: 'miguel', label: 'ミゲル' },
  { value: 'yoshimitsu', label: '吉光' },
  { value: 'lars', label: 'ラース' },
  { value: 'lili', label: 'リリ' },
  { value: 'leroy', label: 'リロイ' },
  { value: 'lee', label: 'リー' },
  { value: 'lei', label: 'レイ' },
  { value: 'leo', label: 'レオ' },
  { value: 'law', label: 'ロウ' },
];

export const MoveButton: React.FC = () => {
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
            options={CHARACTERS}
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
