import * as React from 'react';

import { default as NextHead } from 'next/head';

interface Props {
  title: string;
  description?: string;
  image?: string | null;
  withoutSiteName?: boolean;
}

export const Head: React.FC<Props> = ({ title, description, image, withoutSiteName }) => {
  if (!withoutSiteName) title = `${title} | 鉄拳やろうよ.com`;
  image ||= 'https://d2ybk292wkc2jl.cloudfront.net/site/introduction/characters.jpg';

  return (
    <NextHead>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='blog' />
      <meta property='og:image' content={image} />
      <meta property='og:site_name' content={title} />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:site' content='@tekken_yarouyo' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
      <link rel='shortcut icon' href={`${process.env.NEXT_PUBLIC_SERVICE_URL}/favicon.ico`} />
      <link rel='apple-touch-icon' href={`${process.env.NEXT_PUBLIC_SERVICE_URL}/apple-touch-icon.png`} />
    </NextHead>
  );
};
