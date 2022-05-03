import React from 'react';
import { useSlate } from 'slate-react';
import { Transforms } from 'slate';
import { Button } from './Button';
import { useCreateArticleImageMutation } from '@/lib/$types';
import { YAROUYO_FONT_CODE } from '@/lib/YarouyoFont';
import { ImageElement } from '@/custom-types';
import { HiddenInput } from './HiddenInput';

export const ImageButton: React.FC = () => {
  const editor = useSlate();
  const [createArticleImage] = useCreateArticleImageMutation({
    onCompleted: e => {
      const url = e.createArticleImage?.url;
      if (!url) return;

      const text = { text: '' };
      const image: ImageElement = { type: 'image', url, children: [text] };
      Transforms.insertNodes(editor, image);
      Transforms.insertNodes(editor, { type: 'paragraph', children: [{ text: '' }] });
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

      <HiddenInput
        type="file"
        id="image"
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
