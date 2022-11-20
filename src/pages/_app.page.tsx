import React, { useEffect } from 'react';

import { ApolloProvider } from '@apollo/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot, useSetRecoilState } from 'recoil';

import 'react-toastify/dist/ReactToastify.css';

import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import { GoogleTagManager, GoogleTagManagerId, Loading } from '@/components';
import { useViewerQuery } from '@/generated/graphql';
import { apolloClient, theme, viewerState, loadingState, googleTagManagerId } from '@/lib';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const AppInit = () => {
  const setViewer = useSetRecoilState(viewerState);
  useViewerQuery({
    onCompleted: res => {
      setViewer(res.viewer);
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
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <RecoilRoot>
      <GoogleTagManager googleTagManagerId={googleTagManagerId as GoogleTagManagerId} />

      <ApolloProvider client={apolloClient}>
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
