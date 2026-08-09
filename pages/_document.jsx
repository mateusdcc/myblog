import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#fbf1c7" />
        <link rel="icon" type="image/png" href="https://github.com/mateusdcc.png" />
        <link rel="apple-touch-icon" href="https://github.com/mateusdcc.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
