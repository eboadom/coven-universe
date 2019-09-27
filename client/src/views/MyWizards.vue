<template>
  <Preloader v-if="$apollo.queries.allWizardsDataByOwner.loading || $apollo.queries.allDaosInfo.loading" />
  <div v-else>
    <TopNav />
    <div class="my-container">
      <div class="my-wizards">
        <div class="caption">
          <h1>My Wizards</h1>
          <button v-if="formattedWizards.length" class="button button-small" @click.prevent="mint" >Mint Wizard</button>
        </div>
        <div class="no-wizards" v-if="!formattedWizards.length">
          <p>It seems you don’t have any Wizards at this sad point in your life. Luckily for you, you can either connect to your wallet and hopefully find a Wizard there, or just mint one.</p>
          <button class="button button-small" @click.prevent="mint" >Mint Wizard</button>
        </div>
        <v-data-table
          v-else
          :headers="headers"
          :items="formattedWizards"
          :search="search"
          :items-per-page="5"
        >
          <template v-slot:item.wizard="{ item }">
            <img
              class="wizard-img"
              alt=""
              :src="
                require(`@/assets/${item.affinity.toLowerCase()}-wizard.png`)
              "
            />
          </template>

          <template v-slot:item.score="{ item }">
            {{ item.score || 0 }}
          </template>

          <template v-slot:item.wizardWalletData.wizardWalletAddress="{ item }">
            <div
              class="wallet-inner"
              v-if="
                item.wizardWalletData.wizardWalletAddress !==
                  '0x0000000000000000000000000000000000000000'
              "
            >
              <img src="../assets/purse.svg" alt="Purse" />
              <a
                :href="
                  `https://rinkeby.etherscan.io/address/${item.wizardWalletData.wizardWalletAddress}`
                "
                target="_blank"
              >
                {{ item.wizardWalletData.wizardWalletAddress }}
              </a>
            </div>
            <div v-else>
              <button
                class="button button-small"
                @click="e => createWallet(e, item.id)"
              >
                Create RepBag
              </button>
            </div>
          </template>
        </v-data-table>
      </div>
    </div>

    <v-dialog v-model="dialog" content-class="thank-dialog">
      <v-card class="dialog">
        <img src="../assets/wheel.svg" alt />
        <h1>Thank You</h1>
        <v-card-text>
          RepBag successfully created
        </v-card-text>

        <v-spacer></v-spacer>
        <button class="button" @click="dialog = false">
          Got it
        </button>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Preloader from "../components/Preloader.vue";
import TopNav from "../components/TopNav.vue";
import { allDaosData, allWizardsByUserAddress } from "../graphql/queries";
import { createWalletForWizard, mintWizard } from "../graphql/mutations";
import { getWeb3 } from "../helpers/web3-helpers";

export default {
  components: {
    Preloader,
    TopNav
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
      search: "",
      dialog: false,
      headers: [
        {
          text: "Wizard",
          align: "left",
          sortable: false,
          value: "wizard"
        },
        { text: "ID", value: "id" },
        { text: "Type", value: "affinity" },
        { text: "Score", value: "score" },
        { text: "Cowven", value: "cowvenName" },
        {
          text: "Reputation",
          value: "reputation"
        },
        { text: "RepBag", value: "wizardWalletData.wizardWalletAddress" }
      ]
    };
  },
  computed: {
    formattedWizards() {
      return this.allWizardsDataByOwner.map(wizard => {
        let mostReputableCowven = { reputation: "0", cowvenId: "-" };
        wizard.wizardWalletData.reputationOfWalletByCowven.forEach(cowven => {
          if(Number(cowven.reputation) > Number(mostReputableCowven.reputation)) {
            mostReputableCowven = cowven;
          }
        });
        return {
          ...wizard,
          cowvenName: mostReputableCowven.cowvenId,
          score: wizard.score || '-',
          reputation: mostReputableCowven.reputation !== "0" ? mostReputableCowven.reputation : "-",
        }
      })
    }
  },
  methods: {
    openModal() {
      this.dialog = true;
    },
    async mint() {
      const web3 = getWeb3();
      const {
        data: { mintWizard: txs }
      } = await this.$apollo.mutate({
        mutation: mintWizard,
        variables: {
          data: {
            userWallet: window.userWallet,
          }
        }
      });
      await web3.eth.sendTransaction(txs[0]);
      await this.$apollo.queries.allWizardsDataByOwner.refetch();
    },
    async createWallet(e, wizardId) {
      e.preventDefault();
      const web3 = getWeb3();
      const {
        data: { createWalletForWizard: tx }
      } = await this.$apollo.mutate({
        mutation: createWalletForWizard,
        variables: {
          data: {
            userWallet: window.userWallet,
            wizardId
          }
        }
      });
      await web3.eth.sendTransaction(tx);
      await this.$apollo.queries.allWizardsDataByOwner.refetch();
      this.openModal();
    }
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
@import "../style/vars";

.my-wizards {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .caption {
    margin-bottom: 40px;
    text-align: left;
    border-bottom: 1px solid rgba(#000, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      margin-bottom: 10px;
    }
  }
  .no-wizards {
    display: flex;
    flex-grow: 1;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    p {
      max-width: 50%;
      margin-bottom: 20px;
    }
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

.wallet-inner {
  display: flex;
  align-items: center;
  img {
    width: 23px;
    height: 20px;
    margin-right: 7px;
  }
  a {
    color: #000;
    text-decoration: none;
    word-break: break-all;
    &:hover {
      color: $purple;
    }
  }
}
</style>
