import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { CharacterAttributes, CharacterFormFragment } from '@/lib/graphql/types';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
} from '@mui/material';

const schema = yup.object().shape({
  name: yup.string().required(),
  nameKana: yup.string().required(),
  longName: yup.string().required(),
  longNameKana: yup.string().required(),
  slug: yup
    .string()
    .required()
    .min(3)
    .max(16)
    .matches(/^[a-z][a-z0-9_]*$/, { message: '半角英数字とアンダースコアのみ使用可能です。' }),
  country: yup.string().required(),
  fightingStyle: yup.string().required(),
  story: yup.string().required(),
  description: yup.string().required(),
});

interface Props {
  character?: CharacterFormFragment;
  onSubmit: (attributes: CharacterAttributes) => void;
}

export const CharacterForm: React.FC<Props> = ({ character, onSubmit }) => {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CharacterAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: character && {
      name: character.name,
      nameKana: character.nameKana,
      longName: character.longName,
      longNameKana: character.longNameKana,
      slug: character.slug,
      country: character.country,
      fightingStyle: character.fightingStyle,
      story: character.story,
      description: character.description,
      dlc: character.dlc,
    },
  });

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="名前"
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="nameKana"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="カナ"
                    error={Boolean(errors.nameKana)}
                    helperText={errors.nameKana?.message}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="longName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="正式名称"
                    error={Boolean(errors.longName)}
                    helperText={errors.longName?.message}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="longNameKana"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="正式名称(カナ)"
                    error={Boolean(errors.longNameKana)}
                    helperText={errors.longNameKana?.message}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="slug"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="ID(URLで使う名前)"
                    error={Boolean(errors.slug)}
                    helperText={errors.slug?.message}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="国籍"
                    error={Boolean(errors.country)}
                    helperText={errors.country?.message}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="fightingStyle"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="格闘スタイル"
                    error={Boolean(errors.fightingStyle)}
                    helperText={errors.fightingStyle?.message}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box mt={4}>
            <Controller
              name="story"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="公式ストーリー"
                  error={Boolean(errors.story)}
                  helperText={errors.story?.message}
                  size="small"
                  multiline
                  fullWidth
                />
              )}
            />
          </Box>

          <Box mt={4}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="キャラ解説"
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                  size="small"
                  multiline
                  fullWidth
                />
              )}
            />
          </Box>

          <Stack direction="row" spacing={2} mt={4}>
            <Button component="label" color="primary" variant="outlined">
              顔画像を選択
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

                    setValue('faceImage', e.target.result as string);
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </Button>

            <Button component="label" color="primary" variant="outlined">
              全体画像を選択
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
          </Stack>

          <Box mt={4}>
            <FormControlLabel
              control={
                <Controller
                  name="dlc"
                  render={({ field }) => <Checkbox {...field} checked={field.value} />}
                  control={control}
                />
              }
              label="DLC"
            />
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
