import React from 'react';

import styles from './CommentForm.module.scss';
import { CommentWrapper } from '../Comment';
import { useCurrentPlayer } from 'hooks/useCurrentPlayer';
import { CommentAttributes } from '@/lib/graphql/types';
import { useForm } from 'react-hook-form';
import { TextArea } from '../form/TextArea';

interface Props {
  onSubmit: (attributes: CommentAttributes) => void;
}

export const CommentForm: React.FC<Props> = ({ onSubmit }) => {
  const { currentPlayer } = useCurrentPlayer();
  const { register, reset, handleSubmit } = useForm<CommentAttributes>();

  if (!currentPlayer) return null;

  return (
    <CommentWrapper player={currentPlayer}>
      <form
        onSubmit={handleSubmit(attributes => {
          onSubmit(attributes);
          reset();
        })}
        className={styles.container}
      >
        <TextArea
          rows={4}
          placeholder="メッセージを入力"
          style={{ width: '100%' }}
          {...register('message', { required: true })}
        />

        <div className={styles.footer}>
          <button type="submit" className="el_btn">
            コメントする
          </button>
        </div>
      </form>
    </CommentWrapper>
  );
};
