import { ApolloProvider } from "@apollo/client";
import type { ReactNode } from "react";

import client from "../../apollo";
import Layout from "./Layout";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <Layout>{children}</Layout>
    </ApolloProvider>
  );
};

export default Providers;
