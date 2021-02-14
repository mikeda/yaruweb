import React, { useMemo, useState } from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { ArticleCategoryText } from '@/lib/graphql/enum_texts';
import { ArticleAttributes, ArticleCategory } from '@/lib/graphql/types';
import { FormGroup } from './form/FormGroup';
import { Slate } from 'slate-react';
import { ArticleEditor, createArticleEditor } from './ArticleEditor';
import { Node } from 'slate';

interface Props {
  initialAttributes?: ArticleAttributes;
  onSubmit: (attributes: ArticleAttributes) => void;
  loading: boolean;
}

const ArticleForm: React.FC<Props> = ({
  initialAttributes = { title: '', content: '', category: ArticleCategory.Blog },
  onSubmit,
  loading,
}) => {
  const editor = useMemo(() => createArticleEditor(), []);
  const [value, setValue] = useState<Node[]>(
    initialAttributes.content
      ? JSON.parse(initialAttributes.content)
      : [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ],
  );

  return (
    <Formik<ArticleAttributes>
      initialValues={initialAttributes}
      validationSchema={Yup.object({
        title: Yup.string().required('タイトルを入力して下さい。'),
      })}
      onSubmit={({ title, category, mainImage }) => {
        if (!editor) return;

        onSubmit({
          title,
          category,
          mainImage,
          content: JSON.stringify(value),
        });
      }}
    >
      {({ isValid, setFieldValue }) => {
        return (
          <Form>
            <FormGroup name="title" placeholder="タイトル" type="text" />

            <Field name="category" as="select" className="el_form_input">
              {Object.entries(ArticleCategoryText).map(([key, value]) => (
                <option value={key} key={key}>
                  {value}
                </option>
              ))}
            </Field>

            <div className="el_form_group">
              <label className="el_form_label">メイン画像</label>
              <Field
                type="file"
                accept="image/*"
                name="mainImageDummy"
                onChange={(e: Event) => {
                  const target = e.target as HTMLInputElement;
                  if (!target.files) return;
                  const file = target.files[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onload = e => {
                    if (!e.target) return;

                    setFieldValue('mainImage', e.target.result);
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <Field type="hidden" name="mainImage" />
            </div>

            <div className="bl_box">
              <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
                <ArticleEditor />
                <pre>
                  <code>{JSON.stringify(value, null, 4)}</code>
                </pre>
              </Slate>
            </div>

            <div className="el_form_group">
              <button type="submit" disabled={loading || !isValid} className="el_btn">
                登録する
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ArticleForm;
