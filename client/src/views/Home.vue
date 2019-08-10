<template>
  <div class="home">
    <img class="left-cloud" alt="Left Cloud" src="../assets/cloud-left.svg">
    <img class="right-cloud" alt="Right Cloud" src="../assets/cloud-right.svg">
    <!-- <img class="bottom-cheese" alt="Bottom Cheese" src="../assets/bottom-cheese.svg"> -->
    <img class="bottom-cloud" alt="Bottom Cloud" src="../assets/bottom-cloud.svg">
    
    
    <img class="paper-banner" alt="Paper Banner" src="../assets/paper-banner.svg">
    <div class="container">
      <h1>Cheeze DAO</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <button></button>
    </div>

    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    
  }
}
</script>
<style>
.container {
        /* background: transparent url("../assets/paper-banner.svg") no-repeat fixed center; */
    width: 43%;
    left: 22%;
    top: 35%;
    padding: 0 8rem;
    position: absolute;
}

.paper-banner{
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

.bottom-cheese, .bottom-cloud {
      position: absolute;
    bottom: 0;
    width: 100vw;
    left: 0;

}
</style>