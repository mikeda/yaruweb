import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

import { MoveFragment, OpponentStateEnum } from '@/lib/graphql/types';
import { Routes } from '@/lib/Routes';
import { Command } from './Command';

import styles from './MoveMedia.module.scss';

import {
  AttackTypeEnumText,
  OpponentStateText,
  OpponentStateTypeText,
  ThrowTypeEnumText,
} from '@/lib/graphql/enum_texts';
import { DropDownMenu } from './layouts/DropDownMenu';
import Link from 'next/link';

type Props = {
  move: MoveFragment;
};

export const MoveMedia: React.FC<Props> = ({ move }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <>
      <div className={styles.container}>
        {move.kana && <div className={styles.kana}>{move.kana}</div>}

        <div className={styles.header}>
          <div className={styles.ttl}>{move.name}</div>
          <div className={styles.menu}>
            <div
              onClick={() => {
                setMenuOpened(true);
              }}
              className="el_iconBtn"
            >
              <FontAwesomeIcon icon={faEdit} />
            </div>

            {menuOpened && (
              <DropDownMenu
                onClose={() => setMenuOpened(false)}
                items={[
                  <Link key={0} href={Routes.updateMove(move.id)}>
                    <a>技データ編集</a>
                  </Link>,
                  <Link key={1} href={Routes.moveCommands(move.id)}>
                    <a>コマンド登録</a>
                  </Link>,
                  <Link key={1} href={Routes.moveActions(move.id)}>
                    <a>アクション登録</a>
                  </Link>,
                ]}
              />
            )}
          </div>
        </div>

        <div className={styles.cont}>
          <div>
            {move.commands.map(command => (
              <Command key={command.id} command={command} />
            ))}

            <AttackLabels move={move} />

            <div className={styles.details}>
              <MoveDetail label="発生">{`${move.startUpFrame}F`}</MoveDetail>
            </div>

            <AttackDetails move={move} />

            {move.note && move.note.length > 0 && <div className={styles.note}>{move.note}</div>}
          </div>

          {move.youtubeVideoId && (
            <div className={styles.video}>
              <div className="bl_youtube">
                <iframe
                  width={854}
                  height={480}
                  src={`https://www.youtube.com/embed/${move.youtubeVideoId}`}
                  frameBorder={0}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const AttackLabels: React.FC<{ move: MoveFragment }> = ({ move }) => {
  return (
    <div className={styles.tags}>
      {move.powerCrush && <span>パワークラッシュ</span>}
      {move.crouchingStatus && <span>しゃがステ</span>}
      {move.jumpStatus && <span>ジャンステ</span>}
      {move.homing && <span>ホーミング</span>}
      {move.screw && <span>スクリュー</span>}
      {move.wallBound && <span>ウォールバウンド</span>}
    </div>
  );
};

const AttackDetails: React.FC<{ move: MoveFragment }> = ({ move }) => {
  const damages = move.actions.map(a => a.damage);
  const totalDamage = move.actions.map(a => a.damage).reduce((a, b) => a + b);
  const lastAction = move.actions[move.actions.length - 1];

  return (
    <>
      <div className={styles.details}>
        <MoveDetail label="判定">
          {move.actions
            .map(action => {
              switch (action.__typename) {
                case 'AttackAction':
                  return AttackTypeEnumText[action.attackType];
                case 'ThrowAction':
                  return ThrowTypeEnumText[action.throwType];
              }
            })
            .join(', ')}
        </MoveDetail>
        <MoveDetail label="ダメージ">
          {totalDamage}
          {damages.length > 1 && `(${damages.join(', ')})`}
        </MoveDetail>
      </div>

      <div className={styles.details}>
        {lastAction &&
          lastAction.opponentStates &&
          lastAction.opponentStates.map(opponentState => {
            return (
              <MoveDetail key={opponentState.id} label={OpponentStateTypeText[opponentState.type]}>
                <OpponentDetail frame={opponentState.frame} state={opponentState.state} />
              </MoveDetail>
            );
          })}
      </div>
    </>
  );
};

const MoveDetail: React.FC<{ label: string }> = ({ label, children }) => {
  return (
    <div className={styles.detail}>
      <span className={styles.detailTtl}>{label}</span>
      {children}
    </div>
  );
};

const OpponentDetail: React.FC<{ frame?: number | null; state: OpponentStateEnum }> = ({ frame, state }) => {
  let frameClass: string | undefined;
  if (frame && frame <= -10) frameClass = 'el_caution';

  return (
    <>
      {frame && <span className={frameClass}>{frameText(frame)}</span>}
      {state !== OpponentStateEnum.Unchanged && OpponentStateText[state]}
    </>
  );
};

const frameText = (frame: number) => {
  if (frame > 0) return `+${frame}F`;
  if (frame === 0) return `±${0}F`;
  return `${frame}F`;
};
