import React, { useState } from 'react';
import { AttackTypeEnumText, ThrowTypeEnumText } from '@/lib/graphql/enum_texts';
import {
  ActionFragment,
  FrameAttributes,
  FrameStateEnum,
  FrameTypeEnum,
  useCreateFrameMutation,
} from '@/lib/graphql/types';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';

import styles from './Action.module.scss';
import { Frames } from './Frames';

const actionTypeText = (action: ActionFragment) => {
  switch (action.__typename) {
    case 'AttackAction':
      return AttackTypeEnumText[action.attackType];
    case 'ThrowAction':
      return ThrowTypeEnumText[action.throwType];
    default:
      return '';
  }
};

interface Props {
  action: ActionFragment;
  onCreateFrame: () => void;
}

export const Action: React.FC<Props> = ({ action, onCreateFrame }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit } = useForm<FrameAttributes>();
  const [createAttackAction, { loading }] = useCreateFrameMutation({
    onCompleted: data => {
      const frame = data.createFrame?.frame;
      if (!frame) return;

      setModalOpen(false);
      onCreateFrame();
    },
    onError: e => {
      alert(e.message);
    },
  });
  const onSubmit = (attributes: FrameAttributes) => {
    createAttackAction({ variables: { actionId: action.id, attributes } });
  };

  return (
    <>
      <div key={action.id} className={styles.action}>
        <span key={action.id}>{actionTypeText(action)}</span>/<span>ダメージ:{action.damage}</span>
        {action.frames.length > 0 && <Frames frames={action.frames} />}
        <button
          onClick={() => {
            setModalOpen(true);
          }}
        >
          フレームデータを追加
        </button>
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <select name="type" ref={register({ required: true })}>
            {Object.entries(FrameTypeEnum).map(([key, value]) => (
              <option value={value} key={key}>
                {value}
              </option>
            ))}
          </select>

          <select name="state" ref={register({ required: true })}>
            {Object.entries(FrameStateEnum).map(([key, value]) => (
              <option value={value} key={key}>
                {value}
              </option>
            ))}
          </select>

          <input name="frame" type="number" ref={register({ valueAsNumber: true })} />

          <input type="submit" disabled={loading} />
        </form>
      </Modal>
    </>
  );
};
