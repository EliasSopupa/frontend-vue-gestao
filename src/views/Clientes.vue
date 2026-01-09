<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
import Toast from "../components/Toast.vue";

const clientes = ref([]);
const form = ref({
  nome: "",
  telefone: "",
  email: "",
  localizacao: "",
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
const loadClientes = async () => {
  try {
    clientes.value = (await api.get("clientes/")).data;
  } catch {
    showToast("Erro ao carregar clientes", "danger");
  }
};

const save = async () => {
  try {
    if (editingId.value) {
      await api.put(`clientes/${editingId.value}/`, form.value);
      showToast("Cliente actualizado com sucesso");
    } else {
      await api.post("clientes/", form.value);
      showToast("Cliente criado com sucesso");
    }

    form.value = {};
    editingId.value = null;
    loadClientes();
  } catch {
    showToast("Erro ao guardar cliente", "danger");
  }
};

const edit = (c) => {
  form.value = { ...c };
  editingId.value = c.id;
};

const remove = async (id) => {
  if (confirm("Eliminar este cliente?")) {
    await api.delete(`clientes/${id}/`);
    showToast("Cliente eliminado", "danger");
    loadClientes();
  }
};

onMounted(loadClientes);
</script>


<template>
  <div class="container mt-4">

    <!-- TOAST -->
    <div class="toast-container" v-if="toastMessage">
      <Toast :message="toastMessage" :type="toastType" />
    </div>

    <!-- TÍTULO -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Gestão de Clientes</h3>
    </div>

    <!-- FORMULÁRIO -->
    
      <h5 class="mb-3">
        {{ editingId ? "Editar Cliente" : "Novo Cliente" }}
      </h5>

      <form class="row g-3" @submit.prevent="save">
        <div class="col-md-6">
          <input
            class="form-control"
            v-model="form.nome"
            placeholder="Nome do cliente"
            required
          />
        </div>

        <div class="col-md-6">
          <input
            class="form-control"
            v-model="form.telefone"
            placeholder="Telefone"
          />
        </div>

        <div class="col-md-6">
          <input
            class="form-control"
            v-model="form.email"
            placeholder="Email"
            type="email"
          />
        </div>

        <div class="col-md-6">
          <input
            class="form-control"
            v-model="form.localizacao"
            placeholder="Localização"
          />
        </div>

        <div class="col-12 d-flex gap-2">
          <button class="btn btn-primary">
            {{ editingId ? "Actualizar" : "Guardar" }}
          </button>

          <button
            v-if="editingId"
            type="button"
            class="btn btn-secondary"
            @click="
              editingId = null;
              form = {};
            "
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>

    <!-- LISTAGEM -->
    <div class="card">
      <h5 class="mb-3">Lista de Clientes</h5>

      <div class="table-responsive">
        <table class="table table-hover table-bordered align-middle">
          <thead class="table-light">
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Localização</th>
              <th style="width: 150px">Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="c in clientes" :key="c.id">
              <td>{{ c.nome }}</td>
              <td>{{ c.telefone }}</td>
              <td>{{ c.email }}</td>
              <td>{{ c.localizacao }}</td>
              <td class="text-center">
                <button
                  class="btn btn-sm btn-warning me-1"
                  @click="edit(c)"
                >
                  Editar
                </button>
                <button
                  class="btn btn-sm btn-danger"
                  @click="remove(c.id)"
                >
                  Eliminar
                </button>
              </td>
            </tr>

            <tr v-if="!clientes.length">
              <td colspan="5" class="text-center text-muted">
                Nenhum cliente registado
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  
</template>
