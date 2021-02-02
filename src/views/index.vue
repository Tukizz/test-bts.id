<template>
  <main>
    <div class="container">
      <div v-if="status" class="row justify-content-center">
        <div
          class="alert alert-primary alert-dismissible fade show"
          role="alert"
        >
          Anda telah Logout
          <button
            @click="status = false"
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
      <div v-if="login" class="row justify-content-center">
        <div
          class="alert alert-primary alert-dismissible fade show"
          role="alert"
        >
          Anda telah Login
          <button
            @click="login = false"
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>

    <div class="flex-center position-ref full-height">
      <div class="content">
        <div class="title m-b-md">
          Test BTS.id
        </div>

        <div class="links">
          <router-link :to="{ name: 'home' }">Home</router-link>
          <router-link
            v-if="!this.$store.getters.isLogin"
            :to="{ name: 'login' }"
            >login</router-link
          >

          <router-link
            v-if="this.$store.getters.isLogin"
            :to="{ name: 'adminHome' }"
            >admin</router-link
          >

          <button
            v-if="this.$store.getters.isLogin"
            class="btn"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      status: false,
      login: false
    };
  },
  created() {
    this.login = this.$route.query.login;
    this.status = this.$route.query.status;
    this.$router.replace({ login: null });
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => (this.status = true))
        .catch(() => {
          this.error = true;
        });
    }
  }
};
</script>
<style scoped>
.full-height {
  height: 100vh;
}
.flex-center {
  align-items: center;
  display: flex;
  justify-content: center;
}
.position-ref {
  position: relative;
}
.top-right {
  position: absolute;
  right: 10px;
  top: 18px;
}
.content {
  text-align: center;
}
.title {
  font-size: 84px;
}
.links > a {
  color: #636b6f;
  padding: 0 25px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1rem;
  text-decoration: none;
  text-transform: uppercase;
}
.m-b-md {
  margin-bottom: 30px;
}
</style>
