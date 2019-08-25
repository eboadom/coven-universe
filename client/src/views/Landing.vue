<template>
  <div class="landing">
    <img class="left-cloud" alt="Left Cloud" src="../assets/cloud-left.svg" />
    <img class="right-cloud" alt="Right Cloud" src="../assets/cloud-right.svg" />
    <img class="bottom-cloud" alt="Bottom Cloud" src="../assets/bottom-cloud.svg" />

    <div class="container">
      <!-- <h1>Cheeze DAO</h1> -->
      <img class="dao-logo" src="../assets/cheezedao.svg" alt />
      <p>The BigCheeze is still out there and already Wizards are sliding into each others DMs asking what’s next… Will the silent majority of the Neutral gain momentum…? Are Elementals able to keep order within their own ranks ? Will CheezeWizards realize that they all have a bit of Mold in them…? Did you drank enough water today?</p>
      <p>CheezeDAO is the political extension of the Cheezyverse, it’s games within a game on top of a game (wow Ethereum gaming lego :mindblown emoji:) enabling you to join or create a team, choose one of the Grate to follow and govern it based on your gaming skills !</p>
      <button id="enter" class="button">
        <router-link to="/home">Enter the Cheeze</router-link>
      </button>
      <a class="twitter" href="https://twitter.com/CheezeDao">
        <img src="../assets/twitter.svg" alt />
      </a>
    </div>

    <v-dialog id="faq-dialog" width="50%">
      <template v-slot:activator="{ on }">
        <button id="faq" class="button" v-on="on">FAQ</button>
      </template>

      <v-card class="dialog">
        <!-- <img id="X" src="../assets/X.svg" alt /> -->
        <h1>Frequently Cheesed Questions</h1>
        <h2>What is CheezeDAO?</h2>
        <p>CheezeDAO the political extension of the Cheezyverse, it is a governance experiment looking to showcase the possibilities of liquid and skill based governance while bringing cross tournament ranking, team playing and engagement incentive to extensibles games.</p>
        <h2>What is a Cowven (pronounced Cow-Ven) ?</h2>
        <p>Like a Coven but following the Holy Cow, a Cowven is an association of Cheeze Wizards. Join one or create your own to be that kind of cheese, ya know 😏 Within your Cowven you will get points according to your rank and will be able to take decisions with your team.</p>
        <h2>How to join or create a Cowven ?</h2>
        <p>On the homescreen of the Dapp, click “Create Cowven” to create it, you will then need to choose a name and a description for your team and the God you choose to follow.</p>
        <h2>Question title here</h2>
        <p>On the homescreen of the Dapp, click “Create Cowven” to create it, you will then need to choose a name and a description for your team and the God you choose to follow.</p>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { initDapper } from "../utils/dapper.js";
export default {
  name: "landing",
  beforeCreate() {
    initDapper();
  },
  components: {},
  created() {
    // document.getElementsByTagName("body")[0].style.overflow = "hidden";
  }
};
</script>
<style lang="scss" scoped>
.landing {
  background: url("../assets/colored-grid.svg");
  height: 100vh;
  .container {
    width: 50%;
    left: 25%;
    top: 15%;
    padding: 0 8rem;
    position: absolute;
    text-align: center;

    @media screen and (max-width: 1020px) {
      width: 100%;
      left: auto;
      top: auto;
      padding: 0;
    }

    .dao-logo {
      width: 24rem;
      @media screen and (max-width: 1020px) {
        width: 14rem;
      }
    }

    .twitter {
      img {
        display: block;
        margin: auto;
        padding-top: 1rem;
      }
    }

    h1 {
      font-size: 5rem;
      width: 66%;
      margin: auto;
    }

    p {
      margin: 2rem 0;

      @media screen and (max-width: 1020px) {
        margin: 2rem 1rem;
      }
    }

    #enter {
      background: white;
    }
  }

  #faq {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 2rem;
    background: white;
  }

  .paper-banner {
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
    @media screen and (max-width: 1020px) {
      left: 0;
      width: 20rem;
      top: 0rem;
    }
  }

  .right-cloud {
    top: -10rem;
    right: -44rem;
    position: absolute;
    width: 80rem;
    @media screen and (max-width: 1020px) {
      // display: none;
      width: 40rem;
    }
  }

  .bottom-cheese,
  .bottom-cloud {
    position: absolute;
    bottom: 0;
    width: 100vw;
    left: 0;
  }
}

#faq-dialog {
  width: 50% !important;
}

.v-dialog {
  width: 50% !important;
}

.dialog {
  height: 100%;
  font-family: codesaver;
  padding: 2rem;

  h1 {
    padding-bottom: 1rem;
  }

  h2 {
    text-decoration: underline;
    font-size: 20px;
  }
  #X {
    float: right;
  }
}
</style>