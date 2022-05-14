import React, { useRef, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Descendant } from 'slate';
import { ReactEditor, Slate } from 'slate-react';
import * as yup from 'yup';

import { ArticleEditor, createArticleEditor } from '@/components';
import { ArticleAttributes, ArticleCategory, ArticleFormArticleFragment } from '@/generated/graphql';
import { ArticleCategoryText } from '@/lib';

const schema = yup.object().shape({
  title: yup.string().required(),
});

interface Props {
  article?: ArticleFormArticleFragment;
  onSubmit: (attributes: ArticleAttributes) => void;
}

export const ArticleForm: React.FC<Props> = ({ article, onSubmit }) => {
  const editorRef = useRef<ReactEditor>();
  if (!editorRef.current) editorRef.current = createArticleEditor();
  const editor = editorRef.current;

  const [slateValue, setSlateValue] = useState<Descendant[]>(
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
    handleSubmit,
    control,
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
    <Card>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <CardContent>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="タイトル"
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
                fullWidth
              />
            )}
          />

          <Box mt={4}>
            <FormControl variant="outlined">
              <InputLabel>カテゴリー</InputLabel>
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    onChange={e => {
                      const category = e.target.value as ArticleCategory;
                      setValue('category', category);
                    }}
                  >
                    {Object.entries(ArticleCategoryText).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                control={control}
                name="category"
              />
            </FormControl>
          </Box>

          <Box mt={4}>
            <Button component="label" color="primary" variant="outlined">
              メイン画像を選択
              <input
                type="file"
                accept="image/*"
                hidden
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
            </Button>
          </Box>

          <Box mt={4}>
            <Slate editor={editor} value={slateValue} onChange={newValue => setSlateValue(newValue)}>
              <ArticleEditor />
            </Slate>
          </Box>
        </CardContent>

        <Divider />

        <Box m={2} display="flex" justifyContent="center">
          <Button type="submit" variant="contained">
            登録する
          </Button>
        </Box>
      </form>
    </Card>
  );
};
