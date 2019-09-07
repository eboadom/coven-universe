<template>
  <div class="topnav">
    <router-link :to="{ name: 'home' }">
      <img src="../assets/cheezedao.svg" alt />
    </router-link>
    <div class="button-container">
      <router-link :to="{ name: 'cbd' }">
        <button class="button">
          CBD
        </button>
      </router-link>
      <router-link :to="{ name: 'mywizards' }">
        <button class="button">
          My Wizards
        </button>
      </router-link>
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
