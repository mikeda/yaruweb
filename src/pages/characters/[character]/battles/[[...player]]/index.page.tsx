import React, { useState } from 'react';
import { GetServerSideProps } from 'next';

import {
  CharacterBattlesPageDocument,
  CharacterBattlesPageQuery,
  useCharacterBattlesPageBattlesLazyQuery,
} from '@/lib/graphql/types';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Box, Button, createStyles, List, makeStyles, Paper, Theme } from '@material-ui/core';
import { BattleListItem, CharacterPageTabs } from '@/components';
import { path } from '@/lib';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { BattleSelector, PlayerBattleCountChip } from '@/components/BattleSelector';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingTop: theme.spacing(2),
    },
  }),
);

interface Props {
  data: CharacterBattlesPageQuery;
  params: {
    characterSlug: string;
    playerSlug: string | null;
  };
}

const Page: React.FC<Props> = ({
  data: {
    character,
    battles: { records: initBattles, paging: initPaging },
    battleCounts,
  },
  params: { characterSlug, playerSlug },
}) => {
  const [battles, setBattles] = useState(initBattles);
  const [paging, setPaging] = useState(initPaging);
  const [fetchBattles] = useCharacterBattlesPageBattlesLazyQuery({
    onCompleted: data => {
      setBattles(prev => [...prev, ...data.battles.records]);
      setPaging(data.battles.paging);
      setLoading(false);
    },
    onError: e => {
      toast.error(e.message);
      setLoading(false);
    },
  });
  const setLoading = useSetRecoilState(loadingState);

  const router = useRouter();
  const classes = useStyles();

  useEffect(() => {
    setBattles(initBattles);
    setPaging(initPaging);
  }, [characterSlug, playerSlug]);

  const fetchMore = () => {
    if (!paging.hasNext) return;

    setLoading(true);
    fetchBattles({ variables: { characterSlug, playerSlug, page: paging.currentPage + 1 } });
  };

  return (
    <Content
      activeTab="characters"
      title={character.longName}
      breadcrumb={<Breadcrumbs to="character" character={character} />}
    >
      <Head title={character.longName} />

      <Box mt={2}>
        <CharacterPageTabs characterSlug={character.slug} activeTab="battles" />
      </Box>

      <Paper className={classes.content}>
        <BattleSelector>
          {battleCounts.records.map(bc => (
            <PlayerBattleCountChip
              key={bc.id}
              battleCount={bc}
              active={playerSlug === bc.player.slug}
              onClick={() => {
                if (playerSlug === bc.player.slug) {
                  router.push(path({ to: 'characterBattles', characterSlug: character.slug }));
                } else {
                  router.push(
                    path({ to: 'characterBattles', characterSlug: character.slug, playerSlug: bc.player.slug }),
                  );
                }
              }}
            />
          ))}
        </BattleSelector>

        <List>
          {battles.map((battle, i) => (
            <BattleListItem key={battle.id} battle={battle} last={battles.length === i + 1} />
          ))}
        </List>

        {paging.hasNext && (
          <Box pt={2} pb={2} display="flex" justifyContent="center">
            <Button variant="outlined" onClick={fetchMore}>
              もっとみる
            </Button>
          </Box>
        )}
      </Paper>
    </Content>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const characterSlug = query.character as string;
  const playerSlugs = query.player as string[] | undefined;
  const playerSlug = playerSlugs ? playerSlugs[0] : null;
  const data: CharacterBattlesPageQuery = await fetchGraphql(CharacterBattlesPageDocument, {
    characterSlug,
    playerSlug,
  });

  return { props: { data, params: { characterSlug, playerSlug } } };
};

export default Page;
