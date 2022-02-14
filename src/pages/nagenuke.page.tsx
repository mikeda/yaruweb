import React, { useEffect, useRef, useState } from 'react';
import { Head, Content } from '@/components';
import { Button, Stack } from '@mui/material';

type ThrowType = 'LP' | 'RP' | 'WP';
interface State {
  type: ThrowType;
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
  //const gif = new Image();
  //gif.src = '/nagenuke/twitter-button.gif';
  const [state, setState] = useState<State>({
    type: 'LP',
    videoEnded: false,
    selected: null,
    success: 0,
    total: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => ({
        type: ['LP', 'RP', 'WP'][Math.floor(Math.random() * 3)] as ThrowType,
        videoEnded: false,
        selected: null,
        success: prev.selected === prev.type ? prev.success + 1 : prev.success,
        total: prev.total + 1,
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const check = (selected: ThrowType) => {
    //setState(prev => ({
    //  type: ['LP', 'RP', 'WP'][Math.floor(Math.random() * 3)] as ThrowType,
    //  success: selected === prev.type ? prev.success + 1 : prev.success,
    //  total: prev.total + 1,
    //}));
  };

  const selectLP = () => setState(prev => ({ ...prev, selected: 'LP' }));
  const selectRP = () => setState(prev => ({ ...prev, selected: 'RP' }));
  const selectWP = () => setState(prev => ({ ...prev, selected: 'WP' }));

  return (
    <Content activeTab="top">
      <Head title="鉄拳やろうよ.com" description="鉄拳やろうよ.comは格闘ゲーム「鉄拳7」を楽しむためのサイトです。" />

      <div style={{ height: 270 }}>
        {!state.videoEnded && (
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

      <div>{state.type}</div>
      <div>成功 : {state.success}</div>
      <div>失敗 : {state.total - state.success}</div>
      <Button>Start</Button>

      <Stack direction="row">
        <Button onClick={selectLP}>LP</Button>
        <Button onClick={selectRP}>RP</Button>
        <Button onClick={selectWP}>WP</Button>
      </Stack>
    </Content>
  );
};

export default Page;
