<template>
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
          v-if="select === 'Cut the cheese'"
          v-model="wizardId"
          :rules="[v => !!v || 'Wizard ID is required']"
          label="Enter Wizard ID"
          required
        ></v-text-field>

        <v-text-field
          v-if="select === 'Change activity penalty length'"
          v-model="numDays"
          :rules="[v => !!v || 'Number of Days is required']"
          label="How many days?"
          required
        ></v-text-field>

        <v-select
          v-if="select === 'Convert your Cowven'"
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
</template>

<script>
  export default {
    name: "MakeProposal",
    data() {
      return {
        valid: true,
        name: "",
        dialogInfo: false,
        dialogSpell: false,
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
      }
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