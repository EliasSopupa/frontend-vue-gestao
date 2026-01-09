import Toast from "./Toast.vue";

<template>
  <div>
    <h3 class="mb-3">{{ title }}</h3>

    <form class="row g-2 mb-4" @submit.prevent="save">
      <div
        v-for="field in fields"
        :key="field"
        class="col-md-3"
      >
        <input
          class="form-control"
          v-model="form[field]"
          :placeholder="field"
          required
        />
      </div>

      <div class="col-md-2">
        <button class="btn btn-primary w-100">
          {{ editingId ? "Atualizar" : "Criar" }}
        </button>
      </div>
    </form>

    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th v-for="field in fields" :key="field">
            {{ field }}
          </th>
          <th style="width: 160px">Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td v-for="field in fields" :key="field">
            {{ item[field] }}
          </td>
          <td>
            <button
              class="btn btn-warning btn-sm me-1"
              @click="edit(item)"
            >
              Editar
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="remove(item.id)"
            >
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";

const props = defineProps({
  title: String,
  endpoint: String,
  fields: Array,
});

const items = ref([]);
const form = ref({});
const editingId = ref(null);

const load = async () => {
  const response = await api.get(props.endpoint);
  items.value = response.data;
};

const save = async () => {
  if (editingId.value) {
    await api.put(
      `${props.endpoint}${editingId.value}/`,
      form.value
    );
  } else {
    await api.post(props.endpoint, form.value);
  }

  form.value = {};
  editingId.value = null;
  load();
};

const edit = (item) => {
  form.value = { ...item };
  editingId.value = item.id;
};

const remove = async (id) => {
  if (confirm("Deseja realmente eliminar este registo?")) {
    await api.delete(`${props.endpoint}${id}/`);
    load();
  }
};

onMounted(load);
</script>
