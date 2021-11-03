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
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Profile } from '../components/Profile';
import { Tabs } from '../components/Tabs';
import { ParsedUrlQuery } from 'querystring';
import { Command } from '@/components';
import {
  AttackMoveResultText,
  AttackTypeEnumText,
  ThrowEscapeEnumText,
  ThrowMoveResultText,
  ThrowTypeEnumText,
} from '@/lib/graphql/enum_texts';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { VideoPlayer } from '@/components/MoveMedia/VideoPlayer';

const Page: React.FC<CharacterMovesPageQuery> = ({ character }) => {
  return (
    <Content activeTab="characters" breadcrumb={<Breadcrumbs to="characterMoves" character={character} />}>
      <Head title={`${character.longName}のコマンドリスト`} />

      <Profile character={character} />

      <Box mt={2}>
        <Tabs character={character} activeTab="moves" />
      </Box>

      {character.moveCategories.map(moveCategory => {
        return (
          <Box key={moveCategory.id} mt={4}>
            <Typography variant="h3" gutterBottom>
              {moveCategory.name}
            </Typography>

            {moveCategory.moves.length > 0 && (
              <Paper>
                <List>
                  {moveCategory.moves.map((move, i) => (
                    <MoveListItem key={move.id} move={move} first={i === 0} />
                  ))}
                </List>
              </Paper>
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

const MoveListItem: React.FC<{ move: CharacterMovesPageMoveFragment; first: boolean }> = ({ move, first }) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      {!first && <Divider />}

      <ListItemButton onClick={handleClick}>
        <ListItemText>
          <Typography>{move.name}</Typography>

          <Box display="flex">
            {move.commandList.map((command, i) => (
              <>
                {i !== 0 && <Typography sx={{ marginX: 1 }}>/</Typography>}
                <Command key={i} command={command} />
              </>
            ))}
          </Box>
        </ListItemText>

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {move.moveable.__typename === 'AttackMove' && <AttackListItem move={move} attack={move.moveable} />}
        {move.moveable.__typename === 'ThrowMove' && <ThrowListItem move={move} throw={move.moveable} />}
        {move.moveable.__typename === 'ReversalMove' && <ReversalListItem move={move} reversal={move.moveable} />}
      </Collapse>
    </>
  );
};

const AttackListItem: React.FC<AttackMove> = ({ move, attack }) => {
  const frames: { label: string; frame: string }[] = [
    {
      label: 'ガード',
      frame: attack.blockFrame ? frameText(attack.blockFrame) : AttackMoveResultText[attack.blockResult],
    },
    {
      label: 'ヒット',
      frame: attack.hitFrame ? frameText(attack.hitFrame) : AttackMoveResultText[attack.hitResult],
    },
    {
      label: 'カウンター',
      frame: attack.counterFrame ? frameText(attack.counterFrame) : AttackMoveResultText[attack.blockResult],
    },
  ];
  if (attack.startUpFrame) {
    frames.unshift({ label: '発生', frame: frameText(attack.startUpFrame) });
  }

  return (
    <ListItem>
      <Stack spacing={2} sx={{ paddingBottom: 1 }}>
        <AttackLabels attack={attack} />

        <Typography variant="body2">{attack.heights.map(h => AttackTypeEnumText[h]).join(' > ')}</Typography>
        <Typography variant="body2">
          ダメージ {attack.damages.reduce((sum, d) => sum + d)}({attack.damages.join(',')})
        </Typography>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {frames.map(frame => (
                  <TableCell key={frame.label} sx={{ paddingX: '12px' }}>
                    {frame.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                {frames.map(frame => (
                  <TableCell key={frame.label} sx={{ paddingX: '12px' }}>
                    {frame.frame}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <ListItemFooter move={move} />
      </Stack>
    </ListItem>
  );
};

const ThrowListItem: React.FC<ThrowMove> = ({ move, throw: thrw }) => {
  return (
    <ListItem>
      <Stack spacing={2} sx={{ paddingBottom: 1 }}>
        <Typography variant="body2">{ThrowTypeEnumText[thrw.throwType]}</Typography>
        <Typography variant="body2">ダメージ {thrw.damage}</Typography>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ paddingX: '12px' }}>発生</TableCell>
                <TableCell sx={{ paddingX: '12px' }}>ヒット</TableCell>
                <TableCell sx={{ paddingX: '12px' }}>投げ抜け</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell sx={{ paddingX: '12px' }}>{thrw.startUpFrame && frameText(thrw.startUpFrame)}</TableCell>
                <TableCell sx={{ paddingX: '12px' }}>{ThrowMoveResultText[thrw.throwResult]}</TableCell>
                <TableCell sx={{ paddingX: '12px' }}>{ThrowEscapeEnumText[thrw.throwEscape]}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <ListItemFooter move={move} />
      </Stack>
    </ListItem>
  );
};

const ReversalListItem: React.FC<ReversalMove> = ({ move, reversal }) => {
  return (
    <ListItem>
      <Stack spacing={2} sx={{ paddingBottom: 1 }}>
        <Typography variant="body2">{reversal.type}</Typography>

        {(reversal.startUpFrame || reversal.finishFrame) && (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ paddingX: '12px' }}>受付フレーム</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell sx={{ paddingX: '12px' }}>
                    {reversal.startUpFrame}〜{reversal.finishFrame}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <ListItemFooter move={move} />
      </Stack>
    </ListItem>
  );
};

const ListItemFooter: React.FC<{ move: CharacterMovesPageMoveFragment }> = ({ move }) => {
  return (
    <>
      {move.moveVideo && <VideoPlayer src={move.moveVideo.m3u8Url} thumnailUrl={move.moveVideo.thumbnailUrl} />}

      {move.note && (
        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
          {move.note}
        </Typography>
      )}
    </>
  );
};

const AttackLabels: React.FC<{ attack: AttackMoveFragment }> = ({ attack }) => {
  const labels: string[] = [];
  if (attack.powerCrush) labels.push('パワークラッシュ');
  if (attack.crouchingStatus) labels.push('しゃがステ');
  if (attack.jumpStatus) labels.push('ジャンステ');
  if (attack.homing) labels.push('スクリュー');
  if (attack.wallBound) labels.push('ウォールバウンド');

  if (labels.length === 0) return null;

  return (
    <Stack direction="row" spacing={1}>
      {labels.map(label => (
        <Chip key={label} size="small" label={label} />
      ))}
    </Stack>
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
