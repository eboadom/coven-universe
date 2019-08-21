<template>
  <div class="landing">
    <img class="left-cloud" alt="Left Cloud" src="../assets/cloud-left.svg" />
    <img class="right-cloud" alt="Right Cloud" src="../assets/cloud-right.svg" />
    <img class="bottom-cloud" alt="Bottom Cloud" src="../assets/bottom-cloud.svg" />
    <div class="container">
      <img src="../assets/dapper-logo.png" alt />
      <p>It seems you need to unlock or connect your browser wallet to Cheeze DAO.</p>
      <p>Please proceed to do so.</p>

      <button class="button">
        <router-link to="/">Unlock Dapper</router-link>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "landing",
  components: {}
};
</script>
<style lang="scss" scoped>
.landing {
  background: url("../assets/colored-grid.svg");
  height: 96vh;
  background-position-y: -12vh;
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