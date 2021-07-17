import React from 'react';
import dayjs from '@/lib/dayjs';

import {
  ArticleCommentCardFragment,
  MoveCommentCardFragment,
  TournamentVideoCommentCardFragment,
} from '@/lib/graphql/types';
import { Avatar, Box, Paper, Typography } from '@material-ui/core';

export type CommentFragment = ArticleCommentCardFragment | MoveCommentCardFragment | TournamentVideoCommentCardFragment;

interface Props {
  comment: CommentFragment;
}

export const Comment: React.FC<Props> = ({ comment: { message, createdAt, user } }) => {
  return (
    <Box display="flex">
      <Avatar src={user.avatarUrl} />
      <Box ml={2} flexGrow={1}>
        <Paper>
          <Box p={2}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2">{user.name}</Typography>
              <Typography variant="caption">{dayjs(createdAt).format('YYYY/M/D  H:mm')}</Typography>
            </Box>
            <Typography variant="body2">{message}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
