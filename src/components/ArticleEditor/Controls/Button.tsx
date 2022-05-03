import React from 'react';
import { styled } from '@mui/material/styles';

interface Props {
  active: boolean;
  onMouseDown: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  icon: number;
}

export const Button: React.FC<Props> = ({ active, onMouseDown, icon }) => {
  return (
    <Container active={active} onMouseDown={onMouseDown}>
      {String.fromCharCode(icon)}
    </Container>
  );
};

interface ContainerProps {
  active: boolean;
}

const Container = styled('span')<ContainerProps>(({ active }) => ({
  fontFamily: 'YarouyoSymbols',
  fontSize: '1.5rem',
  color: active ? 'red' : '#aaa',
  cursor: 'pointer',
}));
