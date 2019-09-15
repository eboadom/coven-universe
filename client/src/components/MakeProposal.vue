<template>
  <div class="make-proposal">
    <h2>Submit a proposal</h2>
    <div class="proposal-container">
      <v-form ref="form" v-model="valid" lazy-validation>
        <div class="info-wrapper">
          <v-select
            v-model="spell"
            :items="proposal"
            :item-disabled="checkSelectOptionDisabled"
            :rules="[v => !!v || 'Proposal type is required']"
            label="Choose your proposal type"
            required
          ></v-select>

          <v-dialog v-model="dialogInfo" content-class="thank-dialog">
            <template v-slot:activator="{ on }">
              <img id="info-icon" src="../assets/info.svg" alt v-on="on" />
            </template>

            <v-card class="dialog" id="info-dialog">
              <h4>Cut the cheese?</h4>
              <p>
                Time to cut the cheeze with a Wizard ? Say no more, add its ID
                and we’ll take care of the rest
              </p>
              <h4>Change activity penalty length</h4>
              <p>
                Propose to increase or decrease the length of days a Wizards
                needs to be active.
              </p>
              <h4>Convert your Cowven</h4>
              <p>
                Do a proposal which will change the Grate you all follow
              </p>
            </v-card>
          </v-dialog>
        </div>

        <v-select
          v-model="wizard"
          :items="wizardsList"
          :rules="[v => !!v || 'Wizard ID is required']"
          label="Choose your Wizard"
          required
        ></v-select>

        <v-text-field
          v-model="amount"
          :rules="[v => !!v || 'Reputation amount is required']"
          label="Reputation amount"
          type="number"
          required
        ></v-text-field>

        <button class="button" @click.prevent="submit">Aye!</button>
      </v-form>
    </div>
  </div>
</template>

<script>
import { createProposalMutation } from "../graphql/mutations";
import { getWeb3 } from "../helpers/web3-helpers";

export default {
  name: "MakeProposal",
  props: ["members", "onSuccessSubmission"],
  data() {
    return {
      valid: true,

      name: "",
      wizard: null,
      email: "",
      amount: null,
      spell: null,
      grateOne: null,
      description: "",

      dialogInfo: false,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      proposal: [
        {"disabled": false, "text" : "Reputation reward", "value": "Reputation reward"},
        {"disabled": true, "text" : "TODO: Remove reputation", "value": "TODO: Remove reputation"},
        {"disabled": true, "text" : "TODO: Convert God", "value": "TODO: Convert God"},
        {"disabled": true, "text" : "TODO: Kick Wizard", "value": "TODO: Kick Wizard"},
      ],
      grateOnes: [
        "The Grate Balance",
        "The Grate Wave",
        "The Grate Storm",
        "The Grate Flames"
      ]
    };
  },
  computed: {
    wizardsList() {
      return this.members.map(item => ({text: item.wizardId, value: item.wizardWallet}));
    }
  },
  methods: {
    checkSelectOptionDisabled(item) {
      return item.disabled;
    },
    async submit(e) {
      e.preventDefault();
      const web3 = getWeb3();
      if (this.$refs.form.validate()) {
        const {
          data: { createProposalForReputationReward: txs }
        } = await this.$apollo.mutate({
          mutation: createProposalMutation,
          variables: {
            data: {
              proposer: window.userWallet,
              beneficiary: this.wizard,
              reputationChange: this.amount,
              daoTokenChange: "0"
            }
          }
        });
        await web3.eth.sendTransaction(txs[0]);
        this.reset();
        await this.onSuccessSubmission();
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
  width: 30%;
  @include respond-to(md) {
    width: 35%;
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
    button {
      margin-top: 20px;
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
