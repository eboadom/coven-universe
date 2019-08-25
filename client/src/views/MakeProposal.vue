<template>
  <div id="main-container">
    <TopNav />

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
        <router-link to="/cowvenhome">Active Spell Proposals</router-link>
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

      <div class="make-proposal">
        <h1>Cast a new spell</h1>
        <div class="proposal-container">
          <v-form ref="form" v-model="valid" lazy-validation>
            <div class="info-wrapper">
              <v-select
                v-model="select"
                :items="proposal"
                :rules="[v => !!v || 'Spell is required']"
                label="Choose your Spell"
                required
              ></v-select>

              <v-dialog v-model="dialogInfo" width="500">
                <template v-slot:activator="{ on }">
                  <img id="info-icon" src="../assets/info.svg" alt v-on="on" />
                </template>

                <v-card class="dialog" id="info-dialog">
                  <h4>Cut the cheese?</h4>
                  <p>Time to cut the cheeze with a Wizard ? Say no more, add its ID and we’ll take care of the rest</p>
                  <h4>Change activity penalty length</h4>
                  <p>Propose to increase or decrease the length of days a Wizards needs to be active.</p>
                  <h4>Convert your Cowven</h4>
                  <p>Cast a Spell which will change the Grate you all follow</p>
                </v-card>
              </v-dialog>
            </div>

            <v-text-field
              v-if="select =='Cut the cheese'"
              v-model="wizardId"
              :rules="[v => !!v || 'Wizard ID is required']"
              label="Enter Wizard ID"
              required
            ></v-text-field>

            <v-text-field
              v-if="select =='Change activity penalty length'"
              v-model="numDays"
              :rules="[v => !!v || 'Number of Days is required']"
              label="How many days?"
              required
            ></v-text-field>

            <v-select
              v-if="select =='Convert your Cowven'"
              v-model="grateOne"
              :items="grateOnes"
              :rules="[v => !!v || 'Grate One is required']"
              label="Whom do you worship?"
              required
            ></v-select>

            <v-textarea
              :counter="250"
              label="Oh but why?"
              auto-grow
              outlined
              rows="9"
              row-height="15"
            ></v-textarea>
          </v-form>
          <v-dialog v-model="dialogSpell" width="500">
            <template v-slot:activator="{ on }">
              <button class="button" v-on="on">Cast spell</button>
            </template>

            <v-card class="dialog">
              <img src="../assets/wheel.svg" alt />
              <h1>Thank You</h1>
              <v-card-text>You have casted your spell proposal. It will now be reviewed by the Cowven, drink milk in the meantime.</v-card-text>

              <v-spacer></v-spacer>
              <button class="button" color="primary" text @click="dialog = false">Gouda'nough</button>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "../components/TopNav.vue";

export default {
  components: { TopNav },
  data() {
    return {
      search: "",
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
      ],
      dialogInfo: false,
      dialogSpell: false,
      valid: true,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      select: null,
      proposal: [
        "Cut the cheese",
        "Change activity penalty length",
        "Convert your Cowven"
      ],
      grateOnes: [
        "The Grate Balance",
        "The Grate Wave",
        "The Grate Storm",
        "The Grate Flames"
      ],
      grateOne: null
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
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

  .header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media screen and (max-width: 1020px) {
      flex-direction: column;
    }

    h1 {
    }
    .center-container {
      display: flex;
      flex-direction: column;

      @media screen and (max-width: 1020px) {
        text-align: center;
      }

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

    @media screen and (max-width: 1020px) {
      flex-direction: column;
    }

    .leaderboard {
      width: 100%;
      padding: 0 8rem;

      @media screen and (max-width: 1020px) {
        padding: 0;
      }

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

    .make-proposal {
      padding: 0 8rem;
      width: 60%;

      @media screen and (max-width: 1020px) {
        padding: 0;
        width: 100%;
      }

      h1 {
        padding: 1rem 0;
      }

      .proposal-container {
        border: 1px solid black;
        padding: 2rem;
        height: 30rem;
        text-align: center;
        background: white;

        p {
          padding: 1rem 0 3rem 0;
        }
        img {
          width: 10rem;
        }

        .info-wrapper {
          display: flex;
          flex-direction: row;

          #info-icon {
            width: 1.5rem;
          }
        }
      }
    }
  }
}

.v-sheet {
  img {
    width: 4rem;
    @media screen and (max-width: 1020px) {
      width: 2rem;
    }
  }

  h1 {
    @media screen and (max-width: 1020px) {
      font-size: 1.5rem;
    }
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

#info-dialog {
  display: flex;
  padding: 2rem;
  justify-content: space-between;
  text-align: left;

  h4 {
    text-decoration: underline;
    font-family: codesaver;
  }
}
</style>
