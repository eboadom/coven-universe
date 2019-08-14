<template>
  <!-- <v-app> -->
  <!-- <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
  </v-app-bar>-->

  <!-- <v-content> -->
  <!-- <Home /> -->
  <!-- </v-content> -->
  <!-- </v-app> -->
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Landing</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/home">Home</router-link>
    </div>-->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    //
  })
};
</script>
<style lang="scss">
@font-face {
  font-family: "exocet";
  src: url("./assets/exocet.ttf");
}
@font-face {
  font-family: "codesaver";
  src: url("./assets/codesaver.otf");
}
body {
  margin: 0;
  overflow: hidden;
  background: transparent url("./assets/background.svg") no-repeat fixed center;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* width: 100vw;
  height: 100vh;
  margin: 0; */
}

.button {
  background: rgba(0, 0, 0, 0);
  border: 1px solid #000;
  padding: 8px 16px;
  color: #000;
  margin-top: 0;
  box-shadow: 3px 4px 0px 0px rgba(0, 0, 0, 1);
  width: 12rem;
  height: 3rem;

  a {
    text-decoration: none;
  }

  &:hover,
  &:focus {
    background: #fff032;
  }
}

h1 {
  font-family: exocet;
  text-align: center;
}

p {
  font-family: codesaver;
}
</style>

