import React, { useEffect, useState } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import {
  TournamentVideoPageBattleFragment,
  TournamentVideoPageDocument,
  TournamentVideoPageQuery,
  TournamentVideoPathsDocument,
  TournamentVideoPathsQuery,
} from '@/lib/graphql/types';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { useRouter } from 'next/router';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { Breadcrumbs, Content, Head, YouTubeWrapper } from '@/components';
import YouTube from 'react-youtube';
import { List, Paper } from '@mui/material';
import { BattleListItem } from './components/BattleListItem';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  list: {
    maxHeight: 320,
    overflowY: 'auto',
  },
});

const PageContent: React.FC<TournamentVideoPageQuery> = ({ tournamentVideo }) => {
  const [youTubePlayer, setYouTubePlayer] = useState<YouTubePlayer>();
  const [selectedBattle, setSelectedBattle] = useState<TournamentVideoPageBattleFragment>();
  const router = useRouter();
  const classes = useStyles();

  const hashBattleId = router.asPath.split('#battle')[1] ?? '';

  const updateBattle = (battle: TournamentVideoPageBattleFragment) => {
    setSelectedBattle(battle);
    youTubePlayer?.seekTo(battle.startSec, true);
    youTubePlayer?.playVideo();
  };

  useEffect(() => {
    const battle = tournamentVideo.battles.find(b => b.id === hashBattleId);
    if (battle) updateBattle(battle);
  }, [hashBattleId]);

  useEffect(() => {
    if (selectedBattle) {
      youTubePlayer?.seekTo(selectedBattle.startSec, true);
      youTubePlayer?.playVideo();
    }
  }, [youTubePlayer]);

  return (
    <div>
      <YouTubeWrapper>
        <YouTube
          videoId={tournamentVideo.youtubeVideoId}
          opts={{ width: '854', height: '480', playerVars: { playsinline: 1 } }}
          onReady={event => {
            setYouTubePlayer(event.target);
          }}
        />
      </YouTubeWrapper>

      {tournamentVideo.battles.length > 0 && (
        <Paper>
          <List className={classes.list}>
            {tournamentVideo.battles.map(battle => (
              <BattleListItem
                key={battle.id}
                battle={battle}
                selected={selectedBattle?.id === battle.id}
                onClick={() => updateBattle(battle)}
              />
            ))}
          </List>
        </Paper>
      )}
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
