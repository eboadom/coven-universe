<template>
  <div id="main-container">
    <div class="topnav">
      <img src="../assets/cheezedao.svg" alt />
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
        <router-link to="/cowvenhome">Active Proposals</router-link>
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
        <h1>Make a Proposal</h1>
        <div class="proposal-container">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-select
              v-model="select"
              :items="proposal"
              :rules="[v => !!v || 'Item is required']"
              label="What do you propose?"
              required
            ></v-select>

            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="Enter Wizard ID"
              required
            ></v-text-field>

            <v-textarea label="Reason" auto-grow outlined rows="9" row-height="15"></v-textarea>
          </v-form>
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
              <button class="button" v-on="on">Make Proposal</button>
            </template>

            <v-card class="dialog">
              <img src="../assets/wheel.svg" alt />
              <h1>Thank You</h1>
              <v-card-text>You just submitted your proposal, let’s see what the rest of the Cowven thinks of your proposal.</v-card-text>

              <!-- <v-card-actions> -->
              <v-spacer></v-spacer>
              <button class="button" color="primary" text @click="dialog = false">Got it</button>
              <!-- </v-card-actions> -->
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      dialog: false,
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
        "Kick a Wizard from the Cowven",
        "Change activity penalty length",
        "Switch to a different Grate One"
      ]
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

    .make-proposal {
      padding: 0 8rem;
      width: 60%;

      h1 {
        padding: 1rem 0;
      }

      .proposal-container {
        border: 1px solid black;
        padding: 2rem;
        height: 30rem;
        text-align: center;

        p {
          padding: 1rem 0 3rem 0;
        }
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
</style>
