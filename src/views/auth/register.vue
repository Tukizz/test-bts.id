<template>
  <main class="py-4">
    <div class="container">
      <div v-if="error.on" class="row justify-content-center">
        <div
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {{ error.message }}
          <button
            @click="error = false"
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              Register
            </div>

            <div class="card-body">
              <div class="mb-3">
                <label for="exampleInputE" class="form-label"
                  >Email</label
                >
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="exampleInputE"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputU" class="form-label"
                  >Username</label
                >
                <input
                  v-model="username"
                  type="text"
                  class="form-control"
                  id="exampleInputU"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputP" class="form-label"
                  >Password</label
                >
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="exampleInputP"
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                @click="register"
              >
                Daftar
              </button>
              <router-link
                class="btn btn-link"
                :to="{ name: 'login' }"
              >
                Sudah punya akun? Login</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      email: null,
      username: null,
      password: null,
      error: {
        on: false,
        message: null
      }
    };
  },
  methods: {
    register() {
      axios
        .post(process.env.VUE_APP_API + "/register", {
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(() => {
          const email = this.email;
          const username = this.username;
          const password = this.password;

          this.$store
            .dispatch("login", { email, username, password })
            .then(() => {
              location.reload();
            });
        })
        .catch(() => {
          this.error.on = true;
          this.error.message = "Username atau email telah di gunakan";
        });
    }
  }
};
</script>
