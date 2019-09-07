import Vue from "vue";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";

import VueApollo from "vue-apollo";

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: process.env.GRAPHQL_ENDPOINT_URL,
  options: {
    reconnect: true
  }
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

// Install the vue plugin like before
Vue.use(VueApollo);
