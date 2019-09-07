<template>
  <div class="content-container">
    <div class="leaderboard">
      <h1>G.O.A.T. Cheeze Board</h1>
      <v-card>
        <v-card-title>
          Leaderboard
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="grates"
          :search="search"
          :single-expand="true"
          :expanded.sync="expanded"
          item-key="name"
          show-expand
        >
          <template v-slot:item.god="{ item }">
            <img :src="require(`@/assets/${item.god}.svg`)" alt="" />
          </template>

          <template v-slot:expanded-item="{ headers }">
            <td :colspan="headers.length">
              This is the content area where the unique ‘tagline’ will be placed
              for each coven. Each coven can set a few lines of text for a
              unique distribution of their coven
              <button class="redirectCowven button" @click="redirectToMyCowven">
                Go to Cowven
              </button>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </div>

    <div class="create-coven">
      <h1>Create Cowven</h1>
      <div class="summon-container">
        <img src="../assets/utter.svg" alt />
        <p>
          Summon your Cowven! Gather your wizard homies and rule together the
          cheesiest coven of the hood.
        </p>
        <button class="button">
          <router-link :to="{ name: 'createcowven' }">Summon</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      expanded: [],
      headers: [
        {
          text: "Rank",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Name", value: "name" },
        { text: "Score", value: "score" },
        { text: "Members", value: "members" },
        { text: "God", value: "god" }
      ],
      grates: [
        {
          rank: "#1",
          name: "DragonBallCheeZ",
          score: "9000+",
          members: "000",
          god: "fire"
        },
        {
          rank: "#2",
          name: "MainlandChina",
          score: "1025",
          members: "000",
          god: "water"
        },
        {
          rank: "#1",
          name: "WeWillRoqueYourFort",
          score: "900",
          members: "000",
          god: "wind"
        },
        {
          rank: "#1",
          name: "GoudaGang",
          score: "600",
          members: "000",
          god: "earth"
        },
        {
          rank: "#1",
          name: "CheezZz_Aimbot",
          score: "153",
          members: "000",
          god: "fire"
        },
        {
          rank: "#1",
          name: "EthIsMoney",
          score: "354",
          members: "000",
          god: "water"
        },
        {
          rank: "#1",
          name: "ChezeGuevera",
          score: "786",
          members: "000",
          god: "earth"
        },
        {
          rank: "#1",
          name: "MoldError",
          score: "420",
          members: "000",
          god: "wind"
        }
      ]
    };
  },
  methods: {
    redirectToMyCowven() {
      this.$router.push({ path: "cowvenhome", params: { cowvenId: "123" } });
    }
  },
  mounted() {
    const trs = Array.from(
      document.querySelectorAll(".v-data-table__wrapper tr")
    );
    trs.map(el =>
      el.addEventListener("mouseover", e => {
        e.target.parentElement.firstElementChild.firstElementChild.click();
      })
    );
  }
};
</script>
<style lang="scss" scoped>
.content-container {
  display: flex;
  flex-direction: row;
  margin-top: 2rem;

  @media screen and (max-width: 1020px) {
    flex-direction: column;
    margin-top: 0;
  }

  .leaderboard {
    width: 100%;
    padding: 0 8rem;

    @media screen and (max-width: 1020px) {
      padding: 0;
    }

    &::before {
      background: url("../assets/bottom-left.svg");
      width: 2rem;
    }
    h1 {
      font-size: 3rem;
      padding: 1rem 0;
      @media screen and (max-width: 1020px) {
        font-size: 2rem;
      }
    }

    .v-card {
      border: 1px solid black;
      box-shadow: none;
      padding: 0 2rem 2rem 2rem;
      font-family: codesaver;
    }
  }

  .create-coven {
    padding: 0 8rem;

    @media screen and (max-width: 1020px) {
      padding: 0;
    }

    h1 {
      padding: 1rem 0;
    }

    .summon-container {
      border: 1px solid black;
      padding: 2rem;
      height: 30rem;
      text-align: center;
      background-color: white;

      &::before {
        background: url("../assets/bottom-left.svg");
        width: 2rem;
        content: "";
      }

      p {
        padding: 1rem 0 3rem 0;
      }
      img {
        width: 10rem;
      }
    }
  }
}

.expanded {
  td {
    @media screen and (max-width: 1020px) {
      padding: 0;
    }
  }
}

.redirectCowven {
  display: block;
  margin: auto;
  font-size: 1rem;
  text-align: center;
  line-height: 1.8rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
