<template>
  <div class="content-container">
    <div class="my-wizards">
      <h1>My Wizards</h1>

      <v-data-table
        :headers="headers"
        :items="wizards"
        :search="search"
        :items-per-page="5"
      >
        <template v-slot:item.wizard="{ item }">
          <img
            class="wizard-img"
            :src="require(`@/assets/${item.wizard}.png`)"
          />
        </template>
      </v-data-table>
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
.content-container {
  display: flex;
  flex-direction: row;
  margin-top: 2rem;

  .my-wizards {
    padding: 0 8rem;
    width: 100%;

    @media screen and (max-width: 1020px) {
      padding: 0;
    }

    h1 {
      padding: 1rem 0;
    }
    .v-data-table {
      .wizard-img {
        @media screen and (max-width: 1020px) {
          width: 2rem;
        }
      }
      .text-left {
        width: 10%;
        img {
          width: 5rem;
        }
      }
    }
  }
}
</style>
