import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { HighlightFragment, useCreateHighlightMutation, useDeleteHighlightMutation } from '@/lib/graphql/types';

import styles from './VideoHighlights.module.scss';
import { CurrentPlayerContext } from '@/lib/contexts/CurrentPlayerContext';
import { FormGroup } from './form/FormGroup';

const modalStyle = {
  content: {
    top: '20px',
    right: 'auto',
    bottom: 'auto',
    left: '50%',
    width: '80%',
    maxWidth: '350px',
    marginRight: '-50%',
    transform: 'translateX(-50%)',
  },
};

interface Props {
  videoId: string;
  highlights: HighlightFragment[];
  onSelect: (startSec: number) => void;
}

export const VideoHighlights: React.FC<Props> = ({ videoId, highlights: initialHighlights, onSelect }) => {
  const { currentPlayer } = useContext(CurrentPlayerContext);
  const [highlights, setHighlights] = useState<HighlightFragment[]>(initialHighlights);
  const [modalOpened, setModalOpened] = useState(false);
  const [createHightlight] = useCreateHighlightMutation({
    onCompleted: data => {
      const highlight = data.createHighlight?.highlight;
      if (!highlight) return;

      setHighlights(prev => [...prev, highlight]);
      setModalOpened(false);
    },
    onError: e => {
      alert(e.message);
    },
  });
  const [deleteHightlight] = useDeleteHighlightMutation({
    onCompleted: data => {
      const highlight = data.deleteHighlight?.highlight;
      if (!highlight) return;

      setHighlights(prev => prev.filter(h => h.id !== highlight.id));
      setModalOpened(false);
    },
    onError: e => {
      alert(e.message);
    },
  });

  return (
    <>
      <ol>
        {highlights.map(highlight => (
          <li key={highlight.id} className={styles.highlight}>
            <a
              className={styles.startSec}
              onClick={() => {
                onSelect(highlight.startSec);
              }}
            >
              {formatSec(highlight.startSec)}
            </a>
            <span className={styles.title}>{highlight.title}</span>
            <span className={styles.playerName}>{highlight.player.name}</span>
            {currentPlayer?.slug === highlight.player.slug && (
              <a
                onClick={() => {
                  deleteHightlight({ variables: { highlightId: highlight.id } });
                }}
              >
                削除
              </a>
            )}
          </li>
        ))}
      </ol>

      <a onClick={() => setModalOpened(true)}>ハイライトを追加</a>
      <Modal isOpen={modalOpened} onRequestClose={() => setModalOpened(false)} style={modalStyle}>
        <Formik
          initialValues={{ title: '', startSec: '00:00:00' }}
          validationSchema={Yup.object({
            title: Yup.string().required('イベント名を入力して下さい。'),
            startSec: Yup.string().required('開始時間を入力して下さい。'),
          })}
          onSubmit={attributes => {
            const startSec = parseTime(attributes.startSec);
            if (!startSec) return;

            createHightlight({
              variables: {
                videoId,
                attributes: {
                  title: attributes.title,
                  startSec,
                },
              },
            });
          }}
        >
          {({ isValid, dirty }) => {
            return (
              <Form>
                <FormGroup name="startSec" placeholder="時間" type="text" />
                <FormGroup name="title" placeholder="タイトル" type="text" />
                <div className="el_form_group">
                  <button type="submit" disabled={!dirty || !isValid} className="el_btn">
                    登録する
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

const formatSec = (seconds: number) => {
  const times: number[] = [];

  times.push(Math.floor(seconds / 3600));
  times.push(Math.floor((seconds % 3600) / 60));
  times.push(seconds % 60);

  return times.map(t => (t < 10 ? `0${t}` : t.toString())).join(':');
};

const parseTime = (time: string) => {
  const times = time.split(':');
  if (times.length < 1 || times.length > 3) return;

  const nums = times.map(t => Number(t));
  switch (nums.length) {
    case 1:
      return nums[0];
    case 2:
      return nums[0] * 60 + nums[1];
    case 3:
      return nums[0] * 3600 + nums[1] * 60 + nums[2];
  }
};
