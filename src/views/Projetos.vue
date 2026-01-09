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

    form.value = {};
    editingId.value = null;
    loadAll();
  } catch {
    showToast("Erro ao guardar projeto", "danger");
  }
};

const edit = (p) => {
  form.value = { ...p };
  editingId.value = p.id;
};

const remove = async (id) => {
  if (confirm("Eliminar este projeto?")) {
    await api.delete(`projetos/${id}/`);
    showToast("Projeto eliminado", "danger");
    loadAll();
  }
};

onMounted(loadAll);
</script>


<template>
  <div class="container mt-4">

    <div class="toast-container" v-if="toastMessage">
      <Toast :message="toastMessage" :type="toastType" />
    </div>

    <h3 class="mb-3">Gestão de Projetos</h3>

    
      <h5 class="mb-3">
        {{ editingId ? "Editar Projeto" : "Novo Projeto" }}
      </h5>

      <form class="row g-3" @submit.prevent="save">
        <div class="col-md-6">
          <select class="form-control" v-model="form.cliente">
            <option value="">Cliente</option>
            <option v-for="c in clientes" :key="c.id" :value="c.id">
              {{ c.nome }}
            </option>
          </select>
        </div>

        <div class="col-md-6">
          <input class="form-control" v-model="form.estado" placeholder="Estado" />
        </div>

        <div class="col-md-6">
          <input type="date" class="form-control" v-model="form.data_inicio" />
        </div>

        <div class="col-md-6">
          <input type="date" class="form-control" v-model="form.data_fim" />
        </div>

        <div class="col-12">
          <input class="form-control" v-model="form.local_execucao" placeholder="Local de execução" />
        </div>

        <div class="col-12 d-flex gap-2">
          <button class="btn btn-primary">
            {{ editingId ? "Actualizar" : "Guardar" }}
          </button>

          <button
            v-if="editingId"
            type="button"
            class="btn btn-secondary"
            @click="editingId = null; form = {}"
          >
            Cancelar

          </button>
        </div>
      </form>
    </div>

    <div class="card">

      <h5 class="mb-3">Lista de Projetos</h5>

      <div class="table-responsive">
        <table class="table table-hover table-bordered align-middle">
          <thead class="table-light">
            <tr>
              <th>Cliente</th>
              <th>Estado</th>
              <th>Local</th>
              <th style="width:150px">Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="p in projetos" :key="p.id">
              <td>{{ p.cliente_nome }}</td>
              <td>{{ p.estado }}</td>
              <td>{{ p.local_execucao }}</td>
              <td class="text-center">
                <button class="btn btn-sm btn-warning me-1" @click="edit(p)">Editar</button>
                <button class="btn btn-sm btn-danger" @click="remove(p.id)">Eliminar</button>
              </td>
            </tr>

            <tr v-if="!projetos.length">
              <td colspan="4" class="text-center text-muted">
                Nenhum projeto registado
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  
</template>
