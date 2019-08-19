<template>
  <div class="landing">
    <img class="left-cloud" alt="Left Cloud" src="../assets/cloud-left.svg">
    <img class="right-cloud" alt="Right Cloud" src="../assets/cloud-right.svg">
    <!-- <img class="bottom-cheese" alt="Bottom Cheese" src="../assets/bottom-cheese.svg"> -->
    <img class="bottom-cloud" alt="Bottom Cloud" src="../assets/bottom-cloud.svg">

    <!-- <img class="paper-banner" alt="Paper Banner" src="../assets/paper-banner.svg"> -->
    <div class="container">
      <!-- <h1>Cheeze DAO</h1> -->
      <img src="../assets/cheezedao.svg" alt>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <button class="button">
        <router-link to="/home">Enter the Cheeze</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import { initDapper } from "../utils/dapper.js";
export default {
  name: "landing",
  beforeCreate() {
    initDapper();
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.landing {
  .container {
    /* background: transparent url("../assets/paper-banner.svg") no-repeat fixed center; */
    width: 50%;
    left: 25%;
    top: 20%;
    padding: 0 8rem;
    position: absolute;
    text-align: center;

    img {
      width: 24rem;
    }
    h1 {
      font-size: 5rem;
      width: 66%;
      margin: auto;
    }

    p {
      margin: 4rem 0;
    }
  }

  .paper-banner {
    width: 60%;
    left: 20%;
    top: 28%;
    position: absolute;
  }

  .left-cloud {
    position: absolute;
    left: -10rem;
    width: 40rem;
    top: 2rem;
  }

  .right-cloud {
    top: -10rem;
    right: -44rem;
    position: absolute;
    width: 80rem;
  }

  .bottom-cheese,
  .bottom-cloud {
    position: absolute;
    bottom: 0;
    width: 100vw;
    left: 0;
  }
}
</style>