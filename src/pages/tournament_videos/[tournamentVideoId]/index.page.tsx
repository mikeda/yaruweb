import React, { useRef, useState } from 'react';

import {
  PageTournamentVideoQuery,
  PageTournamentVideoDocument,
  TournamentVideoPageBattleFragment,
} from '@/lib/graphql/types';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Avatar, Box, createStyles, List, ListItem, ListItemText, makeStyles, Paper, Theme } from '@material-ui/core';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { formatSec } from '@/lib';
import { BattleRoundText } from '@/lib/graphql/enum_texts';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      maxHeight: 300,
      overflowY: 'auto',
    },
    avatar: {
      width: 24,
      height: 24,
    },
    win: {
      backgroundColor: '#D6AF36',
    },
    vs: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  }),
);

const PageContent: React.FC<PageTournamentVideoQuery> = ({ tournamentVideo }) => {
  const [youTubePlayer, setYouTubePlayer] = useState<YouTubePlayer>();
  const { query } = useRouter();
  const [selectedBattle, setSelectedBattle] = useState<TournamentVideoPageBattleFragment>();
  const classes = useStyles();
  const listRef = useRef<HTMLUListElement>(null);
  const selectedItemRef = useRef<HTMLDivElement>(null);

  const updateBattle = (battle: TournamentVideoPageBattleFragment) => {
    setSelectedBattle(battle);
    youTubePlayer?.seekTo(battle.startSec, true);
    youTubePlayer?.playVideo();
  };

  useEffect(() => {
    if (query.battle) {
      const b = tournamentVideo.battles.filter(b => b.id === query.battle)[0];
      if (b) {
        updateBattle(b);
        if (listRef.current && selectedItemRef.current) {
          listRef.current.scrollTop = selectedItemRef.current.offsetTop;
        }
      }
    }
  }, [query.battle]);

  return (
    <>
      <YouTube
        containerClassName="bl_youtube"
        videoId={tournamentVideo.youtubeVideoId}
        opts={{ width: '854', height: '480', playerVars: { start: selectedBattle?.startSec, autoplay: 1, mute: 1 } }}
        onReady={event => {
          setYouTubePlayer(event.target);
        }}
      />

      {tournamentVideo.battles.length > 0 && (
        <Box mt={2}>
          <Paper>
            <List className={classes.list} ref={listRef}>
              {tournamentVideo.battles.map(battle => {
                const classes = useStyles();
                const left = battle.sides[0];
                const right = battle.sides[1];
                let subTitle = formatSec(battle.startSec);
                if (battle.round) {
                  subTitle = `${subTitle} ${BattleRoundText[battle.round]}`;
                }
                return (
                  <ListItem
                    button
                    key={battle.id}
                    selected={battle.id === query.battle}
                    ref={battle.id === query.battle ? selectedItemRef : null}
                    onClick={() => {
                      updateBattle(battle);
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center">
                          <Avatar className={clsx(classes.avatar, left.rounds === 3 && classes.win)}>
                            {left.rounds}
                          </Avatar>
                          <Avatar className={classes.avatar} src={left.character.faceImageUrl} />
                          <span>{left.player.name}</span>
                          <span className={classes.vs}>×</span>
                          <Avatar className={clsx(classes.avatar, right.rounds === 3 && classes.win)}>
                            {right.rounds}
                          </Avatar>
                          <Avatar className={classes.avatar} src={right.character.faceImageUrl} />
                          <span>{right.player.name}</span>
                        </Box>
                      }
                      secondary={subTitle}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Box>
      )}
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
      <Head title={video.title} image={video.thumbnailUrl} />

      <PageContent {...data} />
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tournamentVideoId = params?.tournamentVideoId as string;
  const data: PageTournamentVideoQuery = await fetchGraphql(PageTournamentVideoDocument, { tournamentVideoId });

  return { props: data, revalidate: 300 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export default Page;
