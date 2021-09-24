import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  AttackMoveFragment,
  CharacterMovesPageDocument,
  CharacterMovesPageMoveFragment,
  CharacterMovesPageQuery,
  CharacterPathsDocument,
  CharacterPathsQuery,
  ReversalMoveFragment,
  ThrowMoveFragment,
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
import { AttackMoveResultText, ThrowMoveResultText } from '@/lib/graphql/enum_texts';

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

      {character.moveCategories.map(moveCategory => {
        const { attackMoves, throwMoves, reversalMoves } = moveGroups(moveCategory.moves);

        return (
          <Box key={moveCategory.id} mt={4}>
            <Typography variant="h3" gutterBottom>
              {moveCategory.name}
            </Typography>

            {attackMoves.length > 0 && (
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>コマンド</TableCell>
                      <TableCell align="right">発生</TableCell>
                      <TableCell align="right">ガード</TableCell>
                      <TableCell align="right">ヒット</TableCell>
                      <TableCell align="right">カウンター</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attackMoves.map(attackMove => (
                      <AttackRow key={attackMove.move.id} {...attackMove} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {throwMoves.length > 0 && (
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>コマンド</TableCell>
                      <TableCell align="right">発生</TableCell>
                      <TableCell align="right">投げ後</TableCell>
                      <TableCell align="right">投げ抜け</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {throwMoves.map(throwMove => (
                      <ThrowRow key={throwMove.move.id} {...throwMove} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {reversalMoves.length > 0 && (
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>コマンド</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reversalMoves.map(reversalMove => (
                      <ReversalRow key={reversalMove.move.id} {...reversalMove} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        );
      })}
    </Content>
  );
};

interface AttackMove {
  move: CharacterMovesPageMoveFragment;
  attack: AttackMoveFragment;
}
interface ThrowMove {
  move: CharacterMovesPageMoveFragment;
  throw: ThrowMoveFragment;
}
interface ReversalMove {
  move: CharacterMovesPageMoveFragment;
  reversal: ReversalMoveFragment;
}

const moveGroups = (moves: CharacterMovesPageMoveFragment[]) => {
  const attackMoves: AttackMove[] = [];
  const throwMoves: ThrowMove[] = [];
  const reversalMoves: ReversalMove[] = [];

  moves.forEach(move => {
    switch (move.moveable.__typename) {
      case 'AttackMove':
        attackMoves.push({ move, attack: move.moveable });
        break;
      case 'ThrowMove':
        throwMoves.push({ move, throw: move.moveable });
        break;
      case 'ReversalMove':
        reversalMoves.push({ move, reversal: move.moveable });
        break;
    }
  });

  return { attackMoves, throwMoves, reversalMoves };
};

const AttackRow: React.FC<AttackMove> = ({ move, attack }) => {
  return (
    <TableRow>
      <TableCell>
        <Typography variant="body1" gutterBottom>
          {move.name}
        </Typography>

        {move.commands.map(command => (
          <Command key={command.id} command={command} />
        ))}

        <AttackLabels attack={attack} />
      </TableCell>

      <TableCell align="right">{attack.startUpFrame && frameText(attack.startUpFrame)}</TableCell>

      <TableCell align="right">
        <OpponentDetail frame={attack.blockFrame} state={AttackMoveResultText[attack.blockResult]} />
      </TableCell>

      <TableCell align="right">
        <OpponentDetail frame={attack.hitFrame} state={AttackMoveResultText[attack.hitResult]} />
      </TableCell>

      <TableCell align="right">
        <OpponentDetail frame={attack.counterFrame} state={AttackMoveResultText[attack.counterResult]} />
      </TableCell>
    </TableRow>
  );
};

const ThrowRow: React.FC<ThrowMove> = ({ move, throw: thrw }) => {
  return (
    <TableRow>
      <TableCell>
        <Typography variant="body1" gutterBottom>
          {move.name}
        </Typography>
        {move.commands.map(command => (
          <Command key={command.id} command={command} />
        ))}
      </TableCell>
      <TableCell align="right">{thrw.startUpFrame && frameText(thrw.startUpFrame)}</TableCell>
      <TableCell align="right">{ThrowMoveResultText[thrw.throwResult]}</TableCell>
      <TableCell align="right">{thrw.throwEscape}</TableCell>
    </TableRow>
  );
};

const ReversalRow: React.FC<ReversalMove> = ({ move }) => {
  return (
    <TableRow>
      <TableCell>
        <Typography variant="body1" gutterBottom>
          {move.name}
        </Typography>
        {move.commands.map(command => (
          <Command key={command.id} command={command} />
        ))}
      </TableCell>
    </TableRow>
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

const AttackLabels: React.FC<{ attack: AttackMoveFragment }> = ({ attack }) => {
  return (
    <div>
      {attack.powerCrush && <Chip size="small" label="パワークラッシュ" />}
      {attack.crouchingStatus && <Chip size="small" label="しゃがステ" />}
      {attack.jumpStatus && <Chip size="small" label="ジャンステ" />}
      {attack.homing && <Chip size="small" label="ホーミング" />}
      {attack.screw && <Chip size="small" label="パワークラッシュ" />}
      {attack.wallBound && <Chip size="small" label="ウォールバウンド" />}
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
