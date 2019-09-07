<template>
  <div v-if="dapperUnlocked" class="app">
    <router-view />
  </div>
  <div v-else-if="loading">loading</div>
  <unlock-dapper v-else :onUnlockClick="unlockDapper" />
</template>

<script>
import UnlockDapper from "../views/UnlockDapper";
export default {
  name: "AppLayout",
  components: {
    UnlockDapper
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

<style scoped></style>
