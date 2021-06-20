import React from 'react';

import { usePageTournamentsQuery } from '@/lib/graphql/types';
import { Media } from '@/components/Media';
import dayjs from '@/lib/dayjs';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Routes } from '@/lib/Routes';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { Paging } from '@/components/Paging';

const PageContent: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { query } = router;
  const page = query.page ? Number(query.page as string) : 1;
  const { data, loading } = usePageTournamentsQuery({
    variables: { page },
    skip: !router.isReady,
  });

  const url = (page: number) => Routes.tournament.index({ page });

  setLoading(loading);

  return (
    <>
      <div className="bl_section">
        <div className="bl_section_body">
          <div className="bl_mediaUnit">
            {data?.tournaments.records.map(tournament => {
              if (!tournament) return;

              return (
                <Media
                  href={Routes.tournament.detail(tournament.id)}
                  key={tournament.id}
                  imageUrl={tournament.mainImageUrl}
                  title={tournament.name}
                  titleNote={dayjs(tournament.startsAt).format('YYYY/M/D H:mm')}
                  text={tournament.description}
                />
              );
            })}
          </div>
        </div>
      </div>

      {data && <Paging paging={data.tournaments.paging} url={url} />}
    </>
  );
};

const Page: React.FC = () => {
  return (
    <Content>
      <Head title="鉄拳7の大会情報まとめ" />
      <Breadcrumbs items={[{ name: '大会情報' }]} />

      <PageContent />
    </Content>
  );
};

export default Page;
