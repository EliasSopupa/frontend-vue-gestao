import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "../views/Dashboard.vue";
import Clientes from "../views/Clientes.vue";
import Servicos from "../views/Servicos.vue";
import Projetos from "../views/Projetos.vue";
import Equipas from "../views/Equipas.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/clientes", component: Clientes },
  { path: "/servicos", component: Servicos },
  { path: "/projetos", component: Projetos },
  { path: "/equipas", component: Equipas },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
