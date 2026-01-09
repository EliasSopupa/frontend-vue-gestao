<script setup>
defineProps({
  message: String,
  type: {
    type: String,
    default: "success", // success | danger | warning
  },
});
</script>

<template>
  <div class="toast-alert alert" :class="`alert-${type}`">
    {{ message }}
  </div>
</template>
