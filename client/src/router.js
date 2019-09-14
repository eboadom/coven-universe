import Vue from "vue";
import Router from "vue-router";

import Landing from "./views/Landing.vue";
import Home from "./views/Home.vue";
import CreateCowven from "./views/CreateCowven.vue";
import MyWizards from "./views/MyWizards.vue";
import CBD from "./views/CBD.vue";
import CowvenHome from "./views/CowvenHome.vue";
import CowvenJoin from "./views/CowvenJoin.vue";
import UnlockDapper from "./views/UnlockDapper.vue";
import AppLayout from "./components/AppLayout";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing
    },
    {
      path: "/app",
      name: "app",
      component: AppLayout,
      children: [
        {
          path: "",
          name: "home",
          component: Home
        },
        {
          path: "createcowven",
          name: "createcowven",
          component: CreateCowven
        },
        {
          path: "mywizards",
          name: "mywizards",
          component: MyWizards
        },
        {
          path: "cbd",
          name: "cbd",
          component: CBD
        },
        {
          path: "cowvenhome/:id",
          props: true,
          name: "cowvenhome",
          component: CowvenHome
        },
        {
          path: "cowvenjoin",
          name: "cowvenjoin",
          component: CowvenJoin
        },
        {
          path: "unlockdapper",
          name: "unlockdapper",
          component: UnlockDapper
        }
      ]
    }
  ]
});
