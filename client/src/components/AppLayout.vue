<template>
  <div v-if="dapperUnlocked" class="app">
    <div id="main-container">
      <TopNav />
      <router-view />
    </div>
  </div>
  <div v-else-if="loading"><Preloader /></div>
  <unlock-dapper v-else :onUnlockClick="unlockDapper" />
</template>

<script>
import UnlockDapper from "../views/UnlockDapper";
import TopNav from "../components/TopNav.vue";
import Preloader from "../components/Preloader.vue";
export default {
  name: "AppLayout",
  components: {
    UnlockDapper,
    TopNav,
    Preloader
  },
  mounted() {
    this.unlockDapper();
  },
  data() {
    return {
      loading: true,
      dapperAvailable: false,
      dapperUnlocked: false
    };
  },
  methods: {
    async unlockDapper() {
      this.loading = true;
      if (typeof window.ethereum !== "undefined") {
        this.dapperAvailable = true;
        try {
          const accounts = await window.ethereum.enable();
          console.log(accounts);
          if (accounts && accounts.length) {
            this.dapperUnlocked = true;
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      }
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/screen-size";

#main-container {
  background: url("../assets/grid.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  min-height: 100vh;
  height: auto;

  @include respond-to(lg) {
    padding-bottom: 25px;
  }
}
</style>
