import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import * as gtag from '@/lib/gtag';
import theme from '@/theme';

import { client } from '@/lib/graphql/client';
import { useCurrentUserQuery } from '@/lib/graphql/types';
import { currentUserState } from '@/states/currentUser';
import { loadingState } from '@/states/loading';

import { Loading } from '@/components';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const AppInit = () => {
  const setCurrentUser = useSetRecoilState(currentUserState);
  useCurrentUserQuery({
    onCompleted: res => {
      setCurrentUser(res.currentUser);
    },
  });

  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleStart = (url: string) => {
      // console.log(`Loading: ${url}`);
      setLoading(true);
    };
    const handleStop = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return null;
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

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
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </StyledEngineProvider>

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
