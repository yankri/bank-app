<template>
  <header class="header">
    <Logo />
    <div class="welcome">
      <div class="welcome-message">Welcome, {{ name }}</div>
      <img alt="avatar" class="avatar" :src="avatar" width="100" height="80" />
    </div>
  </header>
</template>

<script>
import Logo from "../components/Logo.vue";

export default {
  name: "Header",
  props: ["name", "avatar"],
  components: {
    Logo,
  },
};
</script>

<style scoped>
.header {
  display: flex;
  background-color: whitesmoke;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid lightgrey;
  border-radius: 5px;
}

.welcome {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 24px;
}

.welcome-message {
  font-weight: 500;
}

.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
