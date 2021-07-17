import React from 'react';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { CommentAttributes } from '@/lib/graphql/types';
import { Controller, useForm } from 'react-hook-form';
import { Avatar, Box, Button, TextField } from '@material-ui/core';

interface Props {
  onSubmit: (attributes: CommentAttributes) => void;
}

export const CommentForm: React.FC<Props> = ({ onSubmit }) => {
  const { currentUser } = useCurrentUser();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentAttributes>();

  if (!currentUser) return null;

  return (
    <form
      onSubmit={handleSubmit(attributes => {
        onSubmit(attributes);
        reset();
      })}
    >
      <Box display="flex" mb={2}>
        <Avatar src={currentUser.avatarUrl} />
        <Box ml={2} flexGrow={1}>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="コメント"
                multiline
                fullWidth
                rows={3}
                variant="outlined"
                error={Boolean(errors.message)}
                helperText={errors.message?.message}
                style={{ backgroundColor: 'white' }}
              />
            )}
          />
          <Box display="flex" justifyContent="flex-end" mt={1}>
            <Button type="submit" variant="contained">
              コメントする
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};
