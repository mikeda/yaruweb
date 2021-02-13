import React from 'react';
import { useSlate } from 'slate-react';

import { Button } from './Button';
import styles from './ImageButton.module.scss';
import { useCreateArticleImageMutation } from '@/lib/graphql/types';
import { YAROUYO_FONT_CODE } from '@/lib/YarouyoFont';

export const ImageButton: React.FC = () => {
  const editor = useSlate();
  const [createArticleImage] = useCreateArticleImageMutation({
    onCompleted: e => {
      const url = e.createArticleImage?.url;
      if (!url) return;

      editor.insertNode({ type: 'image', url: url, children: [{ text: '' }] });
    },
    onError: e => {
      alert(e.message);
    },
  });

  return (
    <>
      <label htmlFor="image">
        <Button
          active={false}
          onMouseDown={event => {
            event.preventDefault();
          }}
          icon={YAROUYO_FONT_CODE.image}
        />
      </label>
      <input
        type="file"
        id="image"
        className={styles.input}
        accept="image/*"
        onChange={event => {
          const target = event.target;
          if (!target.files) return;
          const file = target.files[0];
          if (!file) return;

          const reader = new FileReader();

          reader.onload = e => {
            if (!e.target) return;

            createArticleImage({ variables: { image: e.target.result as string } });
          };

          reader.readAsDataURL(file);
        }}
      />
    </>
  );
};
