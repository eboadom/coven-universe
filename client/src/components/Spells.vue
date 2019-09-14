<template>
  <div class="spell-proposals">
    <h2>Spell Proposals</h2>
    <div
      v-for="proposal in proposals"
      :key="proposal.id"
      class="proposal-container"
    >
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
        <button class="button vote">Nay</button>

        <v-dialog v-model="dialog" content-class="thank-dialog">
          <template v-slot:activator="{ on }">
            <button class="button vote vote2" v-on="on">Aye</button>
          </template>

          <v-card class="dialog">
            <img src="../assets/wheel.svg" alt />
            <h1>Thank You</h1>
            <v-card-text>
              You expressed yourself and that’s beautiful as a gallon of
              milk but let’s see if the majority agrees
            </v-card-text>

            <!-- <v-card-actions> -->
            <v-spacer></v-spacer>
            <button
              class="button"
              color="primary"
              text
              @click="dialog = false"
            >
              Got it
            </button>
            <!-- </v-card-actions> -->
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Spells",
    props: ['proposals']
  };
</script>

<style lang="scss" scoped>
  @import "../style/screen-size";
  @import "../style/vars";
  .spell-proposals {
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
  }
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
      width: 80px;
      margin-left: 25px;
    }
    .vote2 {
      background: $primary;
      &:hover {
        background: $purple !important;
      }
    }
  }
</style>
