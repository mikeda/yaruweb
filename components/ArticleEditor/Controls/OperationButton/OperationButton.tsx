import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSlate } from 'slate-react';

import { Button } from '../Button';
import { YAROUYO_FONT_CODE } from '@/lib/YarouyoFont';
import styles from './OperationButton.module.scss';

const OPERATIONS: (keyof typeof YAROUYO_FONT_CODE)[] = [
  'lever_7',
  'lever_8',
  'lever_9',
  'lever_4',
  'lever_N',
  'lever_6',
  'lever_1',
  'lever_2',
  'lever_3',
  'lever_7h',
  'lever_8h',
  'lever_9h',
  'lever_4h',
  'lever_6h',
  'lever_1h',
  'lever_2h',
  'lever_3h',
  'lp',
  'rp',
  'lk',
  'rk',
  'lp_lk',
  'rp_rk',
  'lp_rp',
  'lk_rk',
  'lp_rk',
  'rp_lk',
  'lp_rp_lk',
  'lp_rp_rk',
  'lp_lk_rk',
  'rp_lk_rk',
  'lp_rp_lk_rk',
];

interface Props {
  icon: number;
}

export const OperationButton: React.FC<Props> = ({ icon }) => {
  const [expanded, setExpanded] = useState(false);

  const editor = useSlate();
  return (
    <>
      <Button
        active={false}
        onMouseDown={event => {
          event.preventDefault();
          setExpanded(!expanded);
        }}
        icon={icon}
      />
      <Modal
        isOpen={expanded}
        onRequestClose={() => setExpanded(false)}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        {OPERATIONS.map(code => (
          <span
            key={code}
            className={styles.icon}
            onMouseDown={e => {
              e.preventDefault();
              editor.insertFragment([
                {
                  text: String.fromCharCode(YAROUYO_FONT_CODE[code]),
                  icon: true,
                },
              ]);
              editor.removeMark('icon');
            }}
            style={{ fontFamily: 'YarouyoSymbols' }}
          >
            {String.fromCharCode(YAROUYO_FONT_CODE[code])}
          </span>
        ))}
      </Modal>
    </>
  );
};
