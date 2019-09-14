import Vue from "vue";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";

import VueApollo from "vue-apollo";

// Create the subscription websocket link
const link = new WebSocketLink({
  uri: process.env.VUE_APP_GRAPHQL_ENDPOINT_URL,
  options: {
    reconnect: true
  }
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.use(VueApollo);
