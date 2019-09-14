<template>
  <div class="proposal-container">
    <div class="topline">
      <p>
        Type: {{ proposal.type }}
      </p>
      <p>
        Wizard: {{ proposal.beneficiary }}
      </p>
      <p>
        Reputation: {{ proposal.reputationReward }}
      </p>
      <p>
        Status: {{ proposal.status }}
      </p>
    </div>

    <p class="description">{{ proposal.description }}</p>

    <div class="buttons-inner">
      <div v-if="isAllowedToRedeem">
        <button :class="['button', 'vote']">Redeem</button>
      </div>
      <div v-else>
        <button :class="['button', 'vote', voteStatus === 0 && 'active']" :disabled="isButtonDisabled">Nay</button>
        <button :class="['button', 'vote', voteStatus === 1 && 'active']" :disabled="isButtonDisabled">Aye</button>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Spell",
    props: ['proposal', 'myWizards'],
    computed: {
      voteStatus() {
        const userWallet = window.userWallet;
        const vote = this.proposal.voters.find(v => v.voterAddress.toLowerCase() === userWallet.toLowerCase());
        if(vote) {
          return Number(vote.voteData.vote)
        }
        return -1
      },
      isButtonDisabled() {
        return this.voteStatus >= 0
      },
      isAllowedToRedeem() {
        const wizard = this.myWizards.find(
          w => w.wizardWalletData && w.wizardWalletData.wizardWalletAddress === this.proposal.beneficiary
        );
        return !!wizard && this.proposal.status === 'Closed'
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
    }
    .active {
      background: $primary!important;
    }
  }
</style>
