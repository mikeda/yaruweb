import React, { useState } from 'react';

import {
  ArticleStatus,
  DashboardArticlesPageArticleFragment,
  useDashboardArticlesPageArticlesQuery,
  useDashboardArticlesPageDeleteMutation,
  useDashboardArticlesPagePublishMutation,
  useDashboardArticlesPageStopMutation,
} from '@/lib/graphql/types';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { toast } from 'react-toastify';
import { DashboardBreadcrumbs } from '@/components';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { dashboardPath } from '@/lib';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@material-ui/core';
import { ArticleStatusText } from '@/lib/graphql/enum_texts';
import { MoreVert } from '@material-ui/icons';

const Page: React.FC = () => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading, fetchMore, updateQuery } = useDashboardArticlesPageArticlesQuery();
  const [publish, { loading: publishLoading }] = useDashboardArticlesPagePublishMutation({
    onCompleted: () => {
      toast.success('記事を公開しました。');
    },
  });
  const [stop, { loading: stopLoading }] = useDashboardArticlesPageStopMutation({
    onCompleted: () => {
      toast.success('公開を停止しました。');
    },
  });
  const [destroy, { loading: deleteLoading }] = useDashboardArticlesPageDeleteMutation({
    onCompleted: data => {
      const article = data.deleteArticle?.article;
      if (!article) return;

      updateQuery(prev => ({
        myArticles: {
          ...prev.myArticles,
          records: prev.myArticles.records.filter(a => a.id !== article.id),
        },
      }));
      toast.success('記事を削除しました。');
    },
  });

  setLoading(loading || publishLoading || stopLoading || deleteLoading);

  if (!data) return null;
  const { records: articles, paging } = data.myArticles;

  return (
    <DashboardContent title="記事一覧" breadcrumb={<DashboardBreadcrumbs to="articles" />}>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {articles.map(article => (
              <ArticleRow
                key={article.id}
                article={article}
                onPublish={() => publish({ variables: { articleId: article.id } })}
                onStop={() => stop({ variables: { articleId: article.id } })}
                onDelete={() => {
                  if (window.confirm('削除します。')) {
                    destroy({ variables: { articleId: article.id } });
                  }
                }}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {paging?.hasNext && (
        <Box pt={2} pb={2} display="flex" justifyContent="center">
          <Button
            variant="outlined"
            onClick={() => {
              fetchMore({
                variables: { page: paging.currentPage + 1 },
                updateQuery: (prev, { fetchMoreResult: data }) => {
                  if (!data) return prev;

                  return {
                    myArticles: {
                      records: [...prev.myArticles.records, ...data.myArticles.records],
                      paging: data.myArticles.paging,
                    },
                  };
                },
              });
            }}
          >
            もっとみる
          </Button>
        </Box>
      )}
    </DashboardContent>
  );
};

interface ArticleRowprops {
  article: DashboardArticlesPageArticleFragment;
  onPublish: () => void;
  onStop: () => void;
  onDelete: () => void;
}

const ArticleRow = ({ article, onPublish, onStop, onDelete }: ArticleRowprops) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Typography>{article.title}</Typography>
        <Typography variant="caption">{ArticleStatusText[article.status]}</Typography>
      </TableCell>
      <TableCell align="right" scope="row">
        <Button variant="outlined" href={dashboardPath({ to: 'articleEdit', articleId: article.id })}>
          編集
        </Button>
        <ArticleMenu article={article} onPublish={onPublish} onStop={onStop} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};

const ArticleMenu = ({ article, onPublish, onStop, onDelete }: ArticleRowprops) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton edge="end" onClick={handleClick}>
        <MoreVert />
      </IconButton>

      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {article.status === ArticleStatus.Draft ? (
          <>
            <MenuItem
              onClick={() => {
                onPublish();
                handleClose();
              }}
            >
              公開する
            </MenuItem>
            <MenuItem
              onClick={() => {
                onDelete();
                handleClose();
              }}
            >
              削除する
            </MenuItem>
          </>
        ) : (
          <MenuItem
            onClick={() => {
              onStop();
              handleClose();
            }}
          >
            下書きに戻す
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Page;
