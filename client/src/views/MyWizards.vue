<template>
  <div class="my-container">
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

<style lang="scss">
.my-wizards {
  th {
    color: #000 !important;
    text-transform: uppercase;
  }
  tr {
    padding: 5px 0;
  }
  td {
    font-family: "codesaver";
    font-size: 16px;
  }
}
</style>

<style lang="scss" scoped>
.my-wizards {
  width: 100%;

  h1 {
    margin-bottom: 40px;
    text-align: left;
    border-bottom: 1px solid rgba(#000, 0.2);
  }

  .v-data-table {
    background: transparent;
    .wizard-img {
      @media screen and (max-width: 1020px) {
        width: 2rem;
      }
    }
    .text-left {
      width: 10%;
      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        margin-top: 8px;
      }
    }
  }
}
</style>
