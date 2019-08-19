<template>
  <div id="main-container">
    <div class="topnav">
      <img src="../assets/cheezedao.svg" alt />
      <div class="button-container">
        <button class="button">
          <router-link to="/thesanctuary">Sanctuary</router-link>
        </button>
        <button class="button">
          <router-link to="/mywizards">My Wizards</router-link>
        </button>
      </div>
    </div>

    <div class="content-container">
      <div class="create-coven">
        <h1>My Wizards</h1>

        <v-data-table :headers="headers" :items="wizards" :search="search" :items-per-page="5">
          <template v-slot:item.wizard="{ item }">
            <img :src="require(`@/assets/${item.wizard}.png`)" />
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Wizard",
          align: "left",
          sortable: false,
          value: "wizard"
        },
        { text: "ID", value: "id" },
        { text: "Type", value: "type" },
        { text: "Score", value: "score" },
        { text: "Cowven", value: "cowven" },
        { text: "Status", value: "status" },
        { text: "Reputation", value: "reputation" }
      ],
      wizards: [
        {
          wizard: "fire-wizard",
          id: "#0000",
          type: "Fire",
          score: "7865",
          cowven: "Awesome Coven Name",
          status: "In Cowven",
          reputation: "6794"
        },
        {
          wizard: "wind-wizard",
          id: "#0001",
          type: "Wind",
          score: "1534",
          cowven: "Awesome Coven Name",
          status: "In Cowven",
          reputation: "6866"
        },
        {
          wizard: "water-wizard",
          id: "#0002",
          type: "Water",
          score: "3576",
          cowven: "Awesome Coven Name",
          status: "Free Roaming",
          reputation: "1678"
        },
        {
          wizard: "neutral-wizard",
          id: "#0003",
          type: "Neutral",
          score: "4679",
          cowven: "Awesome Coven Name",
          status: "Free Roaming",
          reputation: "1534"
        },
        {
          wizard: "fire-wizard",
          id: "#0000",
          type: "Fire",
          score: "7865",
          cowven: "Awesome Coven Name",
          status: "In Cowven",
          reputation: "6794"
        },
        {
          wizard: "wind-wizard",
          id: "#0001",
          type: "Wind",
          score: "1534",
          cowven: "Awesome Coven Name",
          status: "In Cowven",
          reputation: "6866"
        },
        {
          wizard: "water-wizard",
          id: "#0002",
          type: "Water",
          score: "3576",
          cowven: "Awesome Coven Name",
          status: "Free Roaming",
          reputation: "1678"
        },
        {
          wizard: "neutral-wizard",
          id: "#0003",
          type: "Neutral",
          score: "4679",
          cowven: "Awesome Coven Name",
          status: "Free Roaming",
          reputation: "1534"
        },
        {
          wizard: "fire-wizard",
          id: "#0000",
          type: "Fire",
          score: "7865",
          cowven: "Awesome Coven Name",
          status: "In Cowven",
          reputation: "6794"
        },
        {
          wizard: "wind-wizard",
          id: "#0001",
          type: "Wind",
          score: "1534",
          cowven: "Awesome Coven Name",
          status: "In Cowven",
          reputation: "6866"
        },
        {
          wizard: "water-wizard",
          id: "#0002",
          type: "Water",
          score: "3576",
          cowven: "Awesome Coven Name",
          status: "Free Roaming",
          reputation: "1678"
        },
        {
          wizard: "neutral-wizard",
          id: "#0003",
          type: "Neutral",
          score: "4679",
          cowven: "Awesome Coven Name",
          status: "Free Roaming",
          reputation: "1534"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
#main-container {
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
      padding: 0 8rem;
      width: 100%;

      h1 {
        padding: 1rem 0;
      }
      v-data-table {
        .text-left {
          width: 10%;
        }
      }
    }
  }
}
</style>
