<template>
  <div>
    <TopNav />
    <div class="my-container">
      <div class="the-sanctuary">
        <div class="title-inner">
          <h1>Cheezyverse Beliefs Distribution</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div class="elements">
          <div class="item neutral">
            <div class="image-inner">
              <img src="../assets/neutral-white.svg" alt />
            </div>

            <h2>000000</h2>
            <h3>The Grate Balance</h3>
          </div>
          <div class="item water">
            <div class="image-inner">
              <img src="../assets/water-white.svg" alt />
            </div>

            <h2>000000</h2>
            <h3>The Grate Wave</h3>
          </div>
          <div class="item wind">
            <div class="image-inner">
              <img src="../assets/wind-white.svg" alt />
            </div>

            <h2>000000</h2>
            <h3>The Grate Storm</h3>
          </div>
          <div class="item fire">
            <div class="image-inner">
              <img src="../assets/fire-white.svg" alt />
            </div>

            <h2>000000</h2>
            <h3>The Grate Flames</h3>
          </div>
          <div class="item mold">
            <div class="image-inner">
              <img src="../assets/mold-white.svg" alt />
            </div>

            <h2>000000</h2>
            <h3>The Grate Mold</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Preloader from "../components/Preloader.vue";
import TopNav from "../components/TopNav.vue";

export default {
  components: {
    Preloader,
    TopNav
  },
  data: () => ({})
};
</script>
<style lang="scss" scoped>
@import "../style/screen-size";
@import "../style/vars";

.the-sanctuary {
  margin-bottom: 30px;
  .title-inner {
    margin-bottom: 60px;
    text-align: center;
    @include respond-to(lg) {
      margin-bottom: 40px;
    }

    h1 {
      font-size: 30px;
      margin-bottom: 10px;
    }
    p {
      width: 60%;
      margin: 0 auto;
      @include respond-to(lg) {
        width: 70%;
      }
      @include respond-to(sm) {
        width: 100%;
      }
    }
  }

  .elements {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @include respond-to(lg) {
      justify-content: center;
    }

    .item {
      width: 220px;
      border: solid 1px #000000;
      text-align: center;
      padding: 60px 10px 25px;
      color: #fff;
      @include respond-to(xl) {
        padding: 40px 10px 15px;
      }

      @include respond-to(lg) {
        margin: 10px;
      }

      .image-inner {
        height: 130px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
        @include respond-to(xl) {
          height: 100px;
        }
        img {
          width: 120px;
          max-height: 130px;
          @include respond-to(xl) {
            max-height: 100px;
            width: 95px;
          }
        }
      }

      h2 {
        font-family: codesaver;
        margin-bottom: 10px;
        font-size: 45px;
        font-weight: lighter;
        @include respond-to(xl) {
          font-size: 38px;
        }
      }

      h3 {
        font-family: codesaver;
        font-size: 19px;
        margin: 0;
        font-weight: lighter;
      }
    }
  }

  .neutral {
    background: $purple;
  }

  .water {
    background: $blue;
  }

  .wind {
    background: $green;
  }

  .fire {
    background: $red;
  }

  .mold {
    background: $darkblue;
  }
}
</style>
