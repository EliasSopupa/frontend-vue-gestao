<template>
  <div class="sidebar">
    <h2>SOPUKA</h2>
    <router-link to="/">Dashboard</router-link>
    <router-link to="/clientes">Clientes</router-link>
    <router-link to="/projetos">Projetos</router-link>
    <router-link to="/servicos">Serviços</router-link>
    <router-link to="/equipas">Equipas</router-link>
  </div>
</template>

<style scoped>
.sidebar {
  width: 220px;
  background: #1f2937;
  min-height: 100vh;
  color: white;
  padding: 20px;
}
a {
  display: block;
  color: #cbd5e1;
  margin: 10px 0;
  text-decoration: none;
}
a.router-link-active {
  color: #fff;
  font-weight: bold;
}
</style>
