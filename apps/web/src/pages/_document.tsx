import Document, { Head, Html, Main, NextScript } from "next/document";

class LensAnalyticsDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          {/* Favicon */}
          <link rel="shortcut icon" href="/favicon.ico" />

          {/* Plausible */}
          <script
            defer
            data-domain="lensanalytics.xyz,lensverse.web"
            src="https://plausible.io/js/script.js"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default LensAnalyticsDocument;
