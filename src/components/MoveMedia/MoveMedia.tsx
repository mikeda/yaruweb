import React from 'react';

import { AttackMoveFragment, MoveMediaFragment } from '@/lib/graphql/types';
import { Command } from '../Command';

import styles from './MoveMedia.module.scss';

import Link from 'next/link';
import { VideoPlayer } from './VideoPlayer';
import { path } from '@/lib';
import { AttackMoveResultText, AttackTypeEnumText } from '@/lib/graphql/enum_texts';

type Props = {
  move: MoveMediaFragment;
};

export const MoveMedia: React.FC<Props> = ({ move }) => {
  return (
    <Link href={path({ to: 'move', moveId: move.id })}>
      <a className={styles.container}>
        {move.kana && <div className={styles.kana}>{move.kana}</div>}

        <div className={styles.header}>
          <div className={styles.ttl}>{move.name}</div>
        </div>

        <div className={styles.cont}>
          <div>
            {move.commandList.map((command, i) => (
              <Command key={i} command={command} />
            ))}

            {move.moveable.__typename === 'AttackMove' && <AttackDetails move={move} />}
          </div>

          {move.moveVideo && <VideoPlayer src={move.moveVideo.m3u8Url} thumnailUrl={move.moveVideo.thumbnailUrl} />}
        </div>
      </a>
    </Link>
  );
};

const AttackLabels: React.FC<AttackMoveFragment> = attack => {
  return (
    <div className={styles.tags}>
      {attack.powerCrush && <span>パワークラッシュ</span>}
      {attack.crouchingStatus && <span>しゃがステ</span>}
      {attack.jumpStatus && <span>ジャンステ</span>}
      {attack.homing && <span>ホーミング</span>}
      {attack.screw && <span>スクリュー</span>}
      {attack.wallBound && <span>ウォールバウンド</span>}
    </div>
  );
};

const AttackDetails: React.FC<{ move: MoveMediaFragment }> = ({ move }) => {
  if (move.moveable.__typename !== 'AttackMove') return null;

  const totalDamage = move.moveable.damages.reduce((a, b) => a + b, 0);

  return (
    <>
      <AttackLabels {...move.moveable} />

      <div className={styles.details}>
        <MoveDetail label="発生">{`${move.moveable.startUpFrame}F`}</MoveDetail>
      </div>

      <div className={styles.details}>
        {move.moveable.heights.length > 0 && (
          <MoveDetail label="判定">
            {move.moveable.heights.map(height => AttackTypeEnumText[height]).join(', ')}
          </MoveDetail>
        )}
        <MoveDetail label="ダメージ">
          {totalDamage}
          {move.moveable.damages.length > 1 && `(${move.moveable.damages.join(', ')})`}
        </MoveDetail>
      </div>

      <div className={styles.details}>
        <MoveDetail label="ガード">
          <OpponentDetail frame={move.moveable.blockFrame} state={AttackMoveResultText[move.moveable.blockResult]} />
        </MoveDetail>

        <MoveDetail label="ヒット">
          <OpponentDetail frame={move.moveable.hitFrame} state={AttackMoveResultText[move.moveable.hitResult]} />
        </MoveDetail>

        <MoveDetail label="カウンター">
          <OpponentDetail
            frame={move.moveable.counterFrame}
            state={AttackMoveResultText[move.moveable.counterResult]}
          />
        </MoveDetail>
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

const OpponentDetail: React.FC<{ frame?: number | null; state?: string | null }> = ({ frame, state }) => {
  let frameClass: string | undefined;
  if (frame && frame <= -10) frameClass = 'el_caution';

  return (
    <>
      {frame && <span className={frameClass}>{frameText(frame)}</span>}
      {state}
    </>
  );
};

const frameText = (frame: number) => {
  if (frame > 0) return `+${frame}F`;
  if (frame === 0) return `±${0}F`;
  return `${frame}F`;
};
