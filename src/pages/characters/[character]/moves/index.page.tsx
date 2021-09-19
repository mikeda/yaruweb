import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  AttackActionFragment,
  CharacterMovesPageDocument,
  CharacterMovesPageQuery,
  CharacterPathsDocument,
  CharacterPathsQuery,
  MoveMediaFragment,
  ThrowActionFragment,
} from '@/lib/graphql/types';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import {
  Box,
  Chip,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Profile } from '../components/Profile';
import { Tabs } from '../components/Tabs';
import { ParsedUrlQuery } from 'querystring';
import { Command } from '@/components';
import { AttackActionStateText, ThorwActionStateText } from '@/lib/graphql/enum_texts';

const useStyles = makeStyles({
  table: {
    minWidth: 640,
  },
});

const Page: React.FC<CharacterMovesPageQuery> = ({ character }) => {
  const classes = useStyles();

  return (
    <Content activeTab="characters" breadcrumb={<Breadcrumbs to="characterMoves" character={character} />}>
      <Head title={`${character.longName}のコマンドリスト`} />

      <Profile character={character} />

      <Box mt={2}>
        <Tabs character={character} activeTab="moves" />
      </Box>

      {character.moveCategories.map(moveCategory => (
        <Box key={moveCategory.id} mt={4}>
          <Typography variant="h3" gutterBottom>
            {moveCategory.name}
          </Typography>

          <TableContainer component={Paper}>
            <Table className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="right">発生</TableCell>
                  <TableCell align="right">ガード</TableCell>
                  <TableCell align="right">ヒット</TableCell>
                  <TableCell align="right">カウンター</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {moveCategory.moves.map(move => (
                  <MoveRow key={move.id} move={move} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Content>
  );
};

const MoveRow: React.FC<{ move: MoveMediaFragment }> = ({ move }) => {
  const lastAction = move.actions[move.actions.length - 1];

  return (
    <TableRow>
      <TableCell>
        <AttackLabels move={move} />
        <Typography variant="body1" gutterBottom>
          {move.name}
        </Typography>
        {move.commands.map(command => (
          <Command key={command.id} command={command} />
        ))}
      </TableCell>
      <TableCell align="right">{move.startUpFrame && `${move.startUpFrame}F`}</TableCell>
      {lastAction && lastAction.__typename === 'AttackAction' && <AttackCells action={lastAction} />}
      {lastAction && lastAction.__typename === 'ThrowAction' && <ThrowCells action={lastAction} />}
    </TableRow>
  );
};

const AttackCells: React.FC<{ action: AttackActionFragment }> = ({ action }) => {
  return (
    <>
      <TableCell align="right">
        {action.blockAvailable && (
          <OpponentDetail frame={action.blockFrame} state={AttackActionStateText[action.blockState]} />
        )}
      </TableCell>

      <TableCell align="right">
        {action.hitAvailable && (
          <OpponentDetail frame={action.hitFrame} state={AttackActionStateText[action.hitState]} />
        )}
      </TableCell>

      <TableCell align="right">
        {action.counterHitAvailable && (
          <OpponentDetail frame={action.counterHitFrame} state={AttackActionStateText[action.counterHitState]} />
        )}
      </TableCell>
    </>
  );
};

const ThrowCells: React.FC<{ action: ThrowActionFragment }> = ({ action }) => {
  return (
    <>
      <TableCell align="right"></TableCell>
      <TableCell align="right">
        {action.throwAvailable && (
          <OpponentDetail frame={action.throwFrame} state={ThorwActionStateText[action.throwState]} />
        )}
      </TableCell>
      <TableCell align="right"></TableCell>
      <TableCell align="right"></TableCell>
    </>
  );
};

const OpponentDetail: React.FC<{ frame?: number | null; state?: string | null }> = ({ frame, state }) => {
  let frameClass: string | undefined;
  if (frame && frame <= -10) frameClass = 'el_caution';

  return (
    <>
      {frame && <span className={frameClass}>{frameText(frame)}</span>}
      {state}
    </>
  );
};

const AttackLabels: React.FC<{ move: MoveMediaFragment }> = ({ move }) => {
  return (
    <div>
      {move.powerCrush && <Chip size="small" label="パワークラッシュ" />}
      {move.crouchingStatus && <Chip size="small" label="しゃがステ" />}
      {move.jumpStatus && <Chip size="small" label="ジャンステ" />}
      {move.homing && <Chip size="small" label="ホーミング" />}
      {move.screw && <Chip size="small" label="パワークラッシュ" />}
      {move.wallBound && <Chip size="small" label="ウォールバウンド" />}
    </div>
  );
};

const frameText = (frame: number) => {
  if (frame > 0) return `+${frame}F`;
  if (frame === 0) return `±${0}F`;
  return `${frame}F`;
};

interface Params extends ParsedUrlQuery {
  character: string;
}

export const getStaticProps: GetStaticProps<CharacterMovesPageQuery, Params> = async ({ params }) => {
  const data: CharacterMovesPageQuery = await fetchGraphql(CharacterMovesPageDocument, {
    characterSlug: params?.character,
  });

  return { props: data };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: CharacterPathsQuery = await fetchGraphql(CharacterPathsDocument);

  const paths = data.characters.records.map(c => ({ params: { character: c.slug } }));

  return { paths, fallback: false };
};

export default Page;
