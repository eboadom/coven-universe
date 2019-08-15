<template>
  <div id="main-container">
    <div class="topnav">
      <img src="../assets/cheezedao.svg" alt />
      <div class="button-container">
        <button class="button">Sanctuary</button>
        <button class="button">My Wizards</button>
      </div>
    </div>

    <div class="content-container">
      <div class="the-sanctuary">
        <h1>The Sanctuary</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <div class="neutral">
          <img src alt />
          <h2>000000</h2>
        </div>
        <div class="water">
          <img src alt />
          <h2>000000</h2>
        </div>
        <div class="wind">
          <img src alt />
          <h2>000000</h2>
        </div>
        <div class="fire">
          <img src alt />
          <h2>000000</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {}
};
</script>
<style lang="scss" scoped>
#main-container {
  margin: 2rem 0 0 1rem;
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
  .content-container {
    display: flex;
    flex-direction: row;
    margin-top: 2rem;

    .leaderboard {
      width: 100%;
      padding: 0 8rem;
      h1 {
        font-size: 3rem;
        padding: 1rem 0;
      }

      .v-card {
        border: 1px solid black;
        box-shadow: none;
        padding: 0 2rem 2rem 2rem;
        font-family: codesaver;
      }
    }

    .create-coven {
      padding: 0 8rem;

      h1 {
        padding: 1rem 0;
      }

      .form-container {
        border: 1px solid black;
        padding: 2rem;
        height: 30rem;
        text-align: center;
        p {
          padding: 1rem 0 3rem 0;
        }
        img {
          width: 10rem;
        }
      }
    }
  }
}
</style>
