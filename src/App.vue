<template>
  <Navbar />

  <div class="container mt-4">
    <router-view />
  </div>

  <!-- Toast Global -->
  <ToastGlobal ref="toastRef" />
</template>

<script setup>
import { ref, provide } from 'vue'
import Navbar from './components/Navbar.vue'
import ToastGlobal from './components/Toast.vue'

const toastRef = ref(null)

/* função global */
const notify = (message, type = 'success') => {
  toastRef.value.show(message, type)
}

/* disponibiliza para TODA a app */
provide('notify', notify)
</script>
