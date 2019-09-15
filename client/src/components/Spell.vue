<template>
  <div class="proposal-container">
    <template v-if="!showVoteForm">
      <div class="topline">
        <p>Type: {{ proposal.type === "REPUTATION_REWARD" ? "Reputation Reward" : "" }}</p>
        <p>Wizard: #{{ proposal.wizardIdBeneficiary }}</p>
        <p>Reputation: {{ proposal.reputationReward }}</p>
        <p>Status: {{ proposal.status }}</p>
      </div>

      <p class="description">{{ proposal.description }}</p>

      <div class="buttons-inner">
        <div v-if="isAllowedToRedeem">
          <button :class="['button', 'vote']" @click.prevent="handleRedeem">
            Redeem
          </button>
        </div>
        <div v-else>
          <button
            :class="['button', 'vote']"
            :disabled="isVoteDisabled"
            @click.prevent="toggleVoteForm('2')"
          >
            Nay
            <span class="voteCounter voteCounter__no">
              {{ proposal.noVotes }}
            </span>
          </button>
          <button
            :class="['button', 'vote']"
            :disabled="isVoteDisabled"
            @click.prevent="toggleVoteForm('1')"
          >
            Aye
            <span class="voteCounter voteCounter__yes">
              {{ proposal.yesVotes }}
            </span>
          </button>
        </div>
      </div>
    </template>
    <template v-else>
      <h3>Time to decide!</h3>
      <v-form>
        <v-select
          v-model="pendingWizardWallet"
          :items="notVotedWizards.map(v => ({text: v.id, value: v.wizardWalletData.wizardWalletAddress}))"
          :rules="[v => !!v || 'Wizard ID is required']"
          label="Choose a Wizard"
          required
        />
        <p>
          <button class="button" @click.prevent="handleVoteSubmit">Let's vote!</button>
        </p>
        <p>
          <button class="button" @click.prevent="toggleVoteForm">Next time</button>
        </p>
      </v-form>
    </template>
  </div>
</template>

<script>
  import { redeemReputation, voteOnProposalMutation } from "../graphql/mutations";
import { getWeb3 } from "../helpers/web3-helpers";

export default {
  name: "Spell",
  props: ["proposal", "myWizards", "onSuccessVote"],
  data() {
    return {
      pendingWizardWallet: '',
      showVoteForm: false,
      pendingVote: '',
    }
  },
  computed: {
    notVotedWizards() {
      return this.myWizards.filter(wizard => {
        for (const vote of this.proposal.voters) {
          if(vote.voterAddress === wizard.wizardWalletData.wizardWalletAddress) {
            return false
          }
        }
        return true
      })
    },
    isVoteDisabled() {
      return !this.notVotedWizards.length || this.proposal.status !== "Voting";
    },
    isAllowedToRedeem() {
      return this.proposal.status === "Redeemable";
    }
  },
  methods: {
    toggleVoteForm(vote = '') {
      this.pendingVote = vote;
      this.showVoteForm = !this.showVoteForm;
    },
    async handleVoteSubmit() {
      const web3 = getWeb3();
      const {
        data: { voteProposal: txs }
      } = await this.$apollo.mutate({
        mutation: voteOnProposalMutation,
        variables: {
          data: {
            sender: window.userWallet,
            voter: this.pendingWizardWallet,
            proposalId: this.proposal.id,
            vote: Number(this.pendingVote),
            reputationToUse: "-1",
          }
        }
      });
      await web3.eth.sendTransaction(txs[0]);
      await this.onSuccessVote();
      this.pendingWizardWallet = '';
      this.pendingVote = '';
      this.showVoteForm = false;
    },
    async handleRedeem() {
      const {
        data: { redeemReputation: txs }
      } = await this.$apollo.mutate({
        mutation: redeemReputation,
        variables: {
          data: {
            redeemer: window.userWallet,
            proposalId: this.proposal.id
          }
        }
      });
      const web3 = getWeb3();
      await web3.eth.sendTransaction(txs[0]);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/screen-size";
@import "../style/vars";
.proposal-container {
  margin-bottom: 20px;
  min-height: 270px;
  border: solid 1px #000000;
  background-color: #ffffff;
  padding: 15px 15px 25px;
  box-shadow: 5px 5px 0 #000;
  .topline {
    margin-bottom: 10px;
    padding-bottom: 3px;
    border-bottom: 1px solid #000;
    p {
      width: 100%;
      margin-bottom: 10px;
      word-break: break-all;
      &:last-child {
        margin: 0;
      }
    }
  }
}

.buttons-inner {
  text-align: right;
  button {
    width: auto;
    min-width: 80px;
    margin-left: 25px;
    position: relative;
    outline: none;
  }
  .active {
    background: $primary !important;
  }
}

.voteCounter {
  position: absolute;
  right: -8px;
  top: -8px;
  display: block;
  outline: none;
  font-size: 12px;
  min-width: 18px;
  height: 18px;
  color: #fff;
  background: #000;
  border-radius: 50%;
  line-height: 18px;
  text-align: center;
  padding: 0 3px;
}
</style>
