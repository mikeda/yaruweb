import React from 'react';

import { Button, TableCell, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { DashboardTableMenu } from '@/components';
import { pagesPath } from '@/generated/$path';
import { CharacterTableRowFragment } from '@/generated/graphql';
import { resolveUrlObject } from '@/lib';

interface Props {
  character: CharacterTableRowFragment;
}

export const CharacterTableRow = ({ character }: Props) => {
  const router = useRouter();

  return (
    <TableRow>
      <TableCell scope="row" width={80}>
        <img src={character.faceImageUrl} width={80} />
      </TableCell>

      <TableCell scope="row">
        <Typography>{character.name}</Typography>
        <Typography variant={'caption'}>{`コマンド${character.movesCount} コンボ${character.combosCount}`}</Typography>
      </TableCell>

      <TableCell align="right" scope="row">
        <Button
          variant="outlined"
          href={resolveUrlObject(router, pagesPath.admin.characters._slug(character.slug).edit.$url())}
        >
          編集
        </Button>

        <DashboardTableMenu
          items={[
            {
              label: 'コマンド登録',
              onClick: () => {
                router.push(pagesPath.admin.characters._slug(character.slug).moves.$url());
              },
            },
            {
              label: 'コンボ登録',
              onClick: () => {
                router.push(pagesPath.admin.characters._slug(character.slug).combos.$url());
              },
            },
          ]}
        />
      </TableCell>
    </TableRow>
  );
};
