<template>
  <div class="landing">
    <img class="left-cloud" alt="Left Cloud" src="../assets/cloud-left.svg" />
    <img class="right-cloud" alt="Right Cloud" src="../assets/cloud-right.svg" />
    <!-- <img class="bottom-cheese" alt="Bottom Cheese" src="../assets/bottom-cheese.svg"> -->
    <img class="bottom-cloud" alt="Bottom Cloud" src="../assets/bottom-cloud.svg" />

    <!-- <img class="paper-banner" alt="Paper Banner" src="../assets/paper-banner.svg"> -->
    <div class="container">
      <h1>Cheeze DAO</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <button class="button">
        <router-link to="/home">Enter the Cheeze</router-link>
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
<style>
.button {
  background: rgba(0, 0, 0, 0);
  border: 1px solid #000;
  padding: 8px 16px;
  color: #000;
  margin-top: 0;
  box-shadow: 3px 4px 0px 0px rgba(0, 0, 0, 1);
  width: 12rem;
  height: 3rem;
}

.button > a {
  text-decoration: none;
}

.button:hover,
.button:focus {
  background: #fff032;
  /* color: #fff; */
}

.container {
  /* background: transparent url("../assets/paper-banner.svg") no-repeat fixed center; */
  width: 43%;
  left: 20%;
  top: 20%;
  padding: 0 8rem;
  position: absolute;
  text-align: center;
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

h1 {
  font-family: exocet;
  font-size: 5rem;
  width: 66%;
  margin: auto;
}

p {
  font-family: codesaver;
  margin: 4rem 0;
}
</style>