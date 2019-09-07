<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <button class="button" v-on="on">Make Proposal</button>
    </template>

    <v-card class="dialog">
      <img src="../assets/wheel.svg" alt />
      <h1>Thank You</h1>
      <v-card-text>You just submitted your proposal, let’s see what the rest of the Cowven thinks of your proposal.</v-card-text>

      <v-spacer></v-spacer>
      <button class="button" color="primary" text @click="dialog = false">
        Got it
      </button>
    </v-card>
  </v-dialog>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.dialog {
  display: flex;
  flex-direction: column;
  vertical-align: center;
  height: 25rem;
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
</style>
