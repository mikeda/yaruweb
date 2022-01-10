import React from 'react';
import { BlockButton } from './BlockButton';
import { MarkButton } from './MarkButton';
import { YAROUYO_FONT_CODE } from '@/lib/YarouyoFont';
import { OperationButton } from './OperationButton';
import { ImageButton } from './ImageButton';
import { VideoButton } from './VideoButton';
import { LinkButton } from './LinkButton';
import { MoveButton } from './MoveButton';
import { ComboButton } from './ComboButton';
import { useCharacterSelectOptionsQuery } from '@/lib/graphql/types';

import styles from './Controls.module.scss';

export const Controls: React.FC = () => {
  const { data } = useCharacterSelectOptionsQuery();

  return (
    <div className={styles.controls}>
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
    </div>
  );
};
