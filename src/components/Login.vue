<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow" style="width: 350px">
      <h4 class="text-center mb-3">Login</h4>

      <input v-model="username" class="form-control mb-2" placeholder="Username" />
      <input v-model="password" type="password" class="form-control mb-3" placeholder="Password" />

      <button class="btn btn-primary w-100" @click="login">
        Entrar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login() {
      // login fictício
      if (this.username && this.password) {
        localStorage.setItem("logged", "true")
        this.$emit("login-success")
      } else {
        alert("Preencha os campos")
      }
    }
  }
}
</script>
