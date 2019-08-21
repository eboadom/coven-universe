<template>
  <div id="main-container">
    <div class="topnav">
      <router-link to="/home">
        <img src="../assets/cheezedao.svg" alt />
      </router-link>
      <div class="button-container">
        <button class="button">
          <router-link to="/cbd">CBD</router-link>
        </button>
        <button class="button">
          <router-link to="/mywizards">My Wizards</router-link>
        </button>
      </div>
    </div>

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
              required
            ></v-text-field>

            <v-select
              v-model="select"
              :items="grates"
              :rules="[v => !!v || 'Item is required']"
              label="Choose your Grate One"
              required
            ></v-select>

            <v-select
              v-model="select"
              :items="days"
              :rules="[v => !!v || 'Item is required']"
              label="Activity"
              required
            ></v-select>

            <v-textarea label="Cowven Description" auto-grow outlined rows="9" row-height="15"></v-textarea>
          </v-form>
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
              <button class="button" v-on="on">Start the Ritual</button>
            </template>

            <v-card class="dialog">
              <img src="../assets/wheel.svg" alt />
              <h1>Congoudalations!</h1>
              <v-card-text>Your Cowven has been summoned ! Convert Wizards to join your team and compete to hold the G.O.A.T. Cheeze title the longest</v-card-text>

              <!-- <v-card-actions> -->
              <!-- <v-spacer></v-spacer> -->
              <button class="button" color="primary" text @click="dialog = false">
                <router-link to="/cowvenhome">Go to Cowven</router-link>
              </button>
              <!-- </v-card-actions> -->
            </v-card>
          </v-dialog>
        </div>

        <!-- //twitter button -->
        <a class="twitter" href="https://twitter.com/CheezeDao">
          <img src="../assets/twitter.svg" alt />
        </a>
        <!-- <span>Twitter dat Wizzzzzzard stuff</span> -->
      </div>
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
    select: null,
    grates: [
      "The Grate One of The Balance",
      "The Grate One of The Ocean",
      "The Grate One of The Storm",
      "The Grate One of The Flames"
    ],
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
  .content-container {
    display: flex;
    flex-direction: row;
    margin-top: 2rem;

    .create-coven {
      margin: auto;
      width: 25%;

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

  .v-card__text {
    padding: 3rem 3rem 0 3rem;
  }

  button {
    margin: auto;
  }
}
</style>
