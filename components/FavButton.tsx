import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as unfilledHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';

import { useFavArticleMutation, useUnfavArticleMutation } from '@/lib/graphql/types';

type Props = {
  articleId: string;
  faved: boolean;
  favsCount: number;
};

export const FavButton: React.FC<Props> = ({ articleId, ...props }) => {
  const [faved, setFaved] = useState(props.faved);
  const [favsCount, setFavedCount] = useState(props.favsCount);

  const [fav] = useFavArticleMutation({
    onCompleted: () => {
      setFaved(true);
      setFavedCount(prev => prev + 1);
    },
  });

  const [unfav] = useUnfavArticleMutation({
    onCompleted: () => {
      setFaved(false);
      setFavedCount(prev => prev - 1);
    },
  });

  return (
    <div className="bl_favBtn">
      {faved ? (
        <div onClick={() => unfav({ variables: { articleId } })} className="el_iconBtn">
          <FontAwesomeIcon icon={filledHeart} />
          <span>{favsCount}</span>
        </div>
      ) : (
        <div onClick={() => fav({ variables: { articleId } })} className="el_iconBtn">
          <FontAwesomeIcon icon={unfilledHeart} />
          <span>{favsCount}</span>
        </div>
      )}
    </div>
  );
};
