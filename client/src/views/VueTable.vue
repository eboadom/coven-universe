<template>
  <div id="app" class="ui container">
    <h1>&lt;Vuetable 2&gt;</h1>
    <!-- <vuetable
      ref="vuetable"
      :api-mode="false"
      :fields="fields"
      :per-page="perPage"
      :data-manager="dataManager"
      pagination-path="pagination"
      @vuetable:pagination-data="onPaginationData"
    >
      <div slot="actions" slot-scope="props">
        <button class="ui small button" @click="onActionClicked('view-item', props.rowData)">
          <i class="zoom icon"></i>
        </button>
        <button class="ui small button" @click="onActionClicked('edit-item', props.rowData)">
          <i class="edit icon"></i>
        </button>
        <button class="ui small button" @click="onActionClicked('delete-item', props.rowData)">
          <i class="delete icon"></i>
        </button>
      </div>
    </vuetable>-->

    <!-- <vuetable
      api-url="https://vuetable.ratiw.net/api/users"
      :fields="['name', 'email']"
      data-path="data"
      pagination-path
    ></vuetable>-->

    <vuetable ref="vuetable" :api-mode="false" :fields="fields" :data="data">
      <div slot="actions" slot-scope="props">
        <button class="ui small button" @click="onActionClicked('view-item', props.rowData)">
          <i class="zoom icon"></i>
        </button>
        <button class="ui small button" @click="onActionClicked('edit-item', props.rowData)">
          <i class="edit icon"></i>
        </button>
        <button class="ui small button" @click="onActionClicked('delete-item', props.rowData)">
          <i class="delete icon"></i>
        </button>
      </div>
    </vuetable>

    <div style="padding-top:10px">
      <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
    </div>
  </div>
</template>
<script>
import Vuetable from "vuetable-2";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import FieldsDef from "../FieldsDef.js";
import Data from "../Data.js";
// import axios from "axios";
// import _ from "lodash";

export default {
  name: "landing",
  components: {
    Vuetable,
    VuetablePagination
  },
  data() {
    return {
      fields: FieldsDef,
      perPage: 3,
      data: [],
      existingData: Data
    };
  },

  //   watch: {
  //     data(newVal, oldVal) {
  //       this.$refs.vuetable.refresh();
  //     }
  //   },

  created() {
    this.data = this.existingData.data.slice(0, 5);
  },

  //   mounted() {
  //     axios.get("https://vuetable.ratiw.net/api/users").then(response => {
  //       this.data = response.data.data;
  //       console.log(this.data);
  //     });
  //   },

  methods: {
    // onPaginationData(paginationData) {
    //   this.$refs.pagination.setPaginationData(paginationData);
    // },
    // onChangePage(page) {
    //   this.$refs.vuetable.changePage(page);
    // },
    // dataManager(sortOrder, pagination) {
    //   if (this.data.length < 1) return;
    //   let local = this.data;
    //   // sortOrder can be empty, so we have to check for that as well
    //   if (sortOrder.length > 0) {
    //     console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
    //     local = _.orderBy(
    //       local,
    //       sortOrder[0].sortField,
    //       sortOrder[0].direction
    //     );
    //   }
    //   pagination = this.$refs.vuetable.makePagination(
    //     local.length,
    //     this.perPage
    //   );
    //   console.log("pagination:", pagination);
    //   let from = pagination.from - 1;
    //   let to = from + this.perPage;
    //   return {
    //     pagination: pagination,
    //     data: _.slice(local, from, to)
    //   };
    // },
    // onActionClicked(action, data) {
    //   console.log("slot actions: on-click", data.name);
    // }
  }
};
</script>
<style scoped>
button.ui.button {
  padding: 8px 3px 8px 10px;
  margin-top: 1px;
  margin-bottom: 1px;
}
</style>


