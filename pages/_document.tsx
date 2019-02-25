import React from 'react';
import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext,
  DocumentProps,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

interface MyDocumentProps extends DocumentProps {
  styleTags: string;
}

export default class MyDocument extends Document<MyDocumentProps> {
  static getInitialProps({ renderPage }: NextDocumentContext) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    );

    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
