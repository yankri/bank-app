<template>
  <img
    alt="Piggy Bank logo"
    class="logo"
    src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Piggy_Bank_or_Savings_Flat_Icon_Vector.svg"
    :width="width"
    :height="height"
  />
</template>

<script>
export default {
  name: "Logo",
  props: {
    height: {
      type: Number,
      default: 80,
    },
    width: {
      type: Number,
      default: 100,
    },
  },
};
</script>
