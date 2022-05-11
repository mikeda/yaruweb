import React, { useEffect, useState } from 'react';

import { ParsedUrlQuery } from 'querystring';

import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Box, IconButton, List, Paper, Tooltip, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';

import { BattleListItem } from './components/BattleListItem';

import { Breadcrumbs, Content, Head, NotFound, YouTubeWrapper } from '@/components';
import {
  TournamentVideoPageDocument,
  TournamentVideoPageQuery,
  TournamentVideoPathsDocument,
  TournamentVideoPathsQuery,
} from '@/generated/graphql';
import { fetchGraphql, TournamentVideoDomain } from '@/lib';

const PageContent: React.FC<TournamentVideoPageQuery> = ({ tournamentVideo }) => {
  const [youTubePlayer, setYouTubePlayer] = useState<YouTubePlayer>();
  const [battleIndex, setBattleIndex] = useState<number>(tournamentVideo.battles.length - 1);
  const router = useRouter();

  const hashBattleId = router.asPath.split('#battle_')[1] ?? '';
  const noBattle = tournamentVideo.battles.length === 0;

  const updateBattle = (index: number) => {
    if (noBattle) return;

    const battle = tournamentVideo.battles[index];
    if (!battle) return;

    setBattleIndex(index);

    youTubePlayer?.seekTo(battle.startSec, true);
    youTubePlayer?.playVideo();
  };

  const onClickSkipPrevious = () => {
    if (noBattle || !youTubePlayer) return;

    const newIndex = battleIndex + 1;
    if (newIndex >= tournamentVideo.battles.length) return;

    const battle = tournamentVideo.battles[newIndex];
    if (!battle) return;

    setBattleIndex(newIndex);
    youTubePlayer?.seekTo(battle.startSec, true);
  };

  const onClickSkipNext = () => {
    if (noBattle || !youTubePlayer) return;

    const newIndex = battleIndex - 1;
    if (newIndex < 0) return;

    const battle = tournamentVideo.battles[newIndex];
    if (!battle) return;

    setBattleIndex(newIndex);
    youTubePlayer?.seekTo(battle.startSec, true);
  };

  useEffect(() => {
    if (noBattle) return;

    const index = tournamentVideo.battles.findIndex(b => b.id === hashBattleId);
    if (index !== -1) updateBattle(index);
  }, [hashBattleId]);

  useEffect(() => {
    if (noBattle) return;

    const battle = tournamentVideo.battles[battleIndex];
    if (!battle) return;

    youTubePlayer?.seekTo(battle.startSec, true);
  }, [youTubePlayer]);

  const battle = tournamentVideo.battles[battleIndex];
  if (!battle) return null;

  return (
    <div>
      <YouTubeWrapper>
        <YouTube
          videoId={tournamentVideo.youtubeVideoId}
          opts={{ width: '854', height: '480', playerVars: { playsinline: 1, mute: 1 } }}
          onReady={event => {
            setYouTubePlayer(event.target);
          }}
        />
      </YouTubeWrapper>

      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          対戦結果
        </Typography>

        {tournamentVideo.battles.length === 0 ? (
          <NotFound>対戦結果が登録されていません。</NotFound>
        ) : (
          battle && (
            <>
              <Box component={Paper}>
                <BattleListItem battle={battle} onClick={() => updateBattle(battleIndex)} />

                <Box display="flex">
                  <Tooltip title="1つ前の対戦に移動" sx={{ flexGrow: 1 }}>
                    <IconButton size="small" onClick={onClickSkipPrevious}>
                      <SkipPreviousIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="次の対戦に移動" sx={{ flexGrow: 1 }}>
                    <IconButton size="small" onClick={onClickSkipNext}>
                      <SkipNextIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <Box mt={2} component={Paper}>
                <List>
                  {tournamentVideo.battles.map((battle, i) => (
                    <BattleListItem
                      key={battle.id}
                      battle={battle}
                      selected={i === battleIndex}
                      onClick={() => updateBattle(i)}
                    />
                  ))}
                </List>
              </Box>
            </>
          )
        )}
      </Box>
    </div>
  );
};

const Page: React.FC<TournamentVideoPageQuery> = ({ tournamentVideo }) => {
  const title = `${TournamentVideoDomain.title(tournamentVideo)}の対戦動画`;

  return (
    <Content
      activeTab="tournaments"
      title={title}
      breadcrumb={<Breadcrumbs to="tournamentVideo" tournamentVideo={tournamentVideo} />}
    >
      <Head title={title} image={tournamentVideo.tournament.mainImageUrl} />

      <PageContent tournamentVideo={tournamentVideo} />
    </Content>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<TournamentVideoPageQuery, Params> = async ({ params }) => {
  const data: TournamentVideoPageQuery = await fetchGraphql(TournamentVideoPageDocument, {
    tournamentVideoId: params?.id,
  });

  return { props: data, revalidate: 300 };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: TournamentVideoPathsQuery = await fetchGraphql(TournamentVideoPathsDocument);

  const paths = data.allTournamentVideos.map(({ id }) => ({ params: { id } }));

  return { paths, fallback: 'blocking' };
};

export default Page;
