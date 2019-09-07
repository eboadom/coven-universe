<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
:root {
  --purple: #b79afc;
  --red: #ff809b;
  --green: #8bea63;
  --blue: #35d1e7;
  --darkblue: #0f1f64;
}

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
  background: transparent url("./assets/background.svg") no-repeat fixed center;
  overflow-x: hidden;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.button {
  background: rgba(0, 0, 0, 0);
  border: 1px solid #000;
  padding: 8px 16px;
  color: #000;
  margin-top: 0;
  box-shadow: 3px 4px 0 0 rgba(0, 0, 0, 1);
  width: 12rem;
  height: 3rem;
  background: white;
  transition: all .3s ease;

  a {
    text-decoration: none;
    color: #000 !important;
  }

  &:hover,
  &:focus {
    background: #fff032 !important;
  }
  &:disabled {
    background: #e1e1e1;
    &:hover,
    &:focus {
      background: #e1e1e1 !important;
    }
  }
}

h1 {
  font-family: exocet;
  text-align: center;
}

p {
  font-family: codesaver;
}

.v-dialog:not(.v-dialog--fullscreen) {
  @media screen and (max-width: 1020px) {
    margin: 15px;
  }
}
</style>
