<template>
  <div class="landing">
    <img class="left-cloud" alt="Left Cloud" src="../assets/cloud-left.svg" />
    <img
      class="right-cloud"
      alt="Right Cloud"
      src="../assets/cloud-right.svg"
    />
    <img
      class="bottom-cloud"
      alt="Bottom Cloud"
      src="../assets/bottom-cheese.svg"
    />
    <div class="container">
      <img src="../assets/dapper-logo.png" alt />
      <p>
        It seems you need to unlock or connect your browser wallet to Cheeze
        DAO.
      </p>
      <p>Please proceed to do so.</p>

      <button class="button" v-on:click="onUnlockClick">
        Unlock Dapper
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "unlock-dapper",
  components: {},
  props: {
    onUnlockClick: Function
  }
};
</script>

<style lang="scss" scoped>
.landing {
  background: url("../assets/colored-grid.svg");
  height: 100vh;
  position: relative;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  @media screen and (max-width: 1020px) {
    min-height: 100vh;
    height: auto;
  }

  @media screen and (max-width: 450px) {
    align-items: flex-end;
  }

  .container {
    max-width: 700px;
    text-align: center;
    position: relative;
    z-index: 5;
    padding: 1%;

    @media screen and (max-width: 1020px) {
      width: 100%;
    }

    img {
      width: 24rem;
      @media screen and (max-width: 500px) {
        width: 100%;
      }
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
    @media screen and (max-width: 1020px) {
      left: 0;
      width: 20rem;
      top: 0;
    }
  }

  .right-cloud {
    top: -10em;
    right: -44rem;
    position: absolute;
    width: 85rem;
    @media screen and (max-width: 1020px) {
      display: none;
    }
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
