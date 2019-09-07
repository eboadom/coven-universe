import Vue from "vue";
import Router from "vue-router";
import Landing from "./views/Landing.vue";
import Home from "./views/Home.vue";
import CreateCowven from "./views/CreateCowven.vue";
import MyWizards from "./views/MyWizards.vue";
import CBD from "./views/CBD.vue";
import CowvenHome from "./views/CowvenHome.vue";
import CowvenJoin from "./views/CowvenJoin.vue";
import MakeProposal from "./views/MakeProposal.vue";
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
          path: "about",
          name: "about",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/About.vue")
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
          path: "cowvenhome",
          name: "cowvenhome",
          component: CowvenHome
        },
        {
          path: "cowvenjoin",
          name: "cowvenjoin",
          component: CowvenJoin
        },
        {
          path: "makeproposal",
          name: "makeproposal",
          component: MakeProposal
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
