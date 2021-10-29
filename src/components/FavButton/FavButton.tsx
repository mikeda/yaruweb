import React, { useState } from 'react';

import { useFavArticleMutation, useFavButtonArticleQuery, useUnfavArticleMutation } from '@/lib/graphql/types';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import { useCurrentUser } from '@/hooks/useCurrentUser';

type Props = {
  articleId: string;
  favsCount: number;
};

export const FavButton: React.FC<Props> = ({ articleId, ...props }) => {
  const { currentUser } = useCurrentUser();
  useFavButtonArticleQuery({
    variables: { articleId },
    skip: !currentUser,
    onCompleted: data => {
      setFaved(data.article.faved);
    },
  });
  const [faved, setFaved] = useState(false);
  const [favsCount, setFavedCount] = useState(props.favsCount);

  return faved ? (
    <FavedButton
      articleId={articleId}
      favsCount={favsCount}
      onUnfav={() => {
        // FIXME: 2回renderが走る
        setFaved(false);
        setFavedCount(prev => prev - 1);
      }}
    />
  ) : (
    <UnfavedButton
      articleId={articleId}
      favsCount={favsCount}
      onFav={() => {
        setFaved(true);
        setFavedCount(prev => prev + 1);
      }}
    />
  );
};

type UnfavedButtonProps = {
  articleId: string;
  favsCount: number;
  onFav: () => void;
};

const UnfavedButton: React.FC<UnfavedButtonProps> = ({ articleId, favsCount, onFav }) => {
  const { currentUser } = useCurrentUser();

  const [fav] = useFavArticleMutation({
    variables: { articleId },
    onCompleted: onFav,
  });

  const onClick = () => {
    if (currentUser) {
      fav();
    } else {
      alert('ログインが必要です。');
    }
  };

  return (
    <IconButton color="default" onClick={onClick} size="large">
      <Badge badgeContent={favsCount}>
        <FavoriteBorder />
      </Badge>
    </IconButton>
  );
};

type FavedButtonProps = {
  articleId: string;
  favsCount: number;
  onUnfav: () => void;
};

const FavedButton: React.FC<FavedButtonProps> = ({ articleId, favsCount, onUnfav }) => {
  const { currentUser } = useCurrentUser();

  const [unfav] = useUnfavArticleMutation({
    variables: { articleId },
    onCompleted: onUnfav,
  });

  const onClick = () => {
    if (currentUser) {
      unfav();
    } else {
      alert('ログインが必要です。');
    }
  };

  return (
    <IconButton color="primary" onClick={onClick} size="large">
      <Badge badgeContent={favsCount}>
        <Favorite />
      </Badge>
    </IconButton>
  );
};
