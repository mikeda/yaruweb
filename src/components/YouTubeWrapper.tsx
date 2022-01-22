import { styled } from '@mui/material/styles';

export const YouTubeWrapper = styled('div')(() => ({
  position: 'relative',
  height: 0,
  paddingBottom: '56.25%' /*アスペクト比 16:9の場合の縦幅*/,
  overflow: 'hidden',
  '& iframe': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));
