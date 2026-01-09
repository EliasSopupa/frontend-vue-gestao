<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand">API Gestão SOPUKA</a>
      <ul class="navbar-nav">
        <li class="nav-item"><router-link to="/" class="nav-link">Dashboard</router-link></li>
        <li class="nav-item"><router-link to="/clientes" class="nav-link">Clientes</router-link></li>
        <li class="nav-item"><router-link to="/servicos" class="nav-link">Serviços</router-link></li>
        <li class="nav-item"><router-link to="/projetos" class="nav-link">Projetos</router-link></li>
        <li class="nav-item"><router-link to="/equipas" class="nav-link">Equipas</router-link></li>
      </ul>
    </div>
  </nav>
</template>
