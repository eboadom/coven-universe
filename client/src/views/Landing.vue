<template>
  <div class="landing">
    <img class="left-cloud" alt="Left Cloud" src="../assets/cloud-left.svg" />
    <img class="right-cloud" alt="Right Cloud" src="../assets/cloud-right.svg" />
    <!-- <img class="bottom-cheese" alt="Bottom Cheese" src="../assets/bottom-cheese.svg"> -->
    <img class="bottom-cloud" alt="Bottom Cloud" src="../assets/bottom-cloud.svg" />

    <!-- <img class="paper-banner" alt="Paper Banner" src="../assets/paper-banner.svg"> -->
    <div class="container">
      <!-- <h1>Cheeze DAO</h1> -->
      <img src="../assets/cheezedao.svg" alt />
      <p>The BigCheeze is still out there and already Wizards are sliding into each others DMs asking what’s next… Will the silent majority of the Neutral gain momentum…? Are Elementals able to keep order within their own ranks ? Will CheezeWizards realize that they all have a bit of Mold in them…? Did you drank enough water today?</p>
      <p>CheezeDAO is the political extension of the Cheezyverse, it’s games within a game on top of a game (wow Ethereum gaming lego :mindblown emoji:) enabling you to join or create a team, choose one of the Grate to follow and govern it based on your gaming skills !</p>
      <button class="button">
        <router-link to="/home">Enter the Cheeze</router-link>
      </button>
    </div>

    <v-dialog v-model="dialogSpell" width="500">
      <template v-slot:activator="{ on }">
        <button id="faq" class="button" v-on="on">FAQ</button>
      </template>

      <v-card class="dialog">
        <img id="X" src="../assets/X.svg" alt />
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
export default {
  name: "landing",
  components: {}
};
</script>
<style lang="scss" scoped>
.landing {
  .container {
    /* background: transparent url("../assets/paper-banner.svg") no-repeat fixed center; */
    width: 50%;
    left: 25%;
    top: 20%;
    padding: 0 8rem;
    position: absolute;
    text-align: center;

    img {
      width: 24rem;
    }
    h1 {
      font-size: 5rem;
      width: 66%;
      margin: auto;
    }

    p {
      margin: 4rem 0;
    }
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
  }

  .right-cloud {
    top: -10rem;
    right: -44rem;
    position: absolute;
    width: 80rem;
  }

  .bottom-cheese,
  .bottom-cloud {
    position: absolute;
    bottom: 0;
    width: 100vw;
    left: 0;
  }
}
</style>