import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import EditorJS from '@editorjs/editorjs';

import { editorTools } from '@/lib/editor';
import { ArticleCategoryText } from '@/lib/graphql/enum_texts';
import { ArticleAttributes, ArticleCategory } from '@/lib/graphql/types';
import { FormGroup } from './form/FormGroup';

interface Props {
  initialAttributes?: ArticleAttributes;
  onSubmit: (attributes: ArticleAttributes) => void;
  loading: boolean;
}

const ArticleForm: React.FC<Props> = ({
  initialAttributes = { title: '', body: '', category: ArticleCategory.Blog },
  onSubmit,
  loading,
}) => {
  if (!window) return <p>ブラウザではありません。</p>;

  let editor: EditorJS | null = null;

  useEffect(() => {
    if (!window) return;

    editor = new EditorJS({
      placeholder: '本文',
      data: initialAttributes.body ? JSON.parse(initialAttributes.body) : {},
      tools: editorTools,
      minHeight: 100,
    });
  }, [window]);

  return (
    <Formik<ArticleAttributes>
      initialValues={initialAttributes}
      validationSchema={Yup.object({
        title: Yup.string().required('タイトルを入力して下さい。'),
      })}
      onSubmit={({ title, category, mainImage }) => {
        if (!editor) return;

        editor.save().then(savedData => {
          const jsonBody = JSON.stringify({
            time: savedData.time,
            blocks: savedData.blocks.map(b => ({ type: b.type, data: b.data })),
            version: savedData.version,
          });
          onSubmit({
            title,
            category,
            mainImage,
            body: jsonBody,
          });
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
              <div id="editorjs"></div>
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
