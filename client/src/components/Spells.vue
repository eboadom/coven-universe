<template>
  <div class="spell-proposals">
    <h2>Spell Proposals</h2>
    <VuePerfectScrollbar class="proposals-inner" v-once :settings="settings">
      <Spell
        v-for="proposal in proposals"
        :key="proposal.id"
        :proposal="proposal"
        :myWizards="myWizards"
      />
    </VuePerfectScrollbar>
    <v-dialog v-model="dialog" content-class="thank-dialog">
      <v-card class="dialog">
        <img src="../assets/wheel.svg" alt />
        <h1>Thank You</h1>
        <v-card-text>
          You expressed yourself and that’s beautiful as a gallon of milk but
          let’s see if the majority agrees
        </v-card-text>

        <!-- <v-card-actions> -->
        <v-spacer></v-spacer>
        <button class="button" color="primary" text @click="dialog = false">
          Got it
        </button>
        <!-- </v-card-actions> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Spell from "../components/Spell";

export default {
  name: "Spells",
  props: ["proposals", "myWizards"],
  components: {
    Spell,
    VuePerfectScrollbar
  },
  data() {
    return {
      dialog: false,
      settings: {
        maxScrollbarLength: 60
      }
    };
  }
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

.proposals-inner {
  max-height: 500px;
  overflow-y: auto;
  padding-right: 25px;
}
</style>
