<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
import Toast from "../components/Toast.vue";

const equipas = ref([]);
const form = ref({
  nome: "",
  funcao: "",
  especialidade: "",
  contacto: "",
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
const loadEquipas = async () => {
  try {
    equipas.value = (await api.get("equipas/")).data;
  } catch {
    showToast("Erro ao carregar equipas", "danger");
  }
};

const save = async () => {
  try {
    if (editingId.value) {
      await api.put(`equipas/${editingId.value}/`, form.value);
      showToast("Equipa actualizada");
    } else {
      await api.post("equipas/", form.value);
      showToast("Equipa criada");
    }

    form.value = {};
    editingId.value = null;
    loadEquipas();
  } catch {
    showToast("Erro ao guardar equipa", "danger");
  }
};

const edit = (e) => {
  form.value = { ...e };
  editingId.value = e.id;
};

const remove = async (id) => {
  if (confirm("Eliminar esta equipa?")) {
    await api.delete(`equipas/${id}/`);
    showToast("Equipa eliminada", "danger");
    loadEquipas();
  }
};

onMounted(loadEquipas);
</script>


<template>
  <div class="container mt-4">

    <!-- TOAST -->
    <div class="toast-container" v-if="toastMessage">
      <Toast :message="toastMessage" :type="toastType" />
    </div>

    <h3 class="mb-3">Gestão de Equipas</h3>

    <!-- FORM -->
    
      <h5 class="mb-3">
        {{ editingId ? "Editar Membro" : "Novo Membro da Equipa" }}
      </h5>

      <form class="row g-3" @submit.prevent="save">
        <div class="col-md-6">
          <input class="form-control" v-model="form.nome" placeholder="Nome" required />
        </div>

        <div class="col-md-6">
          <input class="form-control" v-model="form.funcao" placeholder="Função" />
        </div>

        <div class="col-md-6">
          <input class="form-control" v-model="form.especialidade" placeholder="Especialidade" />
        </div>

        <div class="col-md-6">
          <input class="form-control" v-model="form.contacto" placeholder="Contacto" />
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

    <!-- LISTA -->
    <div class="card">
      <h5 class="mb-3">Lista de Equipas</h5>

      <div class="table-responsive">
        <table class="table table-hover table-bordered align-middle">
          <thead class="table-light">
            <tr>
              <th>Nome</th>
              <th>Função</th>
              <th>Especialidade</th>
              <th>Contacto</th>
              <th style="width:150px">Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="e in equipas" :key="e.id">
              <td>{{ e.nome }}</td>
              <td>{{ e.funcao }}</td>
              <td>{{ e.especialidade }}</td>
              <td>{{ e.contacto }}</td>
              <td class="text-center">
                <button class="btn btn-sm btn-warning me-1" @click="edit(e)">Editar</button>
                <button class="btn btn-sm btn-danger" @click="remove(e.id)">Eliminar</button>
              </td>
            </tr>

            <tr v-if="!equipas.length">
              <td colspan="5" class="text-center text-muted">
                Nenhuma equipa registada
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  
</template>
