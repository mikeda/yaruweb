import { ParsedUrlQuery } from 'querystring';

import React, { useState } from 'react';

import YouTubeIcon from '@mui/icons-material/YouTube';
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';



import { Profile } from '../components/Profile';
import { Tabs } from '../components/Tabs';

import { Breadcrumbs, Command, Content, CustomText, Head, VideoPlayer } from '@/components';
import {
  AttackMoveFragment,
  CharacterMovesPageDocument,
  CharacterMovesPageMoveFragment,
  CharacterMovesPageQuery,
  CharacterPathsDocument,
  CharacterPathsQuery,
  ReversalMoveFragment,
  ThrowMoveFragment,
  fetchGraphql,
  AttackMoveResultText,
  AttackTypeEnumText,
  ThrowEscapeEnumText,
  ThrowMoveResultText,
  ThrowTypeEnumText,
  colors,
} from '@/lib';

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
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {!first && <Divider />}

      <ListItem
        secondaryAction={
          <>
            {move.moveVideo && (
              <>
                <IconButton onClick={() => setDialogOpen(true)} size="large">
                  <YouTubeIcon style={{ fill: colors.youtube }} />
                </IconButton>

                <Dialog
                  open={dialogOpen}
                  onClose={() => setDialogOpen(false)}
                  sx={{ margin: 0 }}
                  PaperProps={{ sx: { margin: 1 } }}
                >
                  <DialogContent sx={{ padding: 2 }}>
                    <VideoPlayer src={move.moveVideo.m3u8Url} thumnailUrl={move.moveVideo.thumbnailUrl} autoPlay />

                    <Box mt={1}>
                      <Command command={move.command} />
                    </Box>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </>
        }
      >
        <ListItemText>
          <Typography>{move.name}</Typography>

          <Box mt={1}>
            <Command command={move.command} />
          </Box>
        </ListItemText>
      </ListItem>

      <ListItem>
        {move.moveable.__typename === 'AttackMove' && <AttackListItem move={move} attack={move.moveable} />}
        {move.moveable.__typename === 'ThrowMove' && <ThrowListItem move={move} throw={move.moveable} />}
        {move.moveable.__typename === 'ReversalMove' && <ReversalListItem move={move} reversal={move.moveable} />}
      </ListItem>
    </>
  );
};

const AttackListItem: React.FC<AttackMove> = ({ move, attack }) => {
  const frames: { label: string; frame: string }[] = [
    {
      label: 'G',
      frame: attack.blockFrame ? frameText(attack.blockFrame) : AttackMoveResultText[attack.blockResult],
    },
    {
      label: 'H',
      frame: attack.hitFrame ? frameText(attack.hitFrame) : AttackMoveResultText[attack.hitResult],
    },
    {
      label: 'C',
      frame: attack.counterFrame ? frameText(attack.counterFrame) : AttackMoveResultText[attack.blockResult],
    },
  ];

  return (
    <Stack spacing={1}>
      <AttackLabels attack={attack} />

      <Typography variant="body2">
        {attack.heights.map(h => AttackTypeEnumText[h]).join(',')}
        {attack.damages.length > 0 && ` / ダメージ ${attack.damages.join(',')}`}
      </Typography>

      <Typography variant="body2">
        発生 {attack.startUpFrame ? frameText(attack.startUpFrame) : '-'}
        {attack.duration && `（持続 ${attack.duration}F）`}
      </Typography>
      <Typography variant="body2">{frames.map(frame => `${frame.label} ${frame.frame}`).join(' / ')}</Typography>

      <ListItemFooter move={move} />
    </Stack>
  );
};

const ThrowListItem: React.FC<ThrowMove> = ({ move, throw: thrw }) => {
  return (
    <Stack spacing={2} sx={{ paddingBottom: 1 }}>
      <Typography variant="body2">{`${ThrowTypeEnumText[thrw.throwType]} / ダメージ ${thrw.damage || '-'} / 投げ抜け ${
        ThrowEscapeEnumText[thrw.throwEscape]
      }`}</Typography>

      <Typography variant="body2">{`発生 ${thrw.startUpFrame ? frameText(thrw.startUpFrame) : '-'} / H ${
        ThrowMoveResultText[thrw.throwResult]
      }`}</Typography>

      <ListItemFooter move={move} />
    </Stack>
  );
};

const ReversalListItem: React.FC<ReversalMove> = ({ move, reversal }) => {
  return (
    <Stack spacing={2} sx={{ paddingBottom: 1 }}>
      <Typography variant="body2">{reversal.type}</Typography>

      {(reversal.startUpFrame || reversal.finishFrame) && (
        <Typography variant="body2">{`受付フレーム ${reversal.startUpFrame}F〜${reversal.finishFrame}F`}</Typography>
      )}

      <ListItemFooter move={move} />
    </Stack>
  );
};

const ListItemFooter: React.FC<{ move: CharacterMovesPageMoveFragment }> = ({ move }) => {
  if (!move.note) return null;

  return (
    <Typography component={Paper} p={0.5} variant="caption" sx={{ whiteSpace: 'pre-line' }}>
      <CustomText text={move.note} />
    </Typography>
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
  slug: string;
}

export const getStaticProps: GetStaticProps<CharacterMovesPageQuery, Params> = async ({ params }) => {
  const data: CharacterMovesPageQuery = await fetchGraphql(CharacterMovesPageDocument, {
    characterSlug: params?.slug,
  });

  return { props: data };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: CharacterPathsQuery = await fetchGraphql(CharacterPathsDocument);

  const paths = data.characters.records.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export default Page;
