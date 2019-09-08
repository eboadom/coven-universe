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
@import "../style/screen-size";

.topnav {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px 30px;

  @include respond-to(sm) {
    flex-direction: column;
  }

  img {
    width: 200px;
  }

  .button-container {
    @include respond-to(sm) {
      margin-top: 15px;
    }
    @include respond-to(xs) {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
    }

    a {
      margin-left: 40px;
      @include respond-to(sm) {
        margin-left: 25px;
      }
      @include respond-to(xs) {
        margin: 15px 0 0 0;
      }

      &:first-child {
        margin: 0;
      }
    }
  }
}
</style>
