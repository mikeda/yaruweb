import React from 'react';
import { styled } from '@mui/material/styles';

interface Props {
  active: boolean;
  onMouseDown: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  text: string;
}

export const TextButton: React.FC<Props> = ({ active, onMouseDown, text }) => {
  return (
    <Container active={active} onMouseDown={onMouseDown}>
      {text}
    </Container>
  );
};

interface ContainerProps {
  active: boolean;
}

const Container = styled('span')<ContainerProps>(({ active }) => ({
  fontSize: '1rem',
  fontWeight: 'bold',
  color: active ? 'red' : '#aaa',
  cursor: 'pointer',
}));
