<template>
  <div class="proposal-container">
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
          :class="['button', 'vote', voteStatus === 0 && 'active']"
          :disabled="isButtonDisabled"
        >
          Nay
          <span class="voteCounter voteCounter__no">
            {{ proposal.noVotes }}
          </span>
        </button>
        <button
          :class="['button', 'vote', voteStatus === 1 && 'active']"
          :disabled="isButtonDisabled"
        >
          Aye
          <span class="voteCounter voteCounter__yes">
            {{ proposal.yesVotes }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { redeemReputation } from "../graphql/mutations";
import { getWeb3 } from "../helpers/web3-helpers";

export default {
  name: "Spell",
  props: ["proposal", "myWizards"],
  computed: {
    voteStatus() {
      const userWallet = window.userWallet;
      const vote = this.proposal.voters.find(
        v => v.voterAddress.toLowerCase() === userWallet.toLowerCase()
      );
      if (vote) {
        return Number(vote.voteData.vote);
      }
      return -1;
    },
    isButtonDisabled() {
      return this.voteStatus >= 0 || this.proposal.status !== "Voting";
    },
    isAllowedToRedeem() {
      // const wizard = this.myWizards.find(
      //   w =>
      //     w.wizardWalletData &&
      //     w.wizardWalletData.wizardWalletAddress === this.proposal.beneficiary
      // );
      return this.proposal.status === "Redeemable";
    }
  },
  methods: {
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
