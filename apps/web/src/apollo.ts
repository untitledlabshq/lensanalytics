import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import result from "lens";

import { MAINNET_API_URL as API_URL } from "../src/constants";

const httpLink = new HttpLink({
  uri: API_URL,
  fetchOptions: "no-cors",
  fetch,
});

// RetryLink is a link that retries requests based on the status code returned.
const retryLink = new RetryLink({
  delay: {
    initial: 100,
  },
  attempts: {
    max: 2,
    retryIf: (error: any) => Boolean(error),
  },
});

const cache = new InMemoryCache({
  possibleTypes: result.possibleTypes,
});

const client = new ApolloClient({
  link: from([retryLink, httpLink]),
  cache,
});

export const serverlessClient = new ApolloClient({
  link: from([httpLink]),
  cache,
});

export default client;
