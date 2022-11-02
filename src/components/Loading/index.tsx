import React from 'react';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { loadingState } from '@/lib';

export const Loading: React.FC = () => {
  const loading = useRecoilValue(loadingState);
  if (!loading) return null;

  return (
    <Container>
      <Inner>
        <div />
        <div />
        <div />
      </Inner>
    </Container>
  );
};

const Container = styled('div')(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.3)',
  transition: '0.3s linear',
}));

const scale = keyframes`
  0%,
  80% {
    opacity: 1;
    transform: scale(1);
  }
  45% {
    opacity: 0.7;
    transform: scale(0.1);
  }
`;

const Inner = styled('div')`
  & > div {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin: 5px;
    background-color: #fff;
    border-radius: 100%;
    animation-fill-mode: both;
  }

  & > div:nth-of-type(1) {
    animation: ${scale} 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }

  & > div:nth-of-type(2) {
    animation: ${scale} 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }

  & > div:nth-of-type(3) {
    animation: ${scale} 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }
`;
