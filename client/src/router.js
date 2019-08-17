import Vue from "vue";
import Router from "vue-router";
import Landing from "./views/Landing.vue";
import Home from "./views/Home.vue";
import CreateCowven from "./views/CreateCowven.vue";
import MyWizards from "./views/MyWizards.vue";
import TheSanctuary from "./views/TheSanctuary.vue";
import CowvenHome from "./views/CowvenHome.vue";
import MakeProposal from "./views/MakeProposal.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/createcowven",
      name: "createcowven",
      component: CreateCowven
    },
    {
      path: "/mywizards",
      name: "mywizards",
      component: MyWizards
    },
    {
      path: "/thesanctuary",
      name: "thesanctuary",
      component: TheSanctuary
    },
    {
      path: "/cowvenhome",
      name: "cowvenhome",
      component: CowvenHome
    },
    {
      path: "/makeproposal",
      name: "makeproposal",
      component: MakeProposal
    }
  ]
});
