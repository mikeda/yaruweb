import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import '@/styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import * as gtag from '../lib/gtag';

import { client } from '@/lib/graphql/client';
import { GlobalFooter } from '@/components/layouts/GlobalFooter';
import { currentPlayerState } from 'states/currentPlayer';
import { useCurrentPlayerQuery } from '@/lib/graphql/types';
import { useRouter } from 'next/router';
import { Loading } from '@/components/Loading';

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
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <Component {...pageProps} />

        <GlobalFooter />
        <ToastContainer />
        <Loading />

        <AppInit />
      </ApolloProvider>
    </RecoilRoot>
  );
}

Sentry.init({
  dsn: 'https://2369aa9ae9674844bbb315fa8543aa40@o440044.ingest.sentry.io/5664514',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});
