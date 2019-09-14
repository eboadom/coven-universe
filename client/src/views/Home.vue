<template>
  <Preloader v-if="$apollo.queries.allDaosInfo.loading" />
  <div v-else>
    <TopNav />
    <div class="my-container">
      <div class="Home">
        <div class="leaderboard leaderboard-home">
          <div class="caption">
            <h1>G.O.A.T.* Cheeze Board</h1>
          </div>

          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="allDaosInfo"
              :search="search"
              :single-expand="true"
              :expanded.sync="expanded"
              item-key="name"
              show-expand
            >
              <template v-slot:item.grate="{ item }">
                <img
                  v-if="item.grate"
                  :src="require(`@/assets/${item.grate.toLowerCase()}.svg`)"
                  alt
                />
              </template>

              <template v-slot:item.members="{ item }">
                {{ item.members.length }}
              </template>

              <template v-slot:expanded-item="{ item }">
                <td :colspan="headers.length + 1">
                  <p>{{ item.description }}</p>
                  <div class="button-inner">
                    <button class="button" @click="redirectToMyCowven(item.id)">
                      Go to Cowven
                    </button>
                  </div>
                </td>
              </template>
            </v-data-table>
          </v-card>
        </div>

        <div class="create-coven">
          <div class="caption">
            <h1>Create Cowven</h1>
          </div>

          <div class="summon-container">
            <img src="../assets/utter.svg" alt />
            <p>
              Summon your Cowven! Gather your wizard homies and rule together
              the cheesiest coven of the hood.
            </p>
            <router-link :to="{ name: 'createcowven' }">
              <button class="button">
                Summon
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { allDaosData } from "../graphql/queries";
import Preloader from "../components/Preloader.vue";
import TopNav from "../components/TopNav.vue";

export default {
  components: {
    Preloader,
    TopNav
  },
  apollo: {
    allDaosInfo: {
      query: allDaosData
    }
  },
  data() {
    return {
      allDaosInfo: [],
      search: "",
      expanded: [],
      headers: [
        {
          text: "Rank",
          align: "left",
          sortable: false,
          value: "rank"
        },
        { text: "Name", value: "id" },
        { text: "Score", value: "score" },
        { text: "Members", value: "members" },
        { text: "God", value: "grate" }
      ]
    };
  },
  methods: {
    redirectToMyCowven(id) {
      this.$router.push({ path: `cowvenhome/${id}` });
    }
  },
  mounted() {
    const trs = Array.from(
      document.querySelectorAll(".v-data-table__wrapper tr")
    );

    trs.map(el =>
      el.addEventListener("click", e => {
        e.target.parentElement.firstElementChild.firstElementChild.click();
      })
    );
  }
};
</script>
<style lang="scss">
@import "../style/screen-size";
@import "../style/vars";

.leaderboard-home {
  tr {
    cursor: pointer !important;
  }
}

.leaderboard {
  th {
    color: #000 !important;
    text-transform: uppercase;
  }

  tbody {
    tr {
      position: relative;
      transform: scale(1);
      transition: all 0.3s ease;
      &:hover {
        background: $primary !important;
        border-bottom-color: #000 !important;
        @include respond-to(sm) {
          background: #fff !important;
        }
      }
      td {
        font-family: "codesaver";
      }
    }
    .expanded__content {
      width: 100%;
      border-bottom: 1px solid #000 !important;
      cursor: default !important;
      &:hover {
        background-color: transparent !important;
      }
      td {
        padding: 10px;
        .button-inner {
          margin: 10px 0;
          text-align: center;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@import "../style/screen-size";
@import "../style/vars";

.Home {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.leaderboard {
  width: 60%;
  @include respond-to(md) {
    width: 100%;
    margin-bottom: 25px;
  }
  .caption {
    text-align: center;
    margin-bottom: 20px;
  }
  h1 {
    position: relative;
    display: inline-block;
    font-size: 30px;
    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 70px;
      height: 2px;
      background: rgba(#000, 0.5);
    }
    &:before {
      left: 102%;
    }
    &:after {
      right: 102%;
    }
  }
  .v-card {
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 0;
  }
  .v-card__title {
    margin-bottom: 25px;
  }
}

.create-coven {
  width: 30%;
  margin-bottom: 20px;
  @include respond-to(md) {
    width: 50%;
    margin: 0 auto 20px;
  }
  @include respond-to(sm) {
    width: 80%;
  }
  @include respond-to(xs) {
    width: 100%;
  }
  .caption {
    text-align: center;
    margin-bottom: 20px;
    h1 {
      position: relative;
      display: inline-block;
      font-size: 20px;
      &:before,
      &:after {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 2px;
        background: rgba(#000, 0.5);
      }
      &:before {
        left: 105%;
      }
      &:after {
        right: 105%;
      }
    }
  }
  .summon-container {
    padding: 40px 15px 35px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.12);
    text-align: center;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      bottom: -10px;
      height: 2px;
      width: 100%;
      background: rgba(#000, 0.3);
      left: 0;
    }
    p {
      margin: 25px 0 40px;
    }
  }
}
</style>
