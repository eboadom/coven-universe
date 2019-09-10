<template>
  <div class="content-container">
    <div class="create-coven">
      <h1>Create Cowven</h1>
      <div class="form-container">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Cowven Name"
            data-vv-name="name"
            required
          ></v-text-field>

          <v-select
            v-model="selectGrates"
            :items="grates"
            :rules="[v => !!v || 'Item is required']"
            label="Choose your Grate One"
            data-vv-name="selectGrates"
            required
          ></v-select>

          <v-select
            v-model="selectDays"
            :items="days"
            :rules="[v => !!v || 'Item is required']"
            label="Activity"
            data-vv-name="selectDays"
            required
          ></v-select>

          <v-textarea
            label="Cowven Description"
            auto-grow
            outlined
            rows="9"
            row-height="15"
            data-vv-name="description"
          ></v-textarea>

          <button class="button" @click="submit">Start the Ritual</button>
        </v-form>
        <v-dialog v-model="dialog" width="500">
          <v-card class="dialog">
            <img src="../assets/wheel.svg" alt />
            <h1>Congoudalations!</h1>
            <v-card-text
              >Your Cowven has been summoned ! Convert Wizards to join your team
              and compete to hold the G.O.A.T. Cheeze title the
              longest</v-card-text
            >

            <router-link :to="{ name: 'cowvenhome' }">
              <button
                class="button modal-button"
                color="primary"
                text
                @click="dialog = false"
              >
                Go to Cowven
              </button>
            </router-link>
          </v-card>
        </v-dialog>
      </div>

      <a class="twitter" href="https://twitter.com/CheezeDao">
        <img src="../assets/twitter.svg" alt />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
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
    selectGrates: null,
    grates: [
      "The Grate One of The Balance",
      "The Grate One of The Ocean",
      "The Grate One of The Storm",
      "The Grate One of The Flames"
    ],
    selectDays: null,
    days: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30"
    ]
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    submit() {
      if (this.$refs.form.validate()) {
        console.log('submit');
        this.dialog = true;
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
.content-container {
  display: flex;
  flex-direction: row;
  margin-top: 2rem;

  .create-coven {
    margin: auto;
    width: 25%;

    @media screen and (max-width: 1020px) {
      margin: 0;
      width: 100%;
    }
    .form-container {
      .dialog {
        display: flex;
      }
    }
    h1 {
      padding: 1rem 0;
    }

    .form-container {
      border: 1px solid black;
      padding: 2rem;
      height: 34rem;
      text-align: center;
      background: white;

      form {
        padding-bottom: 1rem;
      }
      p {
        padding: 1rem 0 3rem 0;
      }
      img {
        width: 10rem;
      }
    }

    .twitter {
      img {
        display: block;
        margin: auto;
        padding-top: 1rem;
      }
    }
  }
}

.v-sheet {
  display: flex;
  flex-direction: column;
  vertical-align: center;
  height: 30rem;
  text-align: center;

  img {
    padding: 3rem 0;
  }

  h1 {
    @media screen and (max-width: 1020px) {
      font-size: 1.5rem;
    }
  }

  .v-card__text {
    padding: 3rem 3rem 0 3rem;
  }

  button {
    margin: auto;
  }
}
</style>
