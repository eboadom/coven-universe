<template>
  <div>
    <TopNav />
    <div class="MakeProposal">
      <div class="header-container">
        <h1>cowven name</h1>

        <div class="center-container">
          <p>
            “Cowven unique description that the creator entered in the ‘create a
            cowven’ screen”
          </p>
          <div class="stats">
            <p>Rank #000</p>
            <p>Score #000</p>
            <p>Wins #000</p>
            <p>Losses #000</p>
            <p>Penalty #000</p>
          </div>
        </div>

        <div class="link-wrapper">
          <router-link class="change-link" :to="{ name: 'cowvenhome' }">
            Active Spell Proposals
          </router-link>
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

      </div>
    </div>
  </div>
</template>

<script>
import Preloader from "../components/Preloader.vue";
import TopNav from "../components/TopNav.vue";

export default {
  components: {
    Preloader,
    TopNav
  },
  data() {
    return {
      search: "",
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
          id: "#1234000"
        },
        {
          wizard: "water-wizard",
          rank: "#2",
          score: "9000+",
          reputation: "000",
          id: "#00123"
        },
        {
          wizard: "wind-wizard",
          rank: "#3",
          score: "9000+",
          reputation: "000",
          id: "#12340"
        },
        {
          wizard: "neutral-wizard",
          rank: "#4",
          score: "9000+",
          reputation: "000",
          id: "#01240"
        },
        {
          wizard: "fire-wizard",
          rank: "#1",
          score: "9000+",
          reputation: "000",
          id: "#3200"
        },
        {
          wizard: "water-wizard",
          rank: "#2",
          score: "9000+",
          reputation: "000",
          id: "#0100"
        },
        {
          wizard: "wind-wizard",
          rank: "#3",
          score: "9000+",
          reputation: "000",
          id: "#0001"
        },
        {
          wizard: "neutral-wizard",
          rank: "#4",
          score: "9000+",
          reputation: "000",
          id: "#0020"
        }
      ],
    };
  },
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

.v-sheet {
  img {
    width: 4rem;
    @media screen and (max-width: 1020px) {
      width: 2rem;
    }
  }

  h1 {
    @media screen and (max-width: 1020px) {
      font-size: 1.5rem;
    }
  }
}

</style>
