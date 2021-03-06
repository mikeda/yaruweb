import React from 'react';
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import '@/styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';

import { client } from '@/lib/graphql/client';
import { GlobalHeader } from '@/components/layouts/GlobalHeader';
import { GlobalFooter } from '@/components/layouts/GlobalFooter';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { currentPlayerState } from 'states/currentPlayer';
import { useCurrentPlayerQuery } from '@/lib/graphql/types';

const AppInit = () => {
  const setCurrentPlayer = useSetRecoilState(currentPlayerState);
  useCurrentPlayerQuery({
    onCompleted: res => {
      setCurrentPlayer(res.currentPlayer);
    },
  });

  return null;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />

      <RecoilRoot>
        <ApolloProvider client={client}>
          <GlobalHeader />

          <Content size={pageProps.contentSize}>
            <Component {...pageProps} />
          </Content>

          <GlobalFooter />
          <ToastContainer />

          <AppInit />
        </ApolloProvider>
      </RecoilRoot>
    </>
  );
}

Sentry.init({
  dsn: 'https://2369aa9ae9674844bbb315fa8543aa40@o440044.ingest.sentry.io/5664514',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});
