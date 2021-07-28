import React from 'react';
import { GetServerSideProps } from 'next';

import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Box, Grid } from '@material-ui/core';
import { OrganizersPageDocument, OrganizersPageQuery } from '@/lib/graphql/types';
import { Paging, SearchWord, OrganizerCard } from '@/components';
import { path } from '@/lib';
import { useRouter } from 'next/router';

const Page: React.FC<OrganizersPageQuery> = ({ organizers: { records, paging } }) => {
  const router = useRouter();

  const keyword = router.query.q as string | undefined;
  const url = (page: number) => path({ to: 'organizers', params: { page, q: keyword } });

  return (
    <Content activeTab="tournaments" title="オーガナイザー" breadcrumb={<Breadcrumbs to="organizers" />}>
      <Head title="オーガナイザー一覧" description="鉄拳7の大会オーガナイザー一覧です。" />

      <Box mb={2}>
        <SearchWord
          initWord={keyword}
          onSearch={word => {
            router.push(path({ to: 'organizers', params: { q: word } }));
          }}
        />
      </Box>

      <Grid container spacing={2}>
        {records.map(organizer => (
          <Grid item key={organizer.slug} xs={12} sm={6}>
            <OrganizerCard organizer={organizer} />
          </Grid>
        ))}
      </Grid>

      <Paging paging={paging} url={url} />
    </Content>
  );
};

export const getServerSideProps: GetServerSideProps<OrganizersPageQuery> = async ({ query }) => {
  const page = query?.page ? Number(query.page) : 1;
  const keyword = query?.q as string | undefined;
  const data: OrganizersPageQuery = await fetchGraphql(OrganizersPageDocument, { page, keyword });

  return { props: data };
};

export default Page;
