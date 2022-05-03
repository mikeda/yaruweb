import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import YouTubeIcon from '@mui/icons-material/YouTube';

import {
  CharacterCombosPageDocument,
  CharacterCombosPageQuery,
  CharacterPathsDocument,
  CharacterPathsQuery,
  ComboMediaFragment,
} from '@/lib/$types';
import { fetchGraphql } from '@/lib/fetchGraphql';
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { colors } from '@/colors';

import { Content, Head, Breadcrumbs, Command, VideoPlayer } from '@/components';

import { Profile } from '../components/Profile';
import { Tabs } from '../components/Tabs';

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
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {!first && <Divider />}

      <ListItem
        secondaryAction={
          <>
            {combo.comboVideo && (
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
                    <VideoPlayer src={combo.comboVideo.m3u8Url} thumnailUrl={combo.comboVideo.thumbnailUrl} autoPlay />

                    <Box mt={1}>
                      <Command command={combo.command} />
                    </Box>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </>
        }
      >
        <ListItemText>
          <Box>
            <Command command={combo.command} />
          </Box>
        </ListItemText>
      </ListItem>

      {combo.note && (
        <ListItem>
          <Typography component={Paper} p={0.5} variant="caption" sx={{ whiteSpace: 'pre-line' }}>
            {combo.note}
          </Typography>
        </ListItem>
      )}
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

  return { props: data, revalidate: 300 };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: CharacterPathsQuery = await fetchGraphql(CharacterPathsDocument);

  const paths = data.characters.records.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export default Page;
