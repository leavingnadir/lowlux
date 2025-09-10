import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add your favicon here */}
        <link rel="icon" href="/favicon.ico" />
        {/* Or if you’re using PNG */}
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
