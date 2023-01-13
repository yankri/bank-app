<template>
  <section class="card">
    <div class="login">
      <Logo :width="200" :height="200" />
      <h1 class="login-title">Welcome to Piggy Bank</h1>
      <PButton @click="handleClickLogin" class="login-button">Login</PButton>
    </div>
  </section>
</template>

<script>
import PButton from "../components/Button.vue";
import Logo from "../components/Logo.vue";

export default {
  name: "Login",
  components: {
    Logo,
    PButton,
  },
  methods: {
    async handleClickLogin() {
      // pretend we're logging in by getting user from the static data and navigate to dashboard
      await this.$store.dispatch("getUser");
      this.$router.push("dashboard");
    },
  },
};
</script>

<style scoped>
.card {
  height: 400px;
  width: 400px;
  display: flex;
  place-content: center;
}

.login {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.login-title {
  color: black;
  text-align: center;
}

.p-button.login-button {
  width: 100%;
  padding: 16px 24px;
  font-weight: 500;
  font-size: 16px;
}

.logo {
  height: 200px;
  width: 200px;
}
</style>
