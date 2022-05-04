import React from 'react';

import { styled } from '@mui/material/styles';

import { BlockButton } from './BlockButton';
import { ComboButton } from './ComboButton';
import { ImageButton } from './ImageButton';
import { LinkButton } from './LinkButton';
import { MarkButton } from './MarkButton';
import { MoveButton } from './MoveButton';
import { OperationButton } from './OperationButton';
import { VideoButton } from './VideoButton';

import { useCharacterSelectOptionsQuery } from '@/generated/graphql';
import { YAROUYO_FONT_CODE } from '@/lib';

export const Controls: React.FC = () => {
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
      {data && <MoveButton characters={data.characters.records} />}
      {data && <ComboButton characters={data.characters.records} />}
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
