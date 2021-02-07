import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';

import { VideoSummaryFragment } from '@/lib/graphql/types';
import { Routes } from '@/lib/Routes';
import { Card } from './Card';

type Props = {
  video: VideoSummaryFragment;
};

export const VideoCard: React.FC<Props> = ({ video }) => {
  return (
    <Card title={video.title} imageUrl={video.thumbnailUrl} href={Routes.video(video.id)}>
      <div className="bl_action bl_action_fav">
        <FontAwesomeIcon icon={faHeart} />
        {video.favsCount}
      </div>

      <div className="bl_action bl_action_comment">
        <FontAwesomeIcon icon={faComment} />
        {video.commentCount}
      </div>
    </Card>
  );
};
