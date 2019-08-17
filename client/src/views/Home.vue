<template>
  <div id="main-container">
    <div class="topnav">
      <img src="../assets/cheezedao.svg" alt />
      <div class="button-container">
        <button class="button">
          <router-link to="/home">Sanctuary</router-link>
        </button>
        <button class="button">
          <router-link to="/mywizards">My Wizards</router-link>
        </button>
      </div>
    </div>

    <div class="content-container">
      <div class="leaderboard">
        <h1>Home of the Grates</h1>
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
              <!-- <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
              <v-icon small @click="deleteItem(item)">delete</v-icon>-->
              <!-- <img v-bind:src="'/img/' + item.god + '.svg'" alt /> -->
              <img :src="require(`@/assets/${item.god}.svg`)" />
            </template>
            <template v-slot:expanded-item="{ headers }">
              <td
                :colspan="headers.length"
              >This is the content area where the unique ‘tagline’ will be placed for each coven. Each coven can set a few lines of text for a unique distribution of their coven</td>
            </template>
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
        },
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
        },
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

    .leaderboard {
      width: 100%;
      padding: 0 8rem;
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
</style>
