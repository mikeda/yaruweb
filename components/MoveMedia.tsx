import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

import { OPPONENT_STATE_TEXTS, THROW_TYPE_TEXTS } from '@/lib/models/Move';
import { AttackFragment, MoveFragment, MoveOpponentState, ThrowFragment } from '@/lib/graphql/types';
import { CurrentPlayerContext } from '@/lib/contexts/CurrentPlayerContext';
import { Routes } from '@/lib/Routes';
import { Operations } from './Operations';

import styles from './MoveMedia.module.scss';

type Props = {
  move: MoveFragment;
};

export const MoveMedia: React.FC<Props> = ({ move }) => {
  const router = useRouter();
  const { currentPlayer } = useContext(CurrentPlayerContext);

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
            {move.throw && <ThrowLabels th={move.throw} />}

            {move.attack && <AttackDetails attack={move.attack} />}
            {move.throw && <ThrowDetails th={move.throw} />}

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

const HIT_LEVEL_TEXTS: { [key: string]: string } = {
  h: '上',
  m: '中',
  l: '下',
  sm: '特殊中',
  ubh: '上段ガード不能',
  ubm: '中段ガード不能',
  ubl: '下段ガード不能',
  t: '投げ',
};

const hitLevelsText = (hitLevels: string) => {
  return hitLevels
    .split(',')
    .map(l => HIT_LEVEL_TEXTS[l])
    .join(',');
};

const AttackLabels: React.FC<{ attack: AttackFragment }> = ({ attack }) => {
  return (
    <div className={styles.tags}>
      {attack.powerCrush && <span>パワークラッシュ</span>}
      {attack.crouchingStatus && <span>しゃがステ</span>}
      {attack.jumpStatus && <span>ジャンステ</span>}
      {attack.homing && <span>ホーミング</span>}
      {attack.screw && <span>スクリュー</span>}
      {attack.wallSplat && <span>壁コンボ</span>}
      {attack.wallBound && <span>ウォールバウンド</span>}
      {attack.floorBreak && <span>床破壊</span>}
      {attack.hitGround && <span>ダウン状態に当たる</span>}
    </div>
  );
};

const ThrowLabels: React.FC<{ th: ThrowFragment }> = ({ th }) => {
  return (
    <div className={styles.tags}>
      {th.wallSplat && <span> 壁コンボ </span>}
      {th.floorBreak && <span>床破壊</span>}
      {th.swapAfterHit && <span>位置交代</span>}
      {th.swapAfterEscape && <span>投げ抜けで位置交代</span>}
    </div>
  );
};

const AttackDetails: React.FC<{ attack: AttackFragment }> = ({ attack }) => {
  const damages = attack.damages.split(',').map(a => Number(a));
  const totalDamage = damages.reduce((a, d) => a + d);

  return (
    <>
      <div className={styles.details}>
        <MoveDetail label="判定">{hitLevelsText(attack.hitLevels)}</MoveDetail>
        <MoveDetail label="ダメージ">
          {totalDamage}
          {damages.length > 1 && `(${attack.damages})`}
        </MoveDetail>
      </div>

      <div className={styles.details}>
        <MoveDetail label="発生">{`${attack.startUpFrame}F`}</MoveDetail>
        <MoveDetail label="G">
          <OpponentDetail frame={attack.blockFrame} state={attack.blockState} />
        </MoveDetail>
        <MoveDetail label="H">
          <OpponentDetail frame={attack.hitFrame} state={attack.hitState} />
        </MoveDetail>
        {(attack.hitFrame !== attack.counterHitFrame || attack.hitState !== attack.counterHitState) && (
          <MoveDetail label="CH">
            <OpponentDetail frame={attack.counterHitFrame} state={attack.counterHitState} />
          </MoveDetail>
        )}
      </div>
    </>
  );
};

const ThrowDetails: React.FC<{ th: ThrowFragment }> = ({ th }) => {
  return (
    <>
      <MoveDetail label="判定">{THROW_TYPE_TEXTS[th.type]}</MoveDetail>
      {th.startUpFrame && <MoveDetail label="発生">{`${th.startUpFrame}F`}</MoveDetail>}
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

const OpponentDetail: React.FC<{ frame?: number | null; state: MoveOpponentState }> = ({ frame, state }) => {
  let frameClass: string | undefined;
  if (frame && frame <= -10) frameClass = 'el_caution';

  return (
    <>
      {frame && <span className={frameClass}>{frameText(frame)}</span>}
      {state !== 'unchanged' && OPPONENT_STATE_TEXTS[state]}
    </>
  );
};

const frameText = (frame: number) => {
  if (frame > 0) return `+${frame}F`;
  if (frame === 0) return `±${0}F`;
  return `${frame}F`;
};
