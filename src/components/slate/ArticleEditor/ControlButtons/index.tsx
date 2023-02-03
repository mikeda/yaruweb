import React from 'react';

import { styled } from '@mui/material/styles';

import { BlockButton } from './buttons/BlockButton';
import { ComboButton } from './buttons/ComboButton';
import { ImageButton } from './buttons/ImageButton';
import { LinkButton } from './buttons/LinkButton';
import { MarkButton } from './buttons/MarkButton';
import { MoveButton } from './buttons/MoveButton';
import { OperationButton } from './buttons/OperationButton';
import { VideoButton } from './buttons/VideoButton';

import { useCharacterSelectOptionsQuery } from '@/generated/graphql';
import { YAROUYO_FONT_CODE } from '@/lib';



export const ControlButtons: React.FC = () => {
  const { data } = useCharacterSelectOptionsQuery();

  return (
    <Container>
      <MarkButton format="bold" icon={YAROUYO_FONT_CODE.bold} />
      <BlockButton format="heading-one" icon={YAROUYO_FONT_CODE.h1} />
      <BlockButton format="heading-two" icon={YAROUYO_FONT_CODE.h2} />
      <BlockButton format="bulleted-list" icon={YAROUYO_FONT_CODE.list} />

      <OperationButton icon={YAROUYO_FONT_CODE.lp} />
      <ImageButton />
      <VideoButton />
      <LinkButton />
      {data && <MoveButton characters={data.characters.nodes} />}
      {data && <ComboButton characters={data.characters.nodes} />}
    </Container>
  );
};

const Container = styled('div')(() => ({
  paddingBottom: '0.5rem',
  marginBottom: '1rem',
  lineHeight: '1',
  borderBottom: '1px solid #d1d8dc',
  '& > * + *': {
    marginLeft: '1rem',
  },
}));
