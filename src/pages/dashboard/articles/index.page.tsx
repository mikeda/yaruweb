import React, { useRef, useState } from 'react';

import { Add, MoreVert } from '@mui/icons-material';
import { Box, Button, IconButton, Menu, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { DashboardBreadcrumbs, DashboardContent, DashboardTable, DashboardTablePaging, SearchWord } from '@/components';
import { pagesPath } from '@/generated/$path';
import {
  ArticleStatus,
  DashboardArticlesPageArticleFragment,
  useDashboardArticlesPageQuery,
  useDashboardArticlesPageDeleteMutation,
  useDashboardArticlesPagePublishMutation,
  useDashboardArticlesPageStopMutation,
} from '@/generated/graphql';
import { loadingState, ArticleStatusText, resolveUrlObject, handleApolloError } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading, fetchMore, updateQuery, refetch } = useDashboardArticlesPageQuery({
    onCompleted: () => setLoading(false),
    onError: handleApolloError,
    notifyOnNetworkStatusChange: true,
  });
  const [publish, { loading: publishLoading }] = useDashboardArticlesPagePublishMutation({
    onCompleted: () => toast.success('記事を公開しました。'),
    onError: handleApolloError,
  });
  const [stop, { loading: stopLoading }] = useDashboardArticlesPageStopMutation({
    onCompleted: () => toast.success('公開を停止しました。'),
    onError: handleApolloError,
  });
  const [destroy, { loading: deleteLoading }] = useDashboardArticlesPageDeleteMutation({
    onCompleted: data => {
      const article = data.deleteArticle?.article;
      if (!article) return;

      updateQuery(prev => ({
        myArticles: {
          ...prev.myArticles,
          edges: prev.myArticles.edges.filter(e => e.node.id !== article.id),
        },
      }));
      toast.success('記事を削除しました。');
    },
    onError: handleApolloError,
  });
  const keywordRef = useRef<string>();

  setLoading(loading || publishLoading || stopLoading || deleteLoading);

  if (!data) return null;
  const articles = data.myArticles.edges.map(e => e.node);
  const pageInfo = data.myArticles.pageInfo;

  return (
    <DashboardContent
      title="記事一覧"
      breadcrumb={<DashboardBreadcrumbs to="articles" />}
      actions={
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          href={resolveUrlObject(router, pagesPath.dashboard.articles.new.$url())}
        >
          記事を書く
        </Button>
      }
    >
      <Box mb={2}>
        <SearchWord
          onSearch={word => {
            if (keywordRef.current === word) return;

            keywordRef.current = word;
            setLoading(true);
            refetch({ after: undefined, keyword: keywordRef.current });
          }}
        />
      </Box>

      <DashboardTable>
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
      </DashboardTable>

      {pageInfo.hasNextPage && (
        <DashboardTablePaging
          onClick={() => {
            fetchMore({ variables: { after: pageInfo.endCursor } });
          }}
        />
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
  const router = useRouter();

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Typography>{article.title}</Typography>
        <Typography variant="caption">{ArticleStatusText[article.status]}</Typography>
      </TableCell>
      <TableCell align="right" scope="row">
        <Button
          variant="outlined"
          href={resolveUrlObject(router, pagesPath.dashboard.articles._id(article.id).edit.$url())}
        >
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
      <IconButton edge="end" onClick={handleClick} size="large">
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
