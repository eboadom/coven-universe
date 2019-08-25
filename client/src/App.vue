<template>
  <v-app id="app">
    <router-view />
  </v-app>
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
  box-shadow: 3px 4px 0px 0px rgba(0, 0, 0, 1);
  width: 12rem;
  height: 3rem;
  background: white;

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

