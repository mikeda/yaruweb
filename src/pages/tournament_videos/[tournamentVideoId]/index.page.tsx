import React, { useState } from 'react';

import {
  PageTournamentVideoQuery,
  PageTournamentVideoDocument,
  TournamentVideoPageBattleFragment,
} from '@/lib/graphql/types';
import { TournamentVideoCommentsBlock } from '@/components';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Box, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { formatSec } from '@/lib';
import { TournamentBattleRoundText } from '@/lib/graphql/enum_texts';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PageContent: React.FC<PageTournamentVideoQuery> = ({ tournamentVideo }) => {
  const [youTubePlayer, setYouTubePlayer] = useState<YouTubePlayer>();
  const { query } = useRouter();
  const [selectedBattle, setSelectedBattle] = useState<TournamentVideoPageBattleFragment>();

  const updateBattle = (battle: TournamentVideoPageBattleFragment) => {
    setSelectedBattle(battle);
    youTubePlayer?.seekTo(battle.startSec, true);
  };

  useEffect(() => {
    if (query.battle) {
      const b = tournamentVideo.battles.filter(b => b.id === query.battle)[0];
      if (b) {
        updateBattle(b);
      }
    }
  }, [query.battle]);

  return (
    <>
      <YouTube
        containerClassName="bl_youtube"
        videoId={tournamentVideo.youtubeVideoId}
        opts={{ width: '854', height: '480', playerVars: { start: selectedBattle?.startSec, autoplay: 1 } }}
        onReady={event => {
          setYouTubePlayer(event.target);
        }}
      />

      {tournamentVideo.battles.length > 0 && (
        <Box mt={2}>
          <Paper>
            <List>
              {tournamentVideo.battles.map(battle => {
                const left = battle.sides[0];
                const right = battle.sides[1];
                let title = `${left.player.name} VS ${right.player.name}`;
                if (battle.round) {
                  title = `[${TournamentBattleRoundText[battle.round]}] ${title}`;
                }
                return (
                  <ListItem
                    button
                    key={battle.id}
                    selected={battle.id === selectedBattle?.id}
                    onClick={() => {
                      updateBattle(battle);
                    }}
                  >
                    <ListItemText primary={title} secondary={formatSec(battle.startSec)} />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Box>
      )}

      <Box mt={4}>
        <TournamentVideoCommentsBlock tournamentVideoId={tournamentVideo.id} />
      </Box>
    </>
  );
};

const Page: React.FC<PageTournamentVideoQuery> = data => {
  const video = data.tournamentVideo;

  return (
    <Content
      activeTab="tournaments"
      title={video.title}
      breadcrumb={<Breadcrumbs to="tournamentVideo" tournamentVideo={video} />}
    >
      <Head title={video.title} />

      <PageContent {...data} />
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tournamentVideoId = params?.tournamentVideoId as string;
  const data: PageTournamentVideoQuery = await fetchGraphql(PageTournamentVideoDocument, { tournamentVideoId });

  return { props: data, revalidate: 60 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export default Page;
