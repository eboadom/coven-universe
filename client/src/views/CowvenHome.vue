<template>
  <Preloader v-if="$apollo.queries.allDaosInfo.loading"/>
  <div v-else-if="!cowven">404</div>
  <div v-else>
    <TopNav />
    <div class="CowvenHome">
      <div class="header-container">
        <h1>{{cowven.id}}</h1>

        <div class="center-container">
          <p>
            “{{cowven.description || 'should be some funny cowen description, but no :('}}”
          </p>
          <div class="stats">
            <p>Rank #{{cowven.rank}}</p>
            <p>Score #{{cowven.score}}</p>
            <p>Wins #{{cowven.wins}}</p>
            <p>Loses #{{cowven.loses}}</p>
            <p>Members #{{cowven.members.length}}</p>
          </div>
        </div>

        <div class="link-wrapper">
          <span class="change-link" @click="showNewSpellForm">
            Cast new spell
          </span>
        </div>
      </div>

      <div class="content-container">
        <div class="leaderboard">
          <v-card>
            <v-data-table
              :headers="headers"
              :items="grates"
              :search="search"
              :items-per-page="5"
            >
              <template v-slot:item.wizard="{ item }">
                <img
                  class="table-image"
                  :src="require(`@/assets/${item.wizard}.png`)"
                  alt
                />
              </template>
            </v-data-table>
          </v-card>
        </div>

        <Spells v-if="!showCreateProposal" :proposals="cowven.proposals" />
        <MakeProposal v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import Preloader from "../components/Preloader.vue";
import TopNav from "../components/TopNav.vue";
import Spells from "../components/Spells.vue";
import MakeProposal from "../components/MakeProposal.vue";
import { allDaosData } from "../graphql/queries";

export default {
  props: ['id'],
  components: {
    Preloader,
    TopNav,
    Spells,
    MakeProposal
  },
  apollo: {
    allDaosInfo: {
      query: allDaosData
    }
  },
  data() {
    return {
      allDaosInfo: [],
      dialog: false,
      showCreateProposal: false,
      search: "",
      proposals: [
        {
          id: 1,
          spell: "Cut the cheese",
          wizardId: "1380",
          description:
            "This Wizard is cheap cheddar for for fast-food chains. Time to unload this dude!"
        },
        {
          id: 2,
          spell: "Convert Cowven",
          wizardId: null,
          description:
            "Let’s switch to the god of flames. This seems to be the best tactical move for next season. "
        },
        {
          id: 3,
          spell: "Length of Penalty",
          wizardId: null,
          description:
            "There seem to be a lot of inactive Wizards. I propose to change the activity penalty to 7 days."
        }
      ],
      headers: [
        {
          text: "",
          align: "left",
          sortable: false,
          value: "wizard"
        },
        {
          text: "Rank",
          align: "left",
          value: "rank"
        },
        { text: "Score", value: "score" },
        { text: "Reputation", value: "reputation" },
        { text: "ID", value: "id" }
      ],
      grates: [
        {
          wizard: "fire-wizard",
          rank: "#1",
          score: "9000+",
          reputation: "000",
          id: "#97587"
        },
        {
          wizard: "water-wizard",
          rank: "#2",
          score: "9000+",
          reputation: "000",
          id: "#78567"
        },
        {
          wizard: "wind-wizard",
          rank: "#3",
          score: "9000+",
          reputation: "000",
          id: "#14124"
        },
        {
          wizard: "neutral-wizard",
          rank: "#4",
          score: "9000+",
          reputation: "000",
          id: "#42140"
        },
        {
          wizard: "fire-wizard",
          rank: "#1",
          score: "9000+",
          reputation: "000",
          id: "#05400"
        },
        {
          wizard: "water-wizard",
          rank: "#2",
          score: "9000+",
          reputation: "000",
          id: "#003400"
        },
        {
          wizard: "wind-wizard",
          rank: "#3",
          score: "9000+",
          reputation: "000",
          id: "#0040"
        },
        {
          wizard: "neutral-wizard",
          rank: "#4",
          score: "9000+",
          reputation: "000",
          id: "#00230"
        }
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
      this.showCreateProposal = !this.showCreateProposal
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/screen-size";
@import "../style/vars";

.header-container {
  padding-bottom: 10px;
  margin: 0 30px 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  @include respond-to(sm) {
    margin: 0 10px 30px;
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
