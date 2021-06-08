import React, { useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ArticleCategoryText } from '@/lib/graphql/enum_texts';
import { ArticleAttributes, ArticleFragment } from '@/lib/graphql/types';
import { ReactEditor, Slate } from 'slate-react';
import { ArticleEditor, createArticleEditor } from './ArticleEditor';
import { Node } from 'slate';
import { useForm } from 'react-hook-form';
import { FormGroup } from './form/FormGroup';
import { Input } from './form/Input';
import { Button } from './blocks/Button';

const schema = yup.object().shape({
  title: yup.string().required(),
});

interface Props {
  article?: ArticleFragment;
  onSubmit: (attributes: ArticleAttributes) => void;
}

const ArticleForm: React.FC<Props> = ({ article, onSubmit }) => {
  const editorRef = useRef<ReactEditor>();
  if (!editorRef.current) editorRef.current = createArticleEditor();
  const editor = editorRef.current;

  const [slateValue, setSlateValue] = useState<Node[]>(
    article?.content
      ? JSON.parse(article.content)
      : [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ],
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ArticleAttributes>({
    resolver: yupResolver(schema),
    defaultValues: article && {
      title: article.title,
      category: article.category,
    },
  });

  const onFormSubmit = (attributes: ArticleAttributes) => {
    onSubmit({ ...attributes, content: JSON.stringify(slateValue) });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <FormGroup label="タイトル" required>
        <Input {...register('title')} />
        {errors.title && <span>This field is required</span>}
      </FormGroup>

      <FormGroup label="カテゴリ" required>
        <select {...register('category')}>
          {Object.entries(ArticleCategoryText).map(([key, value]) => (
            <option value={key} key={key}>
              {value}
            </option>
          ))}
        </select>
      </FormGroup>

      <FormGroup label="メイン画像">
        <input
          type="file"
          accept="image/*"
          name="mainImageDummy"
          onChange={e => {
            if (!e.target.files) return;
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = e => {
              if (!e.target) return;

              setValue('mainImage', e.target.result as string);
            };
            reader.readAsDataURL(file);
          }}
        />
        <input type="hidden" name="mainImage" />
      </FormGroup>

      <FormGroup label="本文">
        <Slate editor={editor} value={slateValue} onChange={newValue => setSlateValue(newValue)}>
          <ArticleEditor />
        </Slate>
      </FormGroup>

      <FormGroup>
        <Button>
          <input type="submit" />
        </Button>
      </FormGroup>
    </form>
  );
};

export default ArticleForm;
