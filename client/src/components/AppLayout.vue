<template>
  <div v-if="dapperUnlocked" class="app">
    <div id="main-container">
      <router-view />
    </div>
  </div>
  <div v-else-if="loading"><Preloader /></div>
  <unlock-dapper v-else :onUnlockClick="unlockDapper" />
</template>

<script>
import UnlockDapper from "../views/UnlockDapper";
import Preloader from "../components/Preloader.vue";
import { getWeb3 } from "../helpers/web3-helpers";
export default {
  name: "AppLayout",
  components: {
    UnlockDapper,
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
        const web3 = getWeb3();
        this.dapperAvailable = true;
        const currentNetwork = await web3.eth.net.getNetworkType();
        if(process.env.VUE_APP_ETH_NETWORK  === currentNetwork) {
          try {
            await web3.givenProvider.enable();
            const accounts = await web3.eth.getAccounts();
            if (accounts && accounts.length) {
              this.dapperUnlocked = true;
              //TODO: replace with something Vue specific
              window.userWallet = accounts[0];
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
          }
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
