import React from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
  children: React.ReactNode;
  imageUrl: string;
}

export const IntroSlide: React.FC<Props> = ({ imageUrl, children }) => {
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div>
      <Inner isPc={isPc}>
        <Image isPc={isPc}>
          <img src={imageUrl} />
        </Image>
        <Content>{children}</Content>
      </Inner>
    </div>
  );
};

interface ResponsiveProps {
  isPc: boolean;
}

const Inner = styled('div')<ResponsiveProps>(({ isPc }) => ({
  display: isPc ? 'flex' : 'block',
  justifyContent: 'stretch',
}));

const Image = styled('div')<ResponsiveProps>(({ isPc }) => ({
  width: isPc ? '50%' : '100%',
  '& > img': {
    width: '100%',
  },
}));

const Content = styled('div')(() => ({
  boxSizing: 'border-box',
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '96px',
  padding: '16px',
  lineHeight: 2,
  textAlign: 'center',
  border: '1px solid #ddd',
}));
