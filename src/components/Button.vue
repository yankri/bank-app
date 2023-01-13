<template>
  <button class="p-button" @click="click">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
.p-button {
  box-shadow: none;
  border: none;
  padding: 8px 12px;
  color: white;
  background-color: #23346b;
  font-family: "Fira Sans", sans-serif;
  border-radius: 5px;
}

.p-button:hover {
  cursor: pointer;
}
</style>
