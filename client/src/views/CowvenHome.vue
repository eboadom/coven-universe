<template>
  <Preloader
    v-if="
      $apollo.queries.allDaosInfo.loading ||
        $apollo.queries.allWizardsDataByOwner.loading
    "
  />
  <div class="errorPage" v-else-if="!cowven">
    <img src="../assets/cheezedao.svg" alt="Cheeze" />
    <p>404</p>
  </div>
  <div v-else>
    <TopNav />
    <div class="CowvenHome">
      <div class="header-container">
        <h1>{{ cowven.id }}</h1>

        <div class="center-container">
          <p>
            “{{
              cowven.description ||
                "This is what you get for playing with milk and mold on chain, even Pasteur can't stop us"
            }}”
          </p>
          <div class="stats">
            <p>Rank #{{ cowven.rank }}</p>
            <p>Score #{{ cowven.score }}</p>
            <p>Wins #{{ cowven.wins }}</p>
            <p>Loses #{{ cowven.loses }}</p>
            <p>Members #{{ cowven.members.length }}</p>
          </div>
        </div>

        <div class="link-wrapper">
          <span class="change-link" @click="showNewSpellForm">
            <span v-if="!showCreateProposal">Cast new proposals</span>
            <span v-else>Active Proposals</span>
          </span>
        </div>
      </div>

      <div class="content-container">
        <div class="leaderboard">
          <v-card>
            <v-data-table
              :headers="headers"
              :items="cowven.members"
              :search="search"
              :items-per-page="5"
            >
              <template v-slot:item.affinity="{ item }">
                <img
                  class="table-image"
                  :src="
                    require(`@/assets/${item.affinity.toLowerCase()}-wizard.png`)
                  "
                  alt
                />
              </template>
              <template v-slot:item.score="{ item }">
                {{ item.score || 0 }}
              </template>
            </v-data-table>
          </v-card>
        </div>

        <Spells
          v-if="!showCreateProposal"
          :proposals="cowven.proposals"
          :myWizards="allWizardsDataByOwner"
        />
        <MakeProposal :members="cowven.members" v-else />
      </div>
    </div>
  </div>
</template>

<script>
import Preloader from "../components/Preloader.vue";
import TopNav from "../components/TopNav.vue";
import Spells from "../components/Spells.vue";
import MakeProposal from "../components/MakeProposal.vue";
import { allDaosData, allWizardsByUserAddress } from "../graphql/queries";

export default {
  props: ["id"],
  components: {
    Preloader,
    TopNav,
    Spells,
    MakeProposal
  },
  apollo: {
    allDaosInfo: {
      query: allDaosData
    },
    allWizardsDataByOwner: {
      query: allWizardsByUserAddress,
      variables() {
        return {
          address: window.userWallet
        };
      }
    }
  },
  data() {
    return {
      allDaosInfo: [],
      allWizardsDataByOwner: [],
      showCreateProposal: false,
      search: "",
      headers: [
        {
          text: "",
          align: "left",
          sortable: false,
          value: "affinity"
        },
        {
          text: "Power",
          align: "left",
          value: "innatePower"
        },
        { text: "Score", value: "score" },
        {
          text: "Reputation",
          value: "wizardWalletData.genecheezeDaoReputation"
        },
        { text: "ID", value: "id" }
      ]
    };
  },
  computed: {
    cowven() {
      return this.allDaosInfo.find(item => item.id === this.id);
    }
  },
  methods: {
    showNewSpellForm() {
      this.showCreateProposal = !this.showCreateProposal;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/screen-size";
@import "../style/vars";

.header-container {
  padding-bottom: 10px;
  margin: 0 30px 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  @include respond-to(sm) {
    margin: 0 10px 20px;
  }
  h1 {
    font-size: 30px;
    width: 25%;
    text-align: left;
    @include respond-to(sm) {
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
    }
  }
  .center-container {
    width: 35%;
    text-align: center;
    @include respond-to(lg) {
      width: 45%;
    }
    @include respond-to(sm) {
      width: 100%;
      margin-bottom: 20px;
    }
    p {
      font-size: 16px;
      margin-bottom: 10px;
    }
    .stats {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .link-wrapper {
    width: 25%;
    text-align: right;
    @include respond-to(sm) {
      width: 100%;
    }
    .change-link {
      text-decoration: none;
      position: relative;
      color: #000;
      padding: 0 2px 5px;
      transition: all 0.3s ease;
      cursor: pointer;
      font-size: 18px;
      &:hover {
        color: $purple;
        &:after {
          width: 0;
          background: $purple;
        }
      }
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        transition: all 0.3s ease;
        background: #000;
        width: 100%;
        height: 1px;
      }
    }
  }
}

.content-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 30px 40px;
  @include respond-to(sm) {
    margin: 0 10px 30px;
    flex-direction: column-reverse;
  }

  .leaderboard {
    width: 45%;
    @include respond-to(lg) {
      width: 55%;
    }
    @include respond-to(sm) {
      width: 100%;
      margin-bottom: 15px;
    }
  }

  .table-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    margin-top: 8px;
    @include respond-to(sm) {
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
