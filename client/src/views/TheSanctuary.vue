<template>
  <div id="main-container">
    <div class="topnav">
      <img src="../assets/cheezedao.svg" alt />
      <div class="button-container">
        <button class="button">
          <router-link to="/thesanctuary">Sanctuary</router-link>
        </button>
        <button class="button">
          <router-link to="/mywizards">My Wizards</router-link>
        </button>
      </div>
    </div>

    <div class="content-container">
      <div class="the-sanctuary">
        <h1>The Sanctuary</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <div class="elements">
          <div class="neutral">
            <img src="../assets/neutral-white.svg" alt />
            <h2>000000</h2>
            <h3>The Balance</h3>
          </div>
          <div class="water">
            <img src="../assets/water-white.svg" alt />
            <h2>000000</h2>
            <h3>The Ocean</h3>
          </div>
          <div class="wind">
            <img src="../assets/wind-white.svg" alt />
            <h2>000000</h2>
            <h3>The Storm</h3>
          </div>
          <div class="fire">
            <img src="../assets/fire-white.svg" alt />
            <h2>000000</h2>
            <h3>The Flames</h3>
          </div>
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

    .the-sanctuary {
      h1 {
      }

      p {
        width: 60%;
        margin: auto;
        text-align: center;
        padding: 3rem 0;
      }
      .elements {
        font-family: codesaver;
        color: white;
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        padding: 0 20rem;

        div {
          width: 15rem;
          height: 27rem;
          text-align: center;
          display: inline-block;
          border: 1px solid black;
          padding-top: 2rem;

          h2 {
            font-size: 3rem;
            font-weight: lighter;
            padding-bottom: 1rem;
          }

          h3 {
            font-weight: lighter;
            font-size: 1.5rem;
          }
        }
        .neutral {
          background-color: var(--purple);
          img {
            padding: 4rem 0;
          }
        }
        .water {
          background-color: var(--blue);
          img {
            padding: 4rem 0;
          }
        }
        .wind {
          background-color: var(--green);
          img {
            padding: 3rem 0;
          }
        }
        .fire {
          background-color: var(--red);
          img {
            padding: 2rem 0;
          }
        }
      }
    }
  }
}
</style>
