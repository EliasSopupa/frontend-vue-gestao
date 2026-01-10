<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
import Toast from "../components/Toast.vue";

const projetos = ref([]);
const clientes = ref([]);
const servicos = ref([]);
const equipas = ref([]);

const form = ref({
  cliente: "",
  servicos: [],
  equipas: [],
  data_inicio: "",
  data_fim: "",
  estado: "",
  local_execucao: "",
});

const editingId = ref(null);

/* Toast */
const toastMessage = ref("");
const toastType = ref("success");

const showToast = (msg, type = "success") => {
  toastMessage.value = msg;
  toastType.value = type;
  setTimeout(() => (toastMessage.value = ""), 3000);
};

/* CRUD */
const loadAll = async () => {
  try {
    projetos.value = (await api.get("projetos/")).data;
    clientes.value = (await api.get("clientes/")).data;
    servicos.value = (await api.get("servicos/")).data;
    equipas.value = (await api.get("equipas/")).data;
  } catch {
    showToast("Erro ao carregar dados", "danger");
  }
};

const save = async () => {
  try {
    if (editingId.value) {
      await api.put(`projetos/${editingId.value}/`, form.value);
      showToast("Projeto actualizado");
    } else {
      await api.post("projetos/", form.value);
      showToast("Projeto criado");
    }

    resetForm();
    loadAll();
  } catch {
    showToast("Erro ao guardar projeto", "danger");
  }
};

const edit = (p) => {
  form.value = {
    cliente: p.cliente,
    servicos: p.servicos || [],
    equipas: p.equipas || [],
    data_inicio: p.data_inicio,
    data_fim: p.data_fim,
    estado: p.estado,
    local_execucao: p.local_execucao,
  };
  editingId.value = p.id;
};

const remove = async (id) => {
  if (confirm("Eliminar este projeto?")) {
    await api.delete(`projetos/${id}/`);
    showToast("Projeto eliminado", "danger");
    loadAll();
  }
};

const resetForm = () => {
  form.value = {
    cliente: "",
    servicos: [],
    equipas: [],
    data_inicio: "",
    data_fim: "",
    estado: "",
    local_execucao: "",
  };
  editingId.value = null;
};

onMounted(loadAll);
</script>

<template>
  <div class="container mt-4">

    <!-- Toast -->
    <div class="toast-container" v-if="toastMessage">
      <Toast :message="toastMessage" :type="toastType" />
    </div>

    
      <h4 class="mb-3">
        {{ editingId ? "Editar Projeto" : "Novo Projeto" }}
      </h4>

      <!-- FORM EM LISTA -->
      <form @submit.prevent="save" class="d-flex flex-column gap-3">

        <select class="form-control" v-model="form.cliente">
          <option value="">Selecione o Cliente</option>
          <option v-for="c in clientes" :key="c.id" :value="c.id">
            {{ c.nome }}
          </option>
        </select>

        <select class="form-control" v-model="form.servicos" multiple>
          <option v-for="s in servicos" :key="s.id" :value="s.id">
            {{ s.nome }}
          </option>
        </select>

        <select class="form-control" v-model="form.equipas" multiple>
          <option v-for="e in equipas" :key="e.id" :value="e.id">
            {{ e.nome }}
          </option>
        </select>

        <input type="date" class="form-control" v-model="form.data_inicio" />
        <input type="date" class="form-control" v-model="form.data_fim" />

        <input class="form-control" v-model="form.estado" placeholder="Estado" />

        <input
          class="form-control"
          v-model="form.local_execucao"
          placeholder="Local de execução"
        />

        <div class="d-flex gap-2">
          <button class="btn btn-primary">
            {{ editingId ? "Actualizar" : "Guardar" }}
          </button>

          <button
            v-if="editingId"
            type="button"
            class="btn btn-secondary"
            @click="resetForm"
          >
            Cancelar
          </button>
        </div>

      </form>
    </div>

    <!-- LISTA -->
    <div class="card">
      <h4 class="mb-3">Lista de Projetos</h4>

      <table class="table table-bordered table-hover">
        <thead class="table-light">
          <tr>
            <th>Cliente</th>
            <th>Serviços</th>
            <th>Equipas</th>
            <th>Estado</th>
            <th>Local</th>
            <th style="width: 150px">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="p in projetos" :key="p.id">
            <td>{{ p.cliente_nome }}</td>

            <td>
              <span
                v-for="s in p.servicos_nomes"
                :key="s"
                class="badge bg-info me-1"
              >
                {{ s }}
              </span>
            </td>

            <td>
              <span
                v-for="e in p.equipas_nomes"
                :key="e"
                class="badge bg-secondary me-1"
              >
                {{ e }}
              </span>
            </td>

            <td>{{ p.estado }}</td>
            <td>{{ p.local_execucao }}</td>

            <td>
              <button class="btn btn-sm btn-warning me-1" @click="edit(p)">
                Editar
              </button>
              <button class="btn btn-sm btn-danger" @click="remove(p.id)">
                Eliminar
              </button>
            </td>
          </tr>

          <tr v-if="!projetos.length">
            <td colspan="6" class="text-center text-muted">
              Nenhum projeto registado
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  
</template>
