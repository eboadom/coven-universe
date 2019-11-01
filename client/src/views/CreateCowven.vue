<template>
  <Preloader v-if="$apollo.queries.allDaosInfo.loading" />
  <div v-else>
    <TopNav />
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
              :rules="[v => !!v || 'Grate is required']"
              label="Choose your Grate One"
              data-vv-name="selectGrates"
              required
            ></v-select>

            <v-select
              v-model="selectWizard"
              :items="wizards"
              :rules="[v => !!v || 'Wizard is required']"
              label="Choose your Wizard"
              data-vv-name="selectWizard"
              required
            ></v-select>

            <v-textarea
              v-model="description"
              label="Cowven Description"
              auto-grow
              outlined
              rows="9"
              row-height="15"
              data-vv-name="description"
            ></v-textarea>

            <button class="button" @click.prevent="submit">
              Start the Ritual
            </button>
          </v-form>
          <v-dialog v-model="dialog" content-class="thank-dialog">
            <v-card class="dialog">
              <img src="../assets/wheel.svg" alt />
              <h1>Congoudalations!</h1>
              <v-card-text
                >Your Cowven has been summoned ! Convert Wizards to join your
                team and compete to hold the G.O.A.T. Cheeze title the
                longest</v-card-text
              >

              <router-link :to="{ name: 'home' }">
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

        <a class="twitter" href="https://twitter.com/CheezeDao" target="_blank">
          <img src="../assets/twitter.svg" alt />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Preloader from "../components/Preloader.vue";
import TopNav from "../components/TopNav.vue";
import { deployNewCowvenMutation, initCowvenSchemes } from "../graphql/mutations";
import { getWeb3 } from "../helpers/web3-helpers";
import { allDaosData, allWizardsByUserAddress } from "../graphql/queries";

export default {
  components: {
    Preloader,
    TopNav
  },
  apollo: {
    allDaosInfo: {
      query: allDaosData
    },
    allWizardsDataByOwner: {
      query: allWizardsByUserAddress,
      variables() {
        return {
          address: window.userWallet
        };
      }
    },
  },
  data: () => ({
    dialog: false,
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    selectGrates: null,
    grates: [
      { text: "The Grate One of The Balance", value: "BALANCE" },
      { text: "The Grate One of The Ocean", value: "OCEAN" },
      { text: "The Grate One of The Storm", value: "STORM" },
      { text: "The Grate One of The Flames", value: "FLAME" },
      { text: "The Grate One of The Mold", value: "MOLD" }
    ],
    selectWizard: null,
    tokenName: "some",
    tokenSymbol: "one",
    description: "",
    allWizardsDataByOwner: null
  }),
  computed: {
    wizards() {
      console.log('allWizardsDataByOwner', this.allWizardsDataByOwner);
      return this.allWizardsDataByOwner.map(wizard => {
        const {id, wizardWalletData} = wizard;
        const disabled = wizardWalletData.wizardWalletAddress === '0x0000000000000000000000000000000000000000';
        return {
          disabled,
          text: `${id}${disabled ? ' - to activate - create a RepBag' : ''}`,
          value: id
        };
      })
    }
  },

  methods: {
    async submit(e) {
      e.preventDefault();
      const web3 = getWeb3();
      if (this.$refs.form.validate()) {
        const {
          data: { deployNewCowven: txsCowven }
        } = await this.$apollo.mutate({
          mutation: deployNewCowvenMutation,
          variables: {
            data: {
              sender: window.userWallet,
              cowvenName: this.name,
              tokenCowvenName: this.tokenName,
              tokenCowvenSymbol: this.tokenSymbol,
              description: this.description,
              grate: this.selectGrates
            }
          }
        });
        const txsCowvenPromise = web3.eth.sendTransaction(txsCowven[0]);
        const txsCowvenReceipt = await new Promise((resolve, reject) =>
          txsCowvenPromise
            .on('receipt', receipt => resolve(receipt))
            .on('error', err => {
                reject(err);
            })
        );
        const { data: { allDaosInfo } } = await this.$apollo.queries.allDaosInfo.refetch();
        const createdCowven = allDaosInfo.find(covwen => covwen.id === this.name);
        const {
          data: { initCowvenSchemes: txsSchema }
        } = await this.$apollo.mutate({
          mutation: initCowvenSchemes,
          variables: {
            data: {
              sender: window.userWallet,
              avatarAddress: createdCowven.avatarAddress
            }
          }
        });
        await web3.eth.sendTransaction(txsSchema[0]);
        await this.$apollo.queries.allDaosInfo.refetch();
        this.dialog = true;
        this.reset();
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
