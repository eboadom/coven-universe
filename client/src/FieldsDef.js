import VuetableFieldHandle from "vuetable-2/src/components/VuetableFieldHandle.vue";

export default [
  {
    name: VuetableFieldHandle
  },
  {
    name: "rank",
    title: "Rank",
    sortField: "rank"
  },
  {
    name: "name",
    title: "Name",
    sortField: "name"
  },
  {
    name: "salary",
    title: "Score",
    sortField: "salary"
  },
  {
    name: "members",
    title: "Members",
    sortField: "members"
  },
  {
    name: "god",
    title: "God",
    sortField: "god"
  }
  //   {
  //     name: "gender",
  //     formatter: value => {
  //       return value === "M" ? "Male" : "Female";
  //     }
  //   }
];
