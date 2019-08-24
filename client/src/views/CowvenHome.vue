<template>
  <div id="main-container">
    <div class="topnav">
      <router-link to="/home">
        <img src="../assets/cheezedao.svg" alt />
      </router-link>
      <div class="button-container">
        <button class="button">
          <router-link to="/home">Sanctuary</router-link>
        </button>
        <button class="button">
          <router-link to="/mywizards">My Wizards</router-link>
        </button>
      </div>
    </div>

    <div class="header-container">
      <h1>Cowven Home</h1>
      <div class="center-container">
        <p>“Cowven unique description that the creator entered in the ‘create a cowven’ screen”</p>
        <div class="stats">
          <p>Rank #000</p>
          <p>Score #000</p>
          <p>Wins #000</p>
          <p>Losses #000</p>
          <p>Penalty #000</p>
        </div>
      </div>

      <button>
        <router-link to="/makeproposal">Make Proposal</router-link>
      </button>
    </div>

    <div class="content-container">
      <div class="leaderboard">
        <v-card>
          <v-data-table :headers="headers" :items="grates" :search="search">
            <template v-slot:item.wizard="{ item }">
              <img :src="require(`@/assets/${item.wizard}.png`)" />
            </template>
          </v-data-table>
        </v-card>
      </div>

      <div class="spell-proposals">
        <h1>Spell Proposals</h1>
        <div v-for="proposal in proposals" class="proposal-container">
          <div class="topline">
            <p>Spell: {{proposal.spell}}</p>
            <p v-if="proposal.wizardId !== null">Wizard #{{proposal.wizardId}}</p>
          </div>
          <hr />
          <p class="description">{{proposal.description}}</p>
          <button class="button vote">Nay</button>

          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
              <button class="button vote" v-on="on">Aye</button>
            </template>

            <v-card class="dialog">
              <img src="../assets/wheel.svg" alt />
              <h1>Thank You</h1>
              <v-card-text>You expressed yourself and that’s beautiful as a gallon of milk but let’s see if the majority agrees</v-card-text>

              <!-- <v-card-actions> -->
              <v-spacer></v-spacer>
              <button class="button" color="primary" text @click="dialog = false">Got it</button>
              <!-- </v-card-actions> -->
            </v-card>
          </v-dialog>
        </div>
      </div>

      <!-- <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <button class="button vote" v-on="on">Aye</button>
        </template>

        <v-card class="dialog">
          <img src="../assets/wheel.svg" alt />
          <h1>Thank You</h1>
          <v-card-text>You applied. Sweet. This is the first step of a long bureacratic process within the CheezeWizarding world. Luckily for you, this world exists on a different timescale so… it’s really down to how long the Cheeze Wizards members of this Cowven take to accept or reject you, meh.</v-card-text>

          <v-spacer></v-spacer>
          <button class="button" color="primary" text @click="dialog = false">Gouda'nough</button>
        </v-card>
      </v-dialog>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      search: "",
      proposals: [
        {
          spell: "Cut the cheese",
          wizardId: "1380",
          description:
            "This Wizard is cheap cheddar for for fast-food chains. Time to unload this dude!"
        },
        {
          spell: "Convert Cowven",
          wizardId: null,
          description:
            "Let’s switch to the god of flames. This seems to be the best tactical move for next season. "
        },
        {
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
          id: "#0000"
        },
        {
          wizard: "water-wizard",
          rank: "#2",
          score: "9000+",
          reputation: "000",
          id: "#0000"
        },
        {
          wizard: "wind-wizard",
          rank: "#3",
          score: "9000+",
          reputation: "000",
          id: "#0000"
        },
        {
          wizard: "neutral-wizard",
          rank: "#4",
          score: "9000+",
          reputation: "000",
          id: "#0000"
        },
        {
          wizard: "fire-wizard",
          rank: "#1",
          score: "9000+",
          reputation: "000",
          id: "#0000"
        },
        {
          wizard: "water-wizard",
          rank: "#2",
          score: "9000+",
          reputation: "000",
          id: "#0000"
        },
        {
          wizard: "wind-wizard",
          rank: "#3",
          score: "9000+",
          reputation: "000",
          id: "#0000"
        },
        {
          wizard: "neutral-wizard",
          rank: "#4",
          score: "9000+",
          reputation: "000",
          id: "#0000"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
#main-container {
  background: url("../assets/grid.svg");
  height: 96vh;
  background-position-y: -12vh;
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

  .header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    h1 {
    }
    .center-container {
      display: flex;
      flex-direction: column;

      .stats {
        display: flex;
        justify-content: space-between;
      }
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

    .spell-proposals {
      padding: 0 8rem;
      overflow: scroll;
      max-height: 49rem;

      h1 {
        padding: 1rem 0;
      }

      .proposal-container {
        border: 1px solid black;
        padding: 1rem;
        height: 13rem;
        text-align: center;
        box-shadow: 3px 4px 0px 0px rgba(0, 0, 0, 1);
        margin-bottom: 2rem;
        background-color: white;

        .topline {
          display: flex;
          justify-content: space-between;
        }

        .vote {
          width: 7rem;
          margin: 0 1rem;
        }
        // .description {
        //   padding: 1rem 0 3rem 0;
        // }
        img {
          width: 10rem;
        }
      }
    }
  }
}

.v-sheet {
  img {
    width: 4rem;
  }
}

.dialog {
  display: flex;
  flex-direction: column;
  vertical-align: center;
  height: 25rem;
  text-align: center;

  img {
    padding: 2rem 0;
    margin: auto;
  }

  .v-card__text {
    padding: 3rem;
    padding-bottom: 0;
  }

  button {
    margin: auto;
    margin-bottom: 2rem;
  }
}

.v-card {
  &::before {
    background: url("../assets/bottom-left.svg");
    width: 4rem;
    content: "";
    position: absolute;
    height: 5rem;
    background-size: cover;
    background-repeat: no-repeat;
    top: 91%;
    left: -2%;
  }

  &::after {
    background: url("../assets/top-right.svg");
    width: 4rem;
    content: "";
    height: 6rem;
    position: absolute;
    height: 4rem;
    background-size: cover;
    background-repeat: no-repeat;
    top: -2%;
    right: -2%;
  }
}
</style>
