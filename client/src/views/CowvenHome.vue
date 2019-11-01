<template>
  <Preloader
    v-if="
      $apollo.queries.allDaosInfo.loading ||
      $apollo.queries.allWizardsDataByOwner.loading ||
      $apollo.queries.allWizardWalletsCreated.loading
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
            <p>Score {{ cowven.score }}</p>
            <p>Wins {{ cowven.wins }}</p>
            <p>Loses {{ cowven.loses }}</p>
            <p>Members {{ cowven.members.length }}</p>
          </div>
        </div>

        <div class="link-wrapper">
          <span class="change-link" @click="showNewSpellForm">
            <span v-if="!showCreateProposal">Submit new proposal</span>
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

        <Proposals
          v-if="!showCreateProposal"
          :proposals="cowven.proposals"
          :myWizards="myWizardsInCowven"
          :onSuccessVote="handleSuccessSubmission"
          :avatarAddress="cowven.avatarAddress"
        />
        <MakeProposal :members="allWizardWalletsCreated" :onSuccessSubmission="handleSuccessProposalSubmission" :avatarAddress="cowven.avatarAddress" v-else />
      </div>
    </div>
    <v-dialog v-model="dialogProposalSuccess" content-class="thank-dialog">
      <v-card class="dialog">
        <img src="../assets/wheel.svg" alt />
        <h1>Thank You</h1>
        <v-card-text
        >You have submitted your proposal. It will now be reviewed by the
          Cowven, drink milk in the meantime.</v-card-text
        >

        <v-spacer />
        <button
          class="button"
          color="primary"
          text
          @click.prevent="toggleDialogProposalSuccess"
        >
          Gouda'nough
        </button>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Preloader from "../components/Preloader.vue";
import TopNav from "../components/TopNav.vue";
import Proposals from "../components/Proposals.vue";
import MakeProposal from "../components/MakeProposal.vue";
import { allDaosData, allWizardsByUserAddress, allWizardWalletsCreated } from "../graphql/queries";

export default {
  props: ["id"],
  components: {
    Preloader,
    TopNav,
    Proposals,
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
    },
    allWizardWalletsCreated: {
      query: allWizardWalletsCreated,
    }
  },
  data() {
    return {
      dialogProposalSuccess: false,
      allDaosInfo: [],
      allWizardsDataByOwner: [],
      allWizardWalletsCreated: [],
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
          value: "currentCowvenReputation"
        },
        { text: "ID", value: "id" }
      ]
    };
  },
  computed: {
    cowven() {
      const cowven = this.allDaosInfo.find(item => item.id === this.id);
      if (cowven) {
        return {
          ...cowven,
          members: cowven.members.map(member => ({
            ...member,
            currentCowvenReputation: (
              member.wizardWalletData.reputationOfWalletByCowven.find(
                cow => cow.cowvenId === cowven.id
              ) || { reputation: 0 }
            ).reputation
          }))
        }
      }
      return cowven;
    },
    myWizardsInCowven() {
      return this.allWizardsDataByOwner.filter(
        wizard => wizard.wizardWalletData.reputationOfWalletByCowven.find(
          cowen => cowen.cowvenId === this.cowven.id && Number(cowen.reputation)
        )
      )
    }
  },
  methods: {
    showNewSpellForm() {
      this.showCreateProposal = !this.showCreateProposal;
    },
    async handleSuccessSubmission() {
      await this.$apollo.queries.allDaosInfo.refetch();
    },
    toggleDialogProposalSuccess() {
      this.dialogProposalSuccess = !this.dialogProposalSuccess;
    },
    async handleSuccessProposalSubmission() {
      await this.handleSuccessSubmission();
      this.showNewSpellForm();
      this.toggleDialogProposalSuccess();
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
.dialog {
  display: flex;
  flex-direction: column;
  vertical-align: center;
  text-align: center;

  img {
    padding: 2rem 0;
    margin: auto;
  }

  .v-card__text {
    padding: 3rem;
    padding-bottom: 0;
  }

  button {
    margin: auto;
    margin-bottom: 2rem;
  }
}

</style>
