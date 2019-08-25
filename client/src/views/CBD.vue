<template>
  <div id="main-container">
    <TopNav />

    <div class="content-container">
      <div class="the-sanctuary">
        <h1>Cheezyverse Beliefs Distribution</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <div class="elements">
          <div class="neutral">
            <img src="../assets/neutral-white.svg" alt />
            <h2>000000</h2>
            <h3>The Grate Balance</h3>
          </div>
          <div class="water">
            <img src="../assets/water-white.svg" alt />
            <h2>000000</h2>
            <h3>The Grate Wave</h3>
          </div>
          <div class="wind">
            <img src="../assets/wind-white.svg" alt />
            <h2>000000</h2>
            <h3>The Grate Storm</h3>
          </div>
          <div class="fire">
            <img src="../assets/fire-white.svg" alt />
            <h2>000000</h2>
            <h3>The Grate Flames</h3>
          </div>
          <div class="mold">
            <img src="../assets/mold-white.svg" alt />
            <h2>000000</h2>
            <h3>The Grate Mold</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "../components/TopNav.vue";

export default {
  components: { TopNav },
  data: () => ({})
};
</script>
<style lang="scss" scoped>
#main-container {
  background: url("../assets/grid.svg");
  height: 96vh;
  background-position-y: -12vh;
  margin: 2rem 0 0 1rem;

  @media screen and (max-width: 1020px) {
    margin: 1rem;
  }

  .content-container {
    display: flex;
    flex-direction: row;
    margin-top: 2rem;

    .the-sanctuary {
      @media screen and (max-width: 1020px) {
        width: 100%;
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

        @media screen and (max-width: 1020px) {
          flex-direction: column;
          padding: 0;
          align-items: center;
        }

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
        .mold {
          background-color: var(--darkblue);
          img {
            padding: 5.5rem 0;
          }
        }
      }
    }
  }
}
</style>
