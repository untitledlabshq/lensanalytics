import "../styles.css";

import MetaTags from "@components/Common/MetaTags";
import Loading from "@components/Shared/Loading";
import type { AppProps } from "next/app";
import { lazy, Suspense } from "react";

const Providers = lazy(() => import("@components/Common/Providers"));

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <Providers>
        <MetaTags />
        <Component {...pageProps} />
      </Providers>
    </Suspense>
  );
};

export default App;
