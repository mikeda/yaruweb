import React from 'react';
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';

import '@/styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';

import { client } from '@/lib/graphql/client';
import { GlobalHeader } from '@/components/layouts/GlobalHeader';
import { WithCurrentPlayer } from '@/components/layouts/WithCurrentPlayer';
import { GlobalFooter } from '@/components/layouts/GlobalFooter';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />

      <ApolloProvider client={client}>
        <WithCurrentPlayer>
          <GlobalHeader />

          <Content size={pageProps.contentSize}>
            <Component {...pageProps} />
          </Content>

          <GlobalFooter />

          <ToastContainer />
        </WithCurrentPlayer>
      </ApolloProvider>
    </>
  );
}
