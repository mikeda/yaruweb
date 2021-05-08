import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

import { AttackActionFragment, MoveFragment, ThrowActionFragment } from '@/lib/graphql/types';
import { Command } from '../Command';

import styles from './MoveMedia.module.scss';

import {
  AttackActionStateText,
  AttackTypeEnumText,
  ThorwActionStateText,
  ThrowTypeEnumText,
} from '@/lib/graphql/enum_texts';

type Props = {
  move: MoveFragment;
};

export const MoveMedia: React.FC<Props> = ({ move }) => {
  return (
    <>
      <div className={styles.container}>
        {move.kana && <div className={styles.kana}>{move.kana}</div>}

        <div className={styles.header}>
          <div className={styles.ttl}>{move.name}</div>
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

          {move.moveVideo && <VideoPlayer src={move.moveVideo.m3u8Url} thumnailUrl={move.moveVideo.thumbnailUrl} />}
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
  const totalDamage = move.actions.map(a => a.damage).reduce((a, b) => a + b, 0);
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

      {action.cleanHitAvailable && (
        <MoveDetail label="クリーンヒット">
          <OpponentDetail frame={action.cleanHitFrame} state={AttackActionStateText[action.cleanHitState]} />
        </MoveDetail>
      )}

      {action.crouchingHitAvailable && (
        <MoveDetail label="しゃがみにヒット">
          <OpponentDetail frame={action.crouchingHitFrame} state={AttackActionStateText[action.crouchingHitState]} />
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

      {action.throwEscapeAvailable && (
        <MoveDetail label="投げ抜け">
          <OpponentDetail frame={action.throwEscapeFrame} state={ThorwActionStateText[action.throwEscapeState]} />
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

const VideoPlayer: React.FC<{ src: string; thumnailUrl: string }> = ({ src, thumnailUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let hls: Hls;
    if (videoRef.current) {
      const video = videoRef.current;
      if (!video) return;

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // This will run in safari, where HLS is supported natively
        video.src = src;
      } else if (Hls.isSupported()) {
        // This will run in all other modern browsers
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [videoRef]);

  return <video controls ref={videoRef} className={styles.video} poster={thumnailUrl} preload="none" />;
};
