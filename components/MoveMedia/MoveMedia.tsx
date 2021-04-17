import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import Hls from 'hls.js';

import { MoveFragment, FrameStateEnum, useDeleteMoveMutation } from '@/lib/graphql/types';
import { Routes } from '@/lib/Routes';
import { Command } from '../Command';

import styles from './MoveMedia.module.scss';

import { AttackTypeEnumText, FrameText, FrameTypeText, ThrowTypeEnumText } from '@/lib/graphql/enum_texts';
import { DropDownMenu } from '../layouts/DropDownMenu';
import Link from 'next/link';
import { VideoDropzone } from './VideoDropzone';
import { useCurrentPlayer } from 'hooks/useCurrentPlayer';
import { toast } from 'react-toastify';

type Props = {
  move: MoveFragment;
  onDelete?: (moveId: string) => void;
};

export const MoveMedia: React.FC<Props> = ({ move, onDelete }) => {
  const { currentPlayer } = useCurrentPlayer();
  const [menuOpened, setMenuOpened] = useState(false);
  const [deleteMove] = useDeleteMoveMutation({
    variables: { moveId: move.id },
    onCompleted: () => {
      toast.success('削除しました。');
      if (onDelete) onDelete(move.id);
    },
    onError: () => {
      toast.error('削除に失敗しました。');
    },
  });

  return (
    <>
      <div className={styles.container}>
        {move.kana && <div className={styles.kana}>{move.kana}</div>}

        <div className={styles.header}>
          <div className={styles.ttl}>{move.name}</div>

          {currentPlayer && (
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
                    <Link key={2} href={Routes.createMoveVideo(move.id)}>
                      <a>動画登録</a>
                    </Link>,
                    <a
                      key={3}
                      onClick={e => {
                        e.preventDefault();
                        if (confirm('技データを削除します。')) deleteMove();
                      }}
                    >
                      削除
                    </a>,
                  ]}
                />
              )}
            </div>
          )}
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

          {move.moveVideo ? (
            <VideoPlayer src={move.moveVideo.m3u8Url} thumnailUrl={move.moveVideo.thumbnailUrl} />
          ) : (
            currentPlayer && <VideoDropzone moveId={move.id} />
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
        {lastAction &&
          lastAction.frames &&
          lastAction.frames.map(frame => {
            return (
              <MoveDetail key={frame.id} label={FrameTypeText[frame.type]}>
                <OpponentDetail frame={frame.frame} state={frame.state} />
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

const OpponentDetail: React.FC<{ frame?: number | null; state?: FrameStateEnum | null }> = ({ frame, state }) => {
  let frameClass: string | undefined;
  if (frame && frame <= -10) frameClass = 'el_caution';

  return (
    <>
      {frame && <span className={frameClass}>{frameText(frame)}</span>}
      {state && FrameText[state]}
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
