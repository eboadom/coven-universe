<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Landing</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/home">Home</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
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
</style>
