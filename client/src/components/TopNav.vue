<template>
  <div class="topnav">
    <img src="../assets/cheezedao.svg" alt />
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

  .button-container {
    padding: 0 2rem;
    width: 30rem;
    display: flex;
    justify-content: space-between;
  }
}
</style>