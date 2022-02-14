import React, { useCallback, useRef, useState } from 'react';
import { Head, Content } from '@/components';
import { Button, Stack } from '@mui/material';

type ThrowType = 'LP' | 'RP' | 'WP';
interface State {
  type?: ThrowType;
  videoEnded: boolean;
  selected: ThrowType | null;
  success: number;
  total: number;
}

const videos = {
  LP: 'https://d2ybk292wkc2jl.cloudfront.net/site/nagenuke/lp_test.mp4',
  RP: 'https://d2ybk292wkc2jl.cloudfront.net/site/nagenuke/rp_test.mp4',
  WP: 'https://d2ybk292wkc2jl.cloudfront.net/site/nagenuke/wp_test.mp4',
};

const Page: React.FC = () => {
  const [state, setState] = useState<State>({
    videoEnded: false,
    selected: null,
    success: 0,
    total: 0,
  });

  const intervalRef = useRef<NodeJS.Timer>();
  const start = useCallback(() => {
    if (intervalRef.current) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setState(prev => ({
        type: ['LP', 'RP', 'WP'][Math.floor(Math.random() * 3)] as ThrowType,
        videoEnded: false,
        selected: null,
        success: prev.selected === prev.type ? prev.success + 1 : prev.success,
        total: prev.total + 1,
      }));
    }, 2500);
  }, []);

  const stop = useCallback(() => {
    if (!intervalRef.current) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  }, []);

  const selectLP = () => setState(prev => ({ ...prev, selected: 'LP' }));
  const selectRP = () => setState(prev => ({ ...prev, selected: 'RP' }));
  const selectWP = () => setState(prev => ({ ...prev, selected: 'WP' }));

  return (
    <Content activeTab="top">
      <Head title="投げ抜け練習" description="鉄拳7の投げ抜け練習ツールです。" />

      <div style={{ height: 270 }}>
        {state.type && !state.videoEnded && (
          <video
            src={videos[state.type]}
            autoPlay
            muted
            playsInline
            onEnded={() => {
              setState(prev => ({ ...prev, videoEnded: true }));
            }}
          />
        )}
      </div>

      <div>成功 : {state.success}</div>
      <div>失敗 : {state.total - state.success}</div>

      {intervalRef.current ? <Button onClick={stop}>Stop</Button> : <Button onClick={start}>Start</Button>}

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
    </Content>
  );
};

export default Page;
