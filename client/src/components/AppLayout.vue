<template>
  <div v-if="dapperUnlocked" class="app">
    <div id="main-container">
      <TopNav />
      <router-view />
    </div>
  </div>
  <div v-else-if="loading">loading</div>
  <unlock-dapper v-else :onUnlockClick="unlockDapper" />
</template>

<script>
import UnlockDapper from "../views/UnlockDapper";
import TopNav from "../components/TopNav.vue";
export default {
  name: "AppLayout",
  components: {
    UnlockDapper,
    TopNav
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
      if (typeof window.ethereum !== "undefined" && window.ethereum.isDapper) {
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
#main-container {
  background: url("../assets/grid.svg");
  height: 96vh;
  background-position-y: -12vh;
  margin: 2rem 0 0 1rem;

  @media screen and (max-width: 1020px) {
    margin: 1rem;
  }
}
</style>
