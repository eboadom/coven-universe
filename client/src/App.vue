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
@import "./style/screen-size";

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

* {
  box-sizing: border-box;
}

html {
  overflow: auto !important;
  overflow-x: hidden !important;
}

body {
  margin: 0;
  background: transparent url("./assets/background.svg") no-repeat fixed center;
  min-width: 320px !important;
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
  transition: all 0.3s ease;

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
  @include respond-to(md) {
    margin: 15px;
  }
}

.my-container {
  width: 1240px;
  padding: 0 15px;
  margin: 0 auto;
  overflow-x: hidden;
  position: relative;
  @include respond-to(lg) {
    width: 991px;
  }
  @include respond-to(md) {
    width: 750px;
  }
  @include respond-to(sm) {
    width: 100%;
    padding: 0 10px;
  }
}
</style>
