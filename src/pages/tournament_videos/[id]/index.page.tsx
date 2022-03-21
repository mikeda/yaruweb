import React, { useEffect, useState } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import {
  TournamentVideoPageDocument,
  TournamentVideoPageQuery,
  TournamentVideoPathsDocument,
  TournamentVideoPathsQuery,
} from '@/lib/graphql/types';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { useRouter } from 'next/router';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { Breadcrumbs, Content, Head, NotFound, YouTubeWrapper } from '@/components';
import YouTube from 'react-youtube';
import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { BattleListItem } from './components/BattleListItem';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

const PageContent: React.FC<TournamentVideoPageQuery> = ({ tournamentVideo }) => {
  const [youTubePlayer, setYouTubePlayer] = useState<YouTubePlayer>();
  const [battleIndex, setBattleIndex] = useState<number>(tournamentVideo.battles.length - 1);
  const router = useRouter();

  const hashBattleId = router.asPath.split('#battle_')[1] ?? '';
  const noBattle = tournamentVideo.battles.length === 0;

  const updateBattle = (index: number) => {
    if (noBattle) return;

    setBattleIndex(index);
    youTubePlayer?.seekTo(tournamentVideo.battles[index].startSec, true);
    youTubePlayer?.playVideo();
  };

  const onClickSkipPrevious = () => {
    if (noBattle || !youTubePlayer) return;

    const newIndex = battleIndex + 1;
    if (newIndex >= tournamentVideo.battles.length) return;

    setBattleIndex(newIndex);
    youTubePlayer?.seekTo(tournamentVideo.battles[newIndex].startSec, true);
  };

  const onClickSkipNext = () => {
    if (noBattle || !youTubePlayer) return;

    const newIndex = battleIndex - 1;
    if (newIndex < 0) return;

    setBattleIndex(newIndex);
    youTubePlayer?.seekTo(tournamentVideo.battles[newIndex].startSec, true);
  };

  useEffect(() => {
    if (noBattle) return;

    const index = tournamentVideo.battles.findIndex(b => b.id === hashBattleId);
    if (index !== -1) updateBattle(index);
  }, [hashBattleId]);

  useEffect(() => {
    if (noBattle) return;

    youTubePlayer?.seekTo(tournamentVideo.battles[battleIndex].startSec, true);
  }, [youTubePlayer]);

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

        {tournamentVideo.battles.length > 0 ? (
          <NotFound>対戦結果が登録されていません。</NotFound>
        ) : (
          <Box component={Paper}>
            <BattleListItem battle={tournamentVideo.battles[battleIndex]} onClick={() => updateBattle(battleIndex)} />

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
        )}
      </Box>
    </div>
  );
};

const Page: React.FC<TournamentVideoPageQuery> = ({ tournamentVideo }) => {
  return (
    <Content
      activeTab="tournaments"
      title={tournamentVideo.title}
      breadcrumb={<Breadcrumbs to="tournamentVideo" tournamentVideo={tournamentVideo} />}
    >
      <Head title={tournamentVideo.title} image={tournamentVideo.tournament.mainImageUrl} />

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
