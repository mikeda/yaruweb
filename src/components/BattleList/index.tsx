import React, { useState } from 'react';

import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Box, Button, IconButton, List, Paper, Tooltip } from '@mui/material';
import YouTube from 'react-youtube';
import { useSetRecoilState } from 'recoil';
import { YouTubePlayer } from 'youtube-player/dist/types';

import { BattleListItem } from '../BattleListItem';

import { YouTubeWrapper } from '@/components';
import { useBattleListQuery } from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  tournamentId?: string;
  playerSlug?: string;
  characterSlug?: string;
}

export const BattleList: React.FC<Props> = ({ tournamentId, playerSlug, characterSlug }) => {
  const [youTubePlayer, setYouTubePlayer] = useState<YouTubePlayer>();
  const [battleIndex, setBattleIndex] = useState<number>(0);
  const setLoading = useSetRecoilState(loadingState);

  const { data, fetchMore } = useBattleListQuery({
    variables: { tournamentId, playerSlug, characterSlug },
    onCompleted: () => {
      setLoading(false);
    },
    notifyOnNetworkStatusChange: true,
  });

  const updateBattle = (index: number) => {
    const battle = battles[index];
    if (!battle) return;

    setBattleIndex(index);

    youTubePlayer?.seekTo(battle.startSec, true);
    youTubePlayer?.playVideo();
  };

  const onClickSkipPrevious = () => {
    if (!youTubePlayer) return;

    const newIndex = battleIndex + 1;
    if (newIndex >= battles.length) return;

    updateBattle(newIndex);
  };

  const onClickSkipNext = () => {
    if (!youTubePlayer) return;

    const newIndex = battleIndex - 1;
    if (newIndex < 0) return;

    updateBattle(newIndex);
  };

  if (!data) return null;

  const { records: battles, paging } = data.battles;

  const battle = battles[battleIndex];
  if (!battle) return null;

  return (
    <div>
      <YouTubeWrapper>
        <YouTube
          videoId={battle.tournamentVideo.youtubeVideoId}
          opts={{ width: '854', height: '480', playerVars: { playsinline: 1, autoplay: 1 } }}
          onReady={event => {
            const player = event.target;

            setYouTubePlayer(event.target);
            player.seekTo(battle.startSec, true);
            player.playVideo();
          }}
        />
      </YouTubeWrapper>

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
          {battles.map((battle, i) => (
            <BattleListItem key={battle.id} battle={battle} onClick={() => updateBattle(i)} />
          ))}
        </List>
      </Box>

      {paging.hasNext && (
        <Box pt={2} pb={2} display="flex" justifyContent="center">
          <Button
            variant="outlined"
            onClick={() => {
              fetchMore({
                variables: { tournamentId, playerSlug, characterSlug, page: paging.currentPage + 1 },
                updateQuery: (prev, { fetchMoreResult: data }) => {
                  if (!data) return prev;

                  return {
                    battles: {
                      records: [...prev.battles.records, ...data.battles.records],
                      paging: data.battles.paging,
                    },
                  };
                },
              });
            }}
          >
            もっとみる
          </Button>
        </Box>
      )}
    </div>
  );
};
