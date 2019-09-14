<template>
  <div>
    <TopNav />
    <div class="CowvenJoin">
      <div class="header-container">
        <h1>cowven name</h1>

        <div class="center-container">
          <p>
            “Cowven unique description that the creator entered in the ‘create a
            cowven’ screen”
          </p>
          <div class="stats">
            <p>Rank #000</p>
            <p>Score #000</p>
            <p>Wins #000</p>
            <p>Losses #000</p>
            <p>Penalty #000</p>
          </div>
        </div>

        <div class="link-wrapper">
          <v-dialog v-model="joinDialog" content-class="thank-dialog">
            <template v-slot:activator="{ on }">
              <button class="button vote" v-on="on">Join +</button>
            </template>

            <v-card class="dialog">
              <img src="../assets/wheel.svg" alt />
              <h1>Thank You</h1>
              <v-card-text>
                You applied. Sweet. This is the first step of a long bureacratic
                process within the CheezeWizarding world. Luckily for you, this
                world exists on a different timescale so… it’s really down to
                how long the Cheeze Wizards members of this Cowven take to
                accept or reject you, meh.
              </v-card-text>

              <!-- <v-card-actions> -->
              <v-spacer></v-spacer>
              <button
                class="button"
                color="primary"
                text
                @click="joinDialog = false"
              >
                Gouda'nough
              </button>
              <!-- </v-card-actions> -->
            </v-card>
          </v-dialog>
        </div>
      </div>

      <div class="content-container">
        <div class="leaderboard">
          <v-card>
            <v-data-table
              :headers="headers"
              :items="grates"
              :search="search"
              :items-per-page="5"
            >
              <template v-slot:item.wizard="{ item }">
                <img
                  class="table-image"
                  :src="require(`@/assets/${item.wizard}.png`)"
                  alt
                />
              </template>
            </v-data-table>
          </v-card>
        </div>

        <div class="spell-proposals">
          <h2>Spell Proposals</h2>
          <div
            v-for="proposal in proposals"
            :key="proposal.id"
            class="proposal-container"
          >
            <div class="topline">
              <p>
                Spell: {{ proposal.spell }}
                <span v-if="proposal.wizardId !== null"
                  >Wizard #{{ proposal.wizardId }}</span
                >
              </p>
            </div>

            <p class="description">{{ proposal.description }}</p>

            <div class="buttons-inner">
              <button class="button vote">Nay</button>

              <v-dialog v-model="dialog" content-class="thank-dialog">
                <template v-slot:activator="{ on }">
                  <button class="button vote vote2" v-on="on">Aye</button>
                </template>

                <v-card class="dialog">
                  <img src="../assets/wheel.svg" alt />
                  <h1>Thank You</h1>
                  <v-card-text
                    >You expressed yourself and that’s beautiful as a gallon of
                    milk but let’s see if the majority agrees</v-card-text
                  >

                  <!-- <v-card-actions> -->
                  <v-spacer></v-spacer>
                  <button
                    class="button"
                    color="primary"
                    text
                    @click="dialog = false"
                  >
                    Got it
                  </button>
                  <!-- </v-card-actions> -->
                </v-card>
              </v-dialog>
            </div>
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
  data() {
    return {
      dialog: false,
      joinDialog: false,
      search: "",
      proposals: [
        {
          id: 1,
          spell: "Cut the cheese",
          wizardId: "1380",
          description:
            "This Wizard is cheap cheddar for for fast-food chains. Time to unload this dude!"
        },
        {
          id: 2,
          spell: "Convert Cowven",
          wizardId: null,
          description:
            "Let’s switch to the god of flames. This seems to be the best tactical move for next season. "
        },
        {
          id: 3,
          spell: "Length of Penalty",
          wizardId: null,
          description:
            "There seem to be a lot of inactive Wizards. I propose to change the activity penalty to 7 days."
        }
      ],
      headers: [
        {
          text: "",
          align: "left",
          sortable: false,
          value: "wizard"
        },
        {
          text: "Rank",
          align: "left",
          value: "rank"
        },
        { text: "Score", value: "score" },
        { text: "Reputation", value: "reputation" },
        { text: "ID", value: "id" }
      ],
      grates: [
        {
          wizard: "fire-wizard",
          rank: "#1",
          score: "9000+",
          reputation: "000",
          id: "#02310"
        },
        {
          wizard: "water-wizard",
          rank: "#2",
          score: "9000+",
          reputation: "000",
          id: "#0231200"
        },
        {
          wizard: "wind-wizard",
          rank: "#3",
          score: "9000+",
          reputation: "000",
          id: "#021312300"
        },
        {
          wizard: "neutral-wizard",
          rank: "#4",
          score: "9000+",
          reputation: "000",
          id: "#0021230"
        },
        {
          wizard: "fire-wizard",
          rank: "#1",
          score: "9000+",
          reputation: "000",
          id: "#0012320"
        },
        {
          wizard: "water-wizard",
          rank: "#2",
          score: "9000+",
          reputation: "000",
          id: "#012300"
        },
        {
          wizard: "wind-wizard",
          rank: "#3",
          score: "9000+",
          reputation: "000",
          id: "#002310"
        },
        {
          wizard: "neutral-wizard",
          rank: "#4",
          score: "9000+",
          reputation: "000",
          id: "#0123400"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../style/screen-size";
@import "../style/vars";

.header-container {
  padding-bottom: 10px;
  margin: 0 30px 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  @include respond-to(sm) {
    margin: 0 10px 30px;
  }
  h1 {
    font-size: 30px;
    width: 25%;
    text-align: left;
    @include respond-to(sm) {
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
    }
  }
  .center-container {
    width: 35%;
    text-align: center;
    @include respond-to(lg) {
      width: 45%;
    }
    @include respond-to(sm) {
      width: 100%;
      margin-bottom: 20px;
    }
    p {
      font-size: 16px;
      margin-bottom: 10px;
    }
    .stats {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .link-wrapper {
    width: 25%;
    text-align: right;
    @include respond-to(sm) {
      width: 100%;
    }
    .change-link {
      text-decoration: none;
      position: relative;
      color: #000;
      padding: 0 2px 5px;
      transition: all 0.3s ease;
      &:hover {
        color: $purple;
        &:after {
          width: 0;
          background: $purple;
        }
      }
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        transition: all 0.3s ease;
        background: #000;
        width: 100%;
        height: 1px;
      }
    }
  }
}

.content-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 30px 40px;
  @include respond-to(sm) {
    margin: 0 10px 30px;
    flex-direction: column-reverse;
  }

  .leaderboard {
    width: 45%;
    @include respond-to(lg) {
      width: 55%;
    }
    @include respond-to(sm) {
      width: 100%;
      margin-bottom: 15px;
    }
  }

  .table-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    margin-top: 8px;
    @include respond-to(sm) {
      width: 2rem;
      height: 2rem;
    }
  }

  .spell-proposals {
    width: 30%;
    @include respond-to(md) {
      width: 35%;
    }
    @include respond-to(sm) {
      width: 100%;
      margin-bottom: 50px;
    }
  }
}

.spell-proposals {
  h2 {
    font-size: 25px;
    font-family: "exocet";
    font-weight: 800;
    text-align: center;
    margin-bottom: 15px;
  }
}

.proposal-container {
  margin-bottom: 20px;
  border: solid 1px #000000;
  background-color: #ffffff;
  padding: 15px 15px 25px;
  box-shadow: 5px 5px 0 #000;
  .topline {
    p {
      margin-bottom: 10px;
      padding-bottom: 3px;
      border-bottom: 1px solid #000;
      width: 100%;
    }
  }
}

.buttons-inner {
  text-align: right;
  button {
    width: 80px;
    margin-left: 25px;
  }
  .vote2 {
    background: $primary;
    &:hover {
      background: $purple !important;
    }
  }
}
</style>
