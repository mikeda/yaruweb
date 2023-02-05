import React, { useState } from 'react';

import { MoreVert } from '@mui/icons-material';
import { Button, IconButton, Menu, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import { pagesPath } from '@/generated/$path';
import {
  ArticleStatus,
  ArticleTableRowFragment,
  useDeleteArticleMutation,
  usePublishArticleMutation,
  useStopArticleMutation,
} from '@/generated/graphql';
import { resolveUrlObject, ArticleStatusText, handleApolloError, loadingState, deleteCache } from '@/lib';

interface Props {
  article: ArticleTableRowFragment;
}

export const ArticleTableRow: React.FC<Props> = ({ article }) => {
  const router = useRouter();

  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        <Typography>{article.title}</Typography>
        <Typography variant='caption'>{ArticleStatusText[article.status]}</Typography>
      </TableCell>
      <TableCell align='right' scope='row'>
        <Button
          variant='outlined'
          href={resolveUrlObject(router, pagesPath.dashboard.articles._id(article.id).edit.$url())}
        >
          編集
        </Button>
        <ArticleMenu article={article} />
      </TableCell>
    </TableRow>
  );
};

const ArticleMenu: React.FC<Props> = ({ article }) => {
  const setLoading = useSetRecoilState(loadingState);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [publish, { loading: publishLoading }] = usePublishArticleMutation({
    variables: { articleId: article.id },
    onCompleted: handleClose,
    onError: handleApolloError,
  });
  const [stop, { loading: stopLoading }] = useStopArticleMutation({
    variables: { articleId: article.id },
    onCompleted: handleClose,
    onError: handleApolloError,
  });
  const [del, { loading: deleteLoading }] = useDeleteArticleMutation({
    variables: { articleId: article.id },
    onError: handleApolloError,
    onCompleted: handleClose,
    update(cache) {
      deleteCache({ cache, id: article.id, __typename: 'Article' });
    },
  });

  setLoading(publishLoading || stopLoading || deleteLoading);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton edge='end' onClick={handleClick} size='large'>
        <MoreVert />
      </IconButton>

      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {article.status === ArticleStatus.Draft ? (
          <>
            <MenuItem onClick={() => publish()}>公開する</MenuItem>
            <MenuItem onClick={() => del()}>削除する</MenuItem>
          </>
        ) : (
          <MenuItem onClick={() => stop()}>下書きに戻す</MenuItem>
        )}
      </Menu>
    </>
  );
};
