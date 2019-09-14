<template>
  <div>
    <TopNav />
    <div class="MakeProposal">
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
          <router-link class="change-link" :to="{ name: 'cowvenhome' }">
            Active Spell Proposals
          </router-link>
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

        <div class="make-proposal">
          <h2>Cast a new spell</h2>
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

                <v-dialog v-model="dialogInfo" content-class="thank-dialog">
                  <template v-slot:activator="{ on }">
                    <img
                      id="info-icon"
                      src="../assets/info.svg"
                      alt
                      v-on="on"
                    />
                  </template>

                  <v-card class="dialog" id="info-dialog">
                    <h4>Cut the cheese?</h4>
                    <p>
                      Time to cut the cheeze with a Wizard ? Say no more, add
                      its ID and we’ll take care of the rest
                    </p>
                    <h4>Change activity penalty length</h4>
                    <p>
                      Propose to increase or decrease the length of days a
                      Wizards needs to be active.
                    </p>
                    <h4>Convert your Cowven</h4>
                    <p>
                      Cast a Spell which will change the Grate you all follow
                    </p>
                  </v-card>
                </v-dialog>
              </div>

              <v-text-field
                v-if="select == 'Cut the cheese'"
                v-model="wizardId"
                :rules="[v => !!v || 'Wizard ID is required']"
                label="Enter Wizard ID"
                required
              ></v-text-field>

              <v-text-field
                v-if="select == 'Change activity penalty length'"
                v-model="numDays"
                :rules="[v => !!v || 'Number of Days is required']"
                label="How many days?"
                required
              ></v-text-field>

              <v-select
                v-if="select == 'Convert your Cowven'"
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
            <v-dialog v-model="dialogSpell" content-class="thank-dialog">
              <template v-slot:activator="{ on }">
                <button class="button" v-on="on">Cast spell</button>
              </template>

              <v-card class="dialog">
                <img src="../assets/wheel.svg" alt />
                <h1>Thank You</h1>
                <v-card-text
                  >You have casted your spell proposal. It will now be reviewed
                  by the Cowven, drink milk in the meantime.</v-card-text
                >

                <v-spacer></v-spacer>
                <button
                  class="button"
                  color="primary"
                  text
                  @click="dialogSpell = false"
                >
                  Gouda'nough
                </button>
              </v-card>
            </v-dialog>
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
          id: "#1234000"
        },
        {
          wizard: "water-wizard",
          rank: "#2",
          score: "9000+",
          reputation: "000",
          id: "#00123"
        },
        {
          wizard: "wind-wizard",
          rank: "#3",
          score: "9000+",
          reputation: "000",
          id: "#12340"
        },
        {
          wizard: "neutral-wizard",
          rank: "#4",
          score: "9000+",
          reputation: "000",
          id: "#01240"
        },
        {
          wizard: "fire-wizard",
          rank: "#1",
          score: "9000+",
          reputation: "000",
          id: "#3200"
        },
        {
          wizard: "water-wizard",
          rank: "#2",
          score: "9000+",
          reputation: "000",
          id: "#0100"
        },
        {
          wizard: "wind-wizard",
          rank: "#3",
          score: "9000+",
          reputation: "000",
          id: "#0001"
        },
        {
          wizard: "neutral-wizard",
          rank: "#4",
          score: "9000+",
          reputation: "000",
          id: "#0020"
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

  .make-proposal {
    width: 35%;
    @include respond-to(md) {
      width: 40%;
    }
    @include respond-to(sm) {
      width: 100%;
      margin-bottom: 50px;
    }

    h2 {
      font-size: 25px;
      font-family: "exocet";
      font-weight: 800;
      text-align: center;
      margin-bottom: 15px;
    }

    .proposal-container {
      border: 1px solid black;
      padding: 2rem;
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
          width: 1.2rem;
          margin-left: 15px;
          transition: all 0.3s ease;
          cursor: pointer;
          &:hover {
            transform: scale(1.1);
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
