<template>
  <div class="landing">
    <img class="left-cloud" alt="Left Cloud" src="../assets/cloud-left.svg" />
    <img
      class="right-cloud"
      alt="Right Cloud"
      src="../assets/cloud-right.svg"
    />
    <img
      class="bottom-cloud"
      alt="Bottom Cloud"
      src="../assets/bottom-cheese.svg"
    />

    <div class="container">
      <!-- <h1>Cheeze DAO</h1> -->
      <img class="dao-logo" src="../assets/cheezedao.svg" alt />
      <p>
        The BigCheeze is still out there and already Wizards are sliding into
        each others DMs asking what’s next… Will the silent majority of the
        Neutral gain momentum…? Are Elementals able to keep order within their
        own ranks ? Will CheezeWizards realize that they all have a bit of Mold
        in them…? Did you drank enough water today?
      </p>
      <p>
        CheezeDAO is the political extension of the Cheezyverse, it’s games
        within a game on top of a game (wow Ethereum gaming lego : &#x1f92f;
        enabling you to join or create a team, choose one of the Grate to follow
        and govern it based on your gaming skills !
      </p>
      <div class="button__inner">
        <button class="button" disabled title="Coming soon" v-if="isProduction">
          Enter the Cheeze
        </button>
        <router-link :to="{ name: 'home' }" v-else>
          <button class="button">
            Enter the Cheeze
          </button>
        </router-link>
        <a class="twitter" href="https://twitter.com/CheezeDao" target="_blank">
          <img src="../assets/twitter.svg" alt />
        </a>
      </div>
    </div>

    <v-dialog v-model="dialog" content-class="faq-dialog">
      <template v-slot:activator="{ on }">
        <button id="faq" class="button button-purpure" v-on="on">FAQ</button>
      </template>

      <v-card class="dialog">
        <button class="close-modal" @click="dialog = false">
          <img src="../assets/X.svg" alt />
        </button>
        <h1>Frequently Cheesed Questions</h1>

        <h2>What is CheezeDAO ?</h2>
        <p>
          CheezeDAO is the political extension of the Cheezyverse, it is a
          governance experiment looking to showcase the possibilities of liquid
          and skill based governance while bringing cross tournament ranking,
          team playing and engagement incentive to extensibles games.
          <br />
          CheezeDAO lower the entry barrier to play around with DAO as voting
          power is not defined by your identity nor your money but actually by
          your in game win/loss ratio and the reputation given to it, and this
          reputation is not attached to your wallet, but to your Cheeze wizards!
        </p>

        <h2>What is a Cowven (Pronounced Cow-Ven) ?</h2>
        <p>
          Like a Coven but following the Holy Cow, a Cowven is an association of
          Cheeze Wizards. Join one or create your own to be that kind of cheese,
          ya know 😏 <br />
          Within your Cowven you will get points according to your rank and will
          be able to take decisions with your team.
        </p>

        <h2>How to join or create a Cowven ?</h2>
        <p>
          On the homescreen, click “Create Cowven” to create it, you will then
          need to choose a name and a description for your team and the God you
          choose to worship.
        </p>

        <h2>Who are Grates Ones ?</h2>
        <p>
          The Grates are entities followed by wizards across the country, the
          majority of their followers is found is their respective territory but
          as crusts are shrinking, their reach is now expanding into other
          territory. <br />
          They organized as follows: <br />
          Grate Flame : This guy has no chill <br />
          Grate Wave : She got more flow than melting ice
          <br />
          Grate Balance : BasedGod was already taken
          <br />
          Grate Storm : She is literally a big fan <br />
          Grate Mold : They may or may not be <br />
          Could there be more..?
        </p>

        <h2>
          Hum, out of pure curiosity… Let's say I have a Water Wizard, can I
          join a Cowven following the Grate Flame ?
        </h2>
        <p>
          We encourage rebellion, deception and lawlessness! Any type of Wizard
          can melt for any of the Grates Ones.
        </p>

        <h2>
          What is the difference between my Score and my Reputation ?
        </h2>
        <p>
          The score is your cross tournament win/los ratio, once in a DAO, you
          are assigned or removed reputation based on that score
        </p>

        <h2>I am in the Cowven, now what ?</h2>
        <p>
          Gg m8, You can vote to accept a new member or propose to kick an
          existing one out of it, you can also make proposals to convert the
          affinity of your Cowven to another God, but be careful as your actions
          will have repercussions...
        </p>

        <h2>If I sell my wizard will it keep his ranking ?</h2>
        <p>
          Yes, your wizard really don’t need you. You are just an off chain
          avatar eating his distant family with bread.
        </p>

        <h2>Who are the cheesy minds behind this project ?</h2>
        <p>
          This project is led by
          <a href="https://twitter.com/JordanLzG" target="_blank">
            Jordan 'Rocamadour' Lazaro Gustave
          </a>, Ernesto 'Queixo Tetilla' Boado
          , Rowan 'Gouda Gouda' Van Ginkel, Andrey 'Пошехонский' Kozlov
          , Aleksander 'Костромской' Tkach and Cream
          Cheeze Andrew
        </p>

        <h2>What is the Wizard wallet ?</h2>
        <p>
          The Wizard Wallet allows us to assign a reputation directly to your
          Wizard, each wizards seat in an individual wallet to get reputation
          and govern their Cowven.
        </p>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "landing",
  data() {
    return {
      dialog: false,
      isProduction: false
    };
  }
};
</script>

