import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  CharacterCombosPageDocument,
  CharacterCombosPageQuery,
  CharacterPathsDocument,
  CharacterPathsQuery,
  ComboMediaFragment,
} from '@/lib/graphql/types';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { Profile } from '../components/Profile';
import { Tabs } from '../components/Tabs';
import { Content, Head, Breadcrumbs, Command } from '@/components';
import { ParsedUrlQuery } from 'querystring';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { VideoPlayer } from '@/components/MoveMedia/VideoPlayer';

const Page: React.FC<CharacterCombosPageQuery> = ({ character }) => {
  return (
    <Content activeTab="characters" breadcrumb={<Breadcrumbs to="characterCombos" character={character} />}>
      <Head title={`${character.longName}のコンボ`} />

      <Profile character={character} />

      <Box mt={2}>
        <Tabs character={character} activeTab="combos" />
      </Box>

      {character.comboCategories.map(comboCategory => {
        return (
          <Box key={comboCategory.id} mt={4}>
            <Typography variant="h3" gutterBottom>
              {comboCategory.name}
            </Typography>

            {comboCategory.combos.length > 0 && (
              <Paper>
                <List>
                  {comboCategory.combos.map((combo, i) => (
                    <ComboListItem key={combo.id} combo={combo} first={i === 0} />
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

const ComboListItem: React.FC<{ combo: ComboMediaFragment; first: boolean }> = ({ combo, first }) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      {!first && <Divider />}

      <ListItemButton onClick={handleClick}>
        <ListItemText>
          <Box>
            <Command command={combo.command} />
          </Box>
        </ListItemText>

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <ListItem>
          <Stack spacing={2} sx={{ paddingBottom: 1 }}>
            {combo.comboVideo && (
              <VideoPlayer src={combo.comboVideo.m3u8Url} thumnailUrl={combo.comboVideo.thumbnailUrl} />
            )}

            {combo.note && (
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                {combo.note}
              </Typography>
            )}
          </Stack>
        </ListItem>
      </Collapse>
    </>
  );
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<CharacterCombosPageQuery, Params> = async ({ params }) => {
  const data: CharacterCombosPageQuery = await fetchGraphql(CharacterCombosPageDocument, {
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
