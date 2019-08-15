<template>
  <div id="main-container">
    <div class="topnav">
      <img src="../assets/cheezedao.svg" alt />
      <div class="button-container">
        <button class="button">Sanctuary</button>
        <button class="button">My Wizards</button>
      </div>
    </div>

    <div class="content-container">
      <div class="create-coven">
        <h1>My Wizards</h1>

        <v-data-table :headers="headers" :items="grates" :search="search">
          <template v-slot:item.god="{ item }">
            <!-- <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
            <v-icon small @click="deleteItem(item)">delete</v-icon>-->
            <!-- <img v-bind:src="'/img/' + item.god + '.svg'" alt /> -->
            <img :src="require(`@/assets/${item.god}.svg`)" />
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {}
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

      .form-container {
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
