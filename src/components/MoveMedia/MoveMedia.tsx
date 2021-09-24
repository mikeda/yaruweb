import React from 'react';

import { AttackActionFragment, AttackMoveFragment, MoveMediaFragment, ThrowActionFragment } from '@/lib/graphql/types';
import { Command } from '../Command';

import styles from './MoveMedia.module.scss';

import {
  AttackActionStateText,
  AttackTypeEnumText,
  ThorwActionStateText,
  ThrowTypeEnumText,
} from '@/lib/graphql/enum_texts';
import Link from 'next/link';
import { VideoPlayer } from './VideoPlayer';
import { path } from '@/lib';

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
            {move.commands.map(command => (
              <Command key={command.id} command={command} />
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

  const damages = move.actions.map(a => a.damage);
  const totalDamage = move.actions.map(a => a.damage).reduce((a, b) => a + b, 0);
  const lastAction = move.actions[move.actions.length - 1];

  return (
    <>
      <AttackLabels {...move.moveable} />

      <div className={styles.details}>
        <MoveDetail label="発生">{`${move.moveable.startUpFrame}F`}</MoveDetail>
      </div>

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
        {lastAction && lastAction.__typename === 'AttackAction' && <LastAttackAction action={lastAction} />}
        {lastAction && lastAction.__typename === 'ThrowAction' && <LastThrowAction action={lastAction} />}
      </div>
    </>
  );
};

const LastAttackAction: React.FC<{ action: AttackActionFragment }> = ({ action }) => {
  return (
    <>
      {action.blockAvailable && (
        <MoveDetail label="ガード">
          <OpponentDetail frame={action.blockFrame} state={AttackActionStateText[action.blockState]} />
        </MoveDetail>
      )}

      {action.hitAvailable && (
        <MoveDetail label="ヒット">
          <OpponentDetail frame={action.hitFrame} state={AttackActionStateText[action.hitState]} />
        </MoveDetail>
      )}

      {action.counterHitAvailable && (
        <MoveDetail label="カウンターヒット">
          <OpponentDetail frame={action.counterHitFrame} state={AttackActionStateText[action.counterHitState]} />
        </MoveDetail>
      )}
    </>
  );
};

const LastThrowAction: React.FC<{ action: ThrowActionFragment }> = ({ action }) => {
  return (
    <>
      {action.throwAvailable && (
        <MoveDetail label="投げ">
          <OpponentDetail frame={action.throwFrame} state={ThorwActionStateText[action.throwState]} />
        </MoveDetail>
      )}
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
