<template>
  <div id="main-container">
    <TopNav />

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
import TopNav from "../components/TopNav.vue";

export default {
  components: { TopNav },
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
          id: "#0004",
          type: "Fire",
          score: "7865",
          cowven: "Awesome Coven Name",
          status: "In Cowven",
          reputation: "6794"
        },
        {
          wizard: "wind-wizard",
          id: "#0005",
          type: "Wind",
          score: "1534",
          cowven: "Awesome Coven Name",
          status: "In Cowven",
          reputation: "6866"
        },
        {
          wizard: "water-wizard",
          id: "#0006",
          type: "Water",
          score: "3576",
          cowven: "Awesome Coven Name",
          status: "Free Roaming",
          reputation: "1678"
        },
        {
          wizard: "neutral-wizard",
          id: "#0007",
          type: "Neutral",
          score: "4679",
          cowven: "Awesome Coven Name",
          status: "Free Roaming",
          reputation: "1534"
        },
        {
          wizard: "fire-wizard",
          id: "#0008",
          type: "Fire",
          score: "7865",
          cowven: "Awesome Coven Name",
          status: "In Cowven",
          reputation: "6794"
        },
        {
          wizard: "wind-wizard",
          id: "#0009",
          type: "Wind",
          score: "1534",
          cowven: "Awesome Coven Name",
          status: "In Cowven",
          reputation: "6866"
        },
        {
          wizard: "water-wizard",
          id: "#0012",
          type: "Water",
          score: "3576",
          cowven: "Awesome Coven Name",
          status: "Free Roaming",
          reputation: "1678"
        },
        {
          wizard: "neutral-wizard",
          id: "#0023",
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
  background: url("../assets/grid.svg");
  height: 96vh;
  background-position-y: -12vh;
  margin: 2rem 0 0 1rem;

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
      .v-data-table {
        .text-left {
          width: 10%;
          img {
            width: 5rem;
          }
        }
      }
    }
  }
}

.v-data-table {
  &::before {
    background: url("../assets/bottom-left.svg");
    width: 4rem;
    content: "";
    position: absolute;
    height: 5rem;
    background-size: cover;
    background-repeat: no-repeat;
    top: 71%;
    left: 6.6%;
  }

  &::after {
    background: url("../assets/top-right.svg");
    width: 4rem;
    content: "";
    height: 6rem;
    position: absolute;
    height: 4rem;
    background-size: cover;
    background-repeat: no-repeat;
    top: 21.8%;
    right: 5.9%;
  }
}
</style>
