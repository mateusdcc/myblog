// import Link from "next/link";
import { Html, Head, Main, NextScript } from 'next/document'

function Document({ Component, pageProps }) {
  return (
      <Html lang='en' data-theme="halloween">
        <Head />
        <body >
          <Main />
          <NextScript />
        </body>
      </Html>
  );
}

export default Document
