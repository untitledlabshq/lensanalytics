import "../styles.css";

import MetaTags from "@components/Common/MetaTags";
import Loading from "@components/Shared/Loading";
import type { AppProps } from "next/app";
import Script from "next/script";
import { lazy, Suspense } from "react";

const Providers = lazy(() => import("@components/Common/Providers"));

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-7DHFR01RQ4`}
      />
      <Script
        id="google_analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-7DHFR01RQ4', {
        page_path: window.location.pathname,
      });
    `,
        }}
      />
      <Suspense fallback={<Loading />}>
        <Providers>
          <MetaTags />
          <Component {...pageProps} />
        </Providers>
      </Suspense>
    </>
  );
};

export default App;