<style lang="scss">
.faq-dialog {
  width: 50% !important;
  @media screen and (max-width: 1020px) {
    width: 100% !important;
  }
}
</style>

<style lang="scss" scoped>
@import "../style/screen-size";

.landing {
  background: url("../assets/colored-grid.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  position: relative;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  overflow-x: hidden;

  @include respond-to(md) {
    min-height: 100vh;
    height: auto;
  }

  @include respond-to(xs) {
    align-items: flex-end;
  }

  .container {
    max-width: 700px;
    text-align: center;
    position: relative;
    z-index: 5;
    padding: 1%;

    @include respond-to(md) {
      width: 100%;
    }

    .dao-logo {
      width: 24rem;
      @include respond-to(md) {
        width: 14rem;
      }
    }

    h1 {
      font-size: 5rem;
      width: 66%;
      margin: auto;
    }

    p {
      margin: 2rem 0;

      @include respond-to(md) {
        margin: 2rem 1rem;
      }
    }

    .button__inner {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      @include respond-to(md) {
        flex-direction: column;
        margin-bottom: 15px;
      }
      button {
        @include respond-to(md) {
          margin-bottom: 15px;
        }
      }
      .twitter {
        line-height: 0;
        position: absolute;
        right: 15%;
        top: 2px;
        @include respond-to(md) {
          position: relative;
          top: 0;
          right: 0;
        }
      }
    }
  }

  #faq {
    position: absolute;
    z-index: 3;
    bottom: 25px;
    right: 25px;
    width: 80px;
    @include respond-to(xs) {
      position: relative;
      bottom: 0;
      right: 0;
      margin: 0 25px 25px 0;
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
    @include respond-to(md) {
      left: 0;
      width: 20rem;
      top: 0;
    }
  }

  .right-cloud {
    top: -10em;
    right: -44rem;
    position: absolute;
    width: 85rem;
    @include respond-to(md) {
      display: none;
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

.dialog {
  height: 100%;
  font-family: codesaver;
  padding: 2rem;

  @include respond-to(md) {
    padding: 1rem;
  }

  h1 {
    padding-bottom: 1rem;
    @include respond-to(md) {
      font-size: 28px;
      text-align: left;
      padding-right: 40px;
    }
  }

  h2 {
    text-decoration: underline;
    font-size: 20px;
  }

  .close-modal {
    position: absolute;
    right: 10px;
    top: 10px;
    outline: none;
    &:hover {
      opacity: 0.7;
      transition: all 0.3s ease;
    }
  }
}
</style>
