import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { ApolloProvider } from '@apollo/client';

import { client } from '@/lib/graphql/client';
import { Preview } from './Preview';
import { MoveSelect } from './MoveSelect';

const characters = [
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

interface Props {
  characterSlug?: string;
  moveId?: string;
  onChangeCharacter: (characterSlug: string) => void;
  onChangeMove: (moveId: string) => void;
}

export const Selector: React.FC<Props> = ({ onChangeCharacter, onChangeMove, ...props }) => {
  const [characterSlug, setCharacterSlug] = useState(props.characterSlug);
  const [moveId, setMoveId] = useState(props.moveId);

  useEffect(() => {
    if (!characterSlug) return;
  });

  return (
    <ApolloProvider client={client}>
      <div className="ly_row ly_row__mg_md">
        <div className="ly_col_6">
          <Select
            value={characters.find(option => option.value === characterSlug)}
            options={characters}
            onChange={e => {
              if (!e) return;

              setCharacterSlug(e.value);
              onChangeCharacter(e.value);
            }}
            placeholder="キャラクター選択"
          />
        </div>

        {characterSlug && (
          <div className="ly_col_6">
            <MoveSelect
              characterSlug={characterSlug}
              moveId={moveId}
              onChange={moveId => {
                setMoveId(moveId);
                onChangeMove(moveId);
              }}
            />
          </div>
        )}
      </div>

      {moveId && <Preview moveId={moveId} />}
    </ApolloProvider>
  );
};
