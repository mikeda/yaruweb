import React from 'react';

import ServerStyleSheets from '@mui/styles/ServerStyleSheets';
import NextDocument, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document';

import { theme } from '@/lib';

class Document extends NextDocument {
  render() {
    return (
      <Html lang='ja'>
        <Head>
          <link rel='stylesheet' href='/fonts/fonts.css' />
          <meta name='theme-color' content={theme.palette.primary.main} />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

  // `getInitialProps` belongs to `_document` (instead of `_app`),
  // it's compatible with server-side generation (SSG).
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />),
      });

    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }
}

export default Document;
