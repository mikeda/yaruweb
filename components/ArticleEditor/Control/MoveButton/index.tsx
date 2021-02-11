import React, { useState } from 'react';
import { useSlate } from 'slate-react';

import { Button } from '../Button';
import { YAROUYO_FONT_CODE } from '@/lib/YarouyoFont';
import Modal from 'react-modal';

import styles from './MoveButton.module.scss';
import { MoveSelect } from './MoveSelect';

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

  return (
    <>
      <Button
        active={false}
        onMouseDown={event => {
          event.preventDefault();
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
        <div className="el_form_group">
          <div className="el_form_select">
            <select
              className="el_form_input"
              value={characterSlug}
              onChange={event => {
                event.preventDefault();
                setCharacterSlug(event.target.value);
              }}
            >
              <option value=""></option>
              {CHARACTERS.map(character => (
                <option key={character.value} value={character.value}>
                  {character.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {characterSlug && (
          <div>
            <MoveSelect
              characterSlug={characterSlug}
              onChange={moveId => {
                editor.insertNode({ type: 'move', moveId, children: [{ text: '' }] });
                setExpanded(false);
              }}
            />
          </div>
        )}
      </Modal>
    </>
  );
};
