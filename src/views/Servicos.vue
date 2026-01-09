<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
import Toast from "../components/Toast.vue";

const servicos = ref([]);
const form = ref({
  nome: "",
  descricao: "",
  tipo: "",
  preco_base: "",
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
const loadServicos = async () => {
  try {
    servicos.value = (await api.get("servicos/")).data;
  } catch {
    showToast("Erro ao carregar serviços", "danger");
  }
};

const save = async () => {
  try {
    if (editingId.value) {
      await api.put(`servicos/${editingId.value}/`, form.value);
      showToast("Serviço actualizado");
    } else {
      await api.post("servicos/", form.value);
      showToast("Serviço criado");
    }

    form.value = {};
    editingId.value = null;
    loadServicos();
  } catch {
    showToast("Erro ao guardar serviço", "danger");
  }
};

const edit = (s) => {
  form.value = { ...s };
  editingId.value = s.id;
};

const remove = async (id) => {
  if (confirm("Eliminar este serviço?")) {
    await api.delete(`servicos/${id}/`);
    showToast("Serviço eliminado", "danger");
    loadServicos();
  }
};

onMounted(loadServicos);
</script>



<template>
  <div class="container mt-4">

    <div class="toast-container" v-if="toastMessage">
      <Toast :message="toastMessage" :type="toastType" />
    </div>

    <h3 class="mb-3">Gestão de Serviços</h3>

    
      <h5 class="mb-3">
        {{ editingId ? "Editar Serviço" : "Novo Serviço" }}
      </h5>

      <form class="row g-3" @submit.prevent="save">
        <div class="col-md-6">
          <input class="form-control" v-model="form.nome" placeholder="Nome" required />
        </div>

        <div class="col-md-6">
          <input class="form-control" v-model="form.tipo" placeholder="Tipo" />
        </div>

        <div class="col-md-6">
          <input class="form-control" v-model="form.preco_base" placeholder="Preço Base" />
        </div>

        <div class="col-12">
          <input class="form-control" v-model="form.descricao" placeholder="Descrição" />
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
      <h5 class="mb-3">Lista de Serviços</h5>

      <div class="table-responsive">
        <table class="table table-hover table-bordered align-middle">
          <thead class="table-light">
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th style="width:150px">Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="s in servicos" :key="s.id">
              <td>{{ s.nome }}</td>
              <td>{{ s.tipo }}</td>
              <td>{{ s.descricao }}</td>
              <td>{{ s.preco_base }} kz</td>
              <td class="text-center">
                <button class="btn btn-sm btn-warning me-1" @click="edit(s)">Editar</button>
                <button class="btn btn-sm btn-danger" @click="remove(s.id)">Eliminar</button>
              </td>
            </tr>

            <tr v-if="!servicos.length">
              <td colspan="5" class="text-center text-muted">
                Nenhum serviço registado
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  
</template>
