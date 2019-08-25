<template>
  <div class="topnav">
    <router-link to="/home">
      <img src="../assets/cheezedao.svg" alt />
    </router-link>
    <div class="button-container">
      <button class="button">
        <router-link to="/cbd">CBD</router-link>
      </button>
      <button class="button">
        <router-link to="/mywizards">My Wizards</router-link>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "TopNav"
};
</script>
<style lang="scss" scoped>
.topnav {
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1020px) {
    margin-bottom: 1rem;
  }
  img {
    @media screen and (max-width: 1020px) {
      width: 6rem;
    }
  }

  .button-container {
    padding: 0 2rem;
    width: 30rem;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 1020px) {
      width: 15rem;
      padding: 0;
    }
  }
}
</style>