<template>
  <div class="Preloader">
    <img class="cheese" alt="cheese" src="../assets/bottom-cheese.svg" />
    <div class="Preloader__logo">
      <img src="../assets/cheezedao.svg" alt="Dapper" />
    </div>

    <div class="Preloader__inner">
      <div class="Preloader__caption">
        <h1>Cheeze wait</h1>
      </div>

      <div class="Preloader__line">
        <div class="Preloader__animate-line">
          <div class="inner big-inner">
            <span class="big"></span>
            <span class="big"></span>
            <span class="big"></span>
            <span class="big"></span>
            <span class="big"></span>
            <span class="big"></span>
            <span class="big"></span>
            <span class="big"></span>
            <span class="big"></span>
            <span class="big"></span>
          </div>
          <div class="inner medium-inner">
            <span class="medium"></span>
            <span class="medium"></span>
            <span class="medium"></span>
            <span class="medium"></span>
            <span class="medium"></span>
            <span class="medium"></span>
            <span class="medium"></span>
            <span class="medium"></span>
            <span class="medium"></span>
            <span class="medium"></span>
          </div>
        </div>
      </div>
      <div class="Preloader__tips">
        <div class="Preloader__tip">
          <p>
            <span contenteditable="true" v-html="random()" class="tip"></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Preloader",
  data() {
    return {
      tips: [
        "Get Milky",
        "Today is going to be a Grate day",
        "Drink some water",
        "Your voting power depends on how good you perform in CW Duels",
        "Even Water Wizards can worship the Grate Flame",
        "Who is going to rule the Cheezyverse ?",
        "There is over 1200 French Cheese",
        "Tyrosemiophilia is the hobby of collecting cheese labels"
      ],
      already: []
    };
  },
  methods: {
    random() {
      return this.tips[Math.floor(Math.random() * this.tips.length)];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/screen-size";
@import "../style/vars";

.Preloader {
  position: relative;
  min-height: 100vh;
  height: 100%;
  background: transparent url("../assets/background.svg") no-repeat fixed center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  .cheese {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    object-fit: contain;
  }
}

.Preloader__logo {
  position: absolute;
  top: 20px;
  left: 30px;
}

.Preloader__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
  text-align: center;
  padding: 10px;
  position: relative;
  z-index: 10;
}

.Preloader__caption {
  margin-bottom: 20px;
}

.Preloader__line {
  max-width: 500px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 30px;
  border-radius: 25px;
  border: 1px solid #000;
  height: 40px;
}

.Preloader__animate-line {
  background: $primary;
  width: 70%;
  height: 100%;
  border-radius: 25px;
  border-right: 1px solid #000;
  border-left: 1px solid #000;
  animation: loading 5s ease infinite;
  -webkit-animation: loading 5s ease infinite;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  .inner {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    position: absolute;
    left: 0;
  }
  span {
    position: relative;
    background: #fff;
    border-radius: 50%;
    border: 1px solid #000;
    display: block;
    transform: scale(0.5);
    animation: skale 5s ease infinite;
    -webkit-animation: skale 5s ease infinite;
  }
  .big {
    width: 14px;
    height: 14px;
    z-index: 2;
    &:nth-child(2n + 1) {
      top: 9px;
    }
    &:nth-child(2n) {
      bottom: 9px;
    }
  }
  .medium {
    width: 8px;
    height: 8px;
    &:nth-child(2n + 1) {
      bottom: 1px;
    }
    &:nth-child(2n) {
      top: 2px;
    }
    &:nth-child(2n + 4) {
      top: 10px;
    }
    &:nth-child(2n + 5) {
      bottom: 10px;
    }
    &:nth-child(n + 7) {
      bottom: 4px;
    }
  }
}

@keyframes loading {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(150%);
  }
}

@keyframes skale {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
}

.Preloader__tip {
  p {
    font-weight: 400;
    font-size: 16px;
  }
  span {
    font-size: 20px;
    font-weight: 600;
    outline: none !important;
    cursor: default;
  }
}
</style>
