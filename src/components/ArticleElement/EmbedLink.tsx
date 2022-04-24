/** @jsxImportSource @emotion/react */
import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { css } from '@emotion/react';

interface Props {
  url: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  attributes: { [key: string]: unknown };
  children: React.ReactNode;
}

const rootStyle = css({
  display: 'flex',
});

const contentStyle = css({ flex: 1 });

const mediaStyle = css({
  height: 160,
  width: 200,
  '@media(max-width: 480px)': {
    height: 140,
    width: 120,
  },
});

const textStyle = css({
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const EmbedLink: React.FC<Props> = ({ url, title, description, imageUrl, attributes, children }) => {
  const hostname = new URL(url).hostname;

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <Card>
          <CardActionArea href={url} css={rootStyle}>
            <CardContent css={contentStyle}>
              <Typography gutterBottom variant="h6" css={textStyle}>
                {title}
              </Typography>
              <Typography variant="caption" css={textStyle}>
                {description}
              </Typography>
              <Typography variant="caption">{hostname}</Typography>
            </CardContent>

            {imageUrl && <CardMedia image={imageUrl} css={mediaStyle} />}
          </CardActionArea>
        </Card>
      </div>
      {children}
    </div>
  );
};
