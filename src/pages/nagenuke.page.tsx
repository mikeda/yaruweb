import React, { useRef, useState } from 'react';

import { Box, Button, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Head, Content } from '@/components';

type ThrowType = 'LP' | 'RP' | 'WP';
interface State {
  currentType: ThrowType;
  started: boolean;
  playing: boolean;
  successCount: number;
  totalCount: number;
}

const videos = {
  LP: 'https://d2ybk292wkc2jl.cloudfront.net/site/nagenuke/lp_test.mp4',
  RP: 'https://d2ybk292wkc2jl.cloudfront.net/site/nagenuke/rp_test.mp4',
  WP: 'https://d2ybk292wkc2jl.cloudfront.net/site/nagenuke/wp_test.mp4',
};

const pickType = () => ['LP', 'RP', 'WP'][Math.floor(Math.random() * 3)] as ThrowType;
const initState = () => ({
  currentType: pickType(),
  started: false,
  playing: false,
  successCount: 0,
  totalCount: 0,
});

const BlankVideo = styled('div')(() => ({
  backgroundColor: '#999',
  width: '100%',
  aspectRatio: '16 / 9',
}));

const Page: React.FC = () => {
  const [state, setState] = useState<State>(initState);

  const intervalRef = useRef<NodeJS.Timer>();
  // クリック時に再renderさせたくないのでRefにする
  const selectedTypeRef = useRef<ThrowType>();

  const clear = () => {
    if (!intervalRef.current) return;

    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
    setState(initState);
  };

  const videoEnd = () => {
    setState(prev => ({ ...prev, playing: false }));
  };

  const next = () => {
    setState(prev => ({
      ...prev,
      currentType: pickType(),
      playing: true,
      successCount: selectedTypeRef.current === prev.currentType ? prev.successCount + 1 : prev.successCount,
      totalCount: prev.totalCount + 1,
    }));
  };

  const start = () => {
    if (intervalRef.current) return;

    setState(prev => ({ ...prev, started: true, playing: true }));
    intervalRef.current = setInterval(next, 2500);
  };

  const selectLP = () => (selectedTypeRef.current = 'LP');
  const selectRP = () => (selectedTypeRef.current = 'RP');
  const selectWP = () => (selectedTypeRef.current = 'WP');

  return (
    <Content activeTab="top">
      <Head title="投げ抜け練習" description="鉄拳7の投げ抜け練習ツールです。" />

      <Stack spacing={2} alignItems="center">
        <BlankVideo>
          {state.started ? (
            state.playing && (
              <video src={videos[state.currentType]} autoPlay muted playsInline onEnded={videoEnd} width="100%" />
            )
          ) : (
            <img src="https://d2ybk292wkc2jl.cloudfront.net/site/nagenuke/thumb.jpg" width="100%" />
          )}
        </BlankVideo>

        <Stack direction="row" spacing={1}>
          <Button onClick={selectLP} size="large" variant="outlined">
            LP
          </Button>
          <Button onClick={selectRP} size="large" variant="outlined">
            RP
          </Button>
          <Button onClick={selectWP} size="large" variant="outlined">
            WP
          </Button>
        </Stack>

        <div>
          成功 {state.successCount}/{state.totalCount}
        </div>

        <Stack direction="row" spacing={1} justifyContent="center">
          {intervalRef.current ? (
            <Button onClick={clear} size="large">
              終了
            </Button>
          ) : (
            <Button onClick={start} size="large" variant="contained">
              開始
            </Button>
          )}
        </Stack>
      </Stack>

      <Stack spacing={2} pt={2}>
        <Typography variant="h2">モーション確認</Typography>

        <Box pt={1}>
          <Typography variant="h4">LP投げ</Typography>
          <video
            src="https://d2ybk292wkc2jl.cloudfront.net/site/nagenuke/lp_test.mp4"
            controls
            muted
            playsInline
            width="100%"
          />
        </Box>

        <Box pt={1}>
          <Typography variant="h4">RP投げ</Typography>
          <video
            src="https://d2ybk292wkc2jl.cloudfront.net/site/nagenuke/rp_test.mp4"
            controls
            muted
            playsInline
            width="100%"
          />
        </Box>

        <Box pt={1}>
          <Typography variant="h4">WP投げ</Typography>
          <video
            src="https://d2ybk292wkc2jl.cloudfront.net/site/nagenuke/wp_test.mp4"
            controls
            muted
            playsInline
            width="100%"
          />
        </Box>
      </Stack>
    </Content>
  );
};

export default Page;
