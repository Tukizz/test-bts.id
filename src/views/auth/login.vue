<template>
  <main class="py-4">
    <div class="container">
      <div v-if="error" class="row justify-content-center">
        <div
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Username atau Password Salah
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
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              Login
            </div>

            <div class="card-body">
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
                <label for="exampleInputPw" class="form-label"
                  >Password</label
                >
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="exampleInputPw"
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                @click="login"
              >
                Login
              </button>
              <router-link
                class="btn btn-link"
                :to="{ name: 'register' }"
              >
                Belum punya akun? Daftar</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
      error: false
    };
  },
  methods: {
    login() {
      const username = this.username;
      const password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .then(() => location.reload())
        .catch(() => {
          this.error = true;
        });
    }
  }
};
</script>
