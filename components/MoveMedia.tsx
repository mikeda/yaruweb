import React from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

import { AttackFragment, MoveFragment, OpponentStateEnum } from '@/lib/graphql/types';
import { Routes } from '@/lib/Routes';
import { Operations } from './Operations';

import styles from './MoveMedia.module.scss';

import { useCurrentPlayer } from 'hooks/useCurrentPlayer';
import {
  AttackTypeEnumText,
  OpponentStateText,
  OpponentStateTypeText,
  ThrowTypeEnumText,
} from '@/lib/graphql/enum_texts';

type Props = {
  move: MoveFragment;
};

export const MoveMedia: React.FC<Props> = ({ move }) => {
  const router = useRouter();
  const { currentPlayer } = useCurrentPlayer();

  return (
    <>
      <div className={styles.container}>
        {move.kana && <div className={styles.kana}>{move.kana}</div>}

        <div className={styles.header}>
          <div className={styles.ttl}>{move.name}</div>
          <div
            onClick={() => {
              if (!currentPlayer) {
                alert('ログインが必要です。');
                return;
              }

              router.push(Routes.updateMove(move.id));
            }}
            className="el_iconBtn"
          >
            <FontAwesomeIcon icon={faEdit} />
          </div>
        </div>

        <div className={styles.cont}>
          <div>
            {move.moveCommands[0] && <Operations operations={move.moveCommands[0].operations} />}

            {move.attack && <AttackLabels attack={move.attack} />}

            <div className={styles.details}>
              <MoveDetail label="発生">{`${move.startUpFrame}F`}</MoveDetail>
            </div>

            {move.attack && <AttackDetails move={move} />}

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

const AttackLabels: React.FC<{ attack: AttackFragment }> = ({ attack }) => {
  return (
    <div className={styles.tags}>
      {attack.powerCrush && <span>パワークラッシュ</span>}
      {attack.crouchingStatus && <span>しゃがステ</span>}
      {attack.jumpStatus && <span>ジャンステ</span>}
      {attack.homing && <span>ホーミング</span>}
      {attack.screw && <span>スクリュー</span>}
      {attack.wallBound && <span>ウォールバウンド</span>}
      {attack.hitGround && <span>ダウン状態に当たる</span>}
    </div>
  );
};

const AttackDetails: React.FC<{ move: MoveFragment }> = ({ move: { attack, actions } }) => {
  if (!attack) return null;

  const damages = actions.map(a => a.damage);
  const totalDamage = actions.map(a => a.damage).reduce((a, b) => a + b);
  const lastAction = actions[actions.length - 1];

  return (
    <>
      <div className={styles.details}>
        <MoveDetail label="判定">
          {actions
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
