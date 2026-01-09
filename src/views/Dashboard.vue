<template>
  <div class="dashboard">
    <h2 class="mb-4">📊 Dashboard Geral</h2>

    <div class="row g-4">
      <div class="col-md-3" v-for="card in cards" :key="card.title">
        <div class="card shadow-sm dashboard-card">
          <div class="card-body d-flex align-items-center">
            <div class="icon-box me-3" :class="card.color">
              <i :class="card.icon"></i>
            </div>
                  
            <div>
              <h6 class="text-muted mb-1">{{ card.title }}</h6>
              <h3 class="mb-0 fw-bold">{{ card.value }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5 alert alert-info">
      <strong>Sistema SOPUKA</strong> – Painel de controlo geral do sistema de gestão.
    </div>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return {
      cards: [
        {
          title: "Clientes",
          value: 0,
          icon: "bi bi-people-fill",
          color: "bg-primary",
          endpoint: "clientes/",
        },
        {
          title: "Projetos",
          value: 0,
          icon: "bi bi-kanban-fill",
          color: "bg-success",
          endpoint: "projetos/",
        },
        {
          title: "Serviços",
          value: 0,
          icon: "bi bi-tools",
          color: "bg-warning",
          endpoint: "servicos/",
        },
        {
          title: "Equipas",
          value: 0,
          icon: "bi bi-diagram-3-fill",
          color: "bg-danger",
          endpoint: "equipas/",
        },
      ],
    };
  },

  async mounted() {
    for (const card of this.cards) {
      const res = await api.get(card.endpoint);
      card.value = res.data.length;
    }
  },
};
</script>

<style scoped>
.dashboard {
  padding: 10px;
}

.dashboard-card {
  border: none;
  border-radius: 12px;
  transition: transform 0.2s ease;
}

.dashboard-card:hover {
  transform: translateY(-5px);
}

.icon-box {
  width: 55px;
  height: 55px;
  border-radius: 12px;
  color: #fff;
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
