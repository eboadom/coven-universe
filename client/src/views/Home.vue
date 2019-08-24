<template>
  <div id="main-container">
    <div class="topnav">
      <img src="../assets/cheezedao.svg" alt />
      <div class="button-container">
        <button class="button">
          <router-link to="/cbd">CBD</router-link>
        </button>
        <button class="button">
          <router-link to="/mywizards">My Wizards</router-link>
        </button>
      </div>
    </div>

    <div class="content-container">
      <div class="leaderboard">
        <!-- <img class="bottom-left" src="../assets/bottom-left.svg" alt />
        <img class="top-right" src="../assets/top-right.svg" alt />-->
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
            @click:row="expandRow()"
          >
            <template v-slot:item.god="{ item }">
              <img :src="require(`@/assets/${item.god}.svg`)" />
            </template>

            <!-- <template v-slot:item slot-scope="props">
              <tr @click="showAlert(props.item)">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="text-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">{{ props.item.protein }}</td>
                <td class="text-xs-right">{{ props.item.iron }}</td>
              </tr>
            </template>-->

            <template v-slot:expanded-item="{ headers }">
              <td
                :colspan="headers.length"
              >This is the content area where the unique ‘tagline’ will be placed for each coven. Each coven can set a few lines of text for a unique distribution of their coven</td>
            </template>

            <!-- <template v-slot:item.data-table-expand>
              <v-icon
                role="button"
                class="v-icon notranslate v-data-table__expand-icon v-icon--link mdi mdi-chevron-down theme--light"
              ></v-icon>
            </template>-->
          </v-data-table>
        </v-card>
      </div>

      <div class="create-coven">
        <h1>Create Coven</h1>
        <div class="summon-container">
          <img src="../assets/utter.svg" alt />
          <p>Summon your Coven! Gather your wizard homies and rule together the cheesiest coven of the hood.</p>
          <button class="button">
            <router-link to="/createcowven">Summon</router-link>
          </button>
        </div>
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
    expandRow(e) {
      console.log("hover!");
    },
    redirectToMyCoven() {
      console.log("redirect!");
    }
  }
};
</script>
<style lang="scss" scoped>
#main-container {
  background: url("../assets/grid.svg");
  height: 96vh;
  background-position-y: -12vh;

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

    .leaderboard {
      width: 100%;
      padding: 0 8rem;

      &::before {
        background: url("../assets/bottom-left.svg");
        width: 2rem;
      }
      h1 {
        font-size: 3rem;
        padding: 1rem 0;
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

      h1 {
        padding: 1rem 0;
      }

      .summon-container {
        border: 1px solid black;
        padding: 2rem;
        height: 30rem;
        text-align: center;

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
}

.v-card {
  &::before {
    background: url("../assets/bottom-left.svg");
    width: 4rem;
    content: "";
    position: absolute;
    height: 5rem;
    background-size: cover;
    background-repeat: no-repeat;
    top: 91%;
    left: -2%;
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
    top: -2%;
    right: -2%;
  }
}

.v-icon.v-icon.v-icon--link {
  z-index: 10 !important;
  background-color: transparent !important;
  width: 3240% !important;
  height: 92% !important;
  position: relative !important;
}
</style>
