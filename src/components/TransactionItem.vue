<template>
  <div class="transaction-item">
    <div class="transaction-amount">
      <div
        class="transaction-item__type"
        :class="`transaction-item__type--${transaction.type}`"
      >
        {{ transaction.type }}
      </div>
      <div class="transaction-item__amount">
        {{ this.transaction.amount }}
      </div>
    </div>
    <div class="transaction-details">
      <div class="transaction-item__merchant">{{ transaction.merchant }}</div>
      <div class="transaction-item__details" v-if="transaction.details">
        {{ transaction.details }}
      </div>
    </div>
    <div class="transaction-item__balance">
      {{ transaction.runningBalance.toFixed(2) }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionItem",
  props: ["transaction"],
};
</script>

<style scoped>
.transaction-item {
  background-color: whitesmoke;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  margin: 0 12px;
  padding: 12px;
}
.transaction-details {
  width: 200px;
}
.transaction-amount {
  width: 100px;
}
.transaction-item__balance {
  width: 100px;
}
.transaction-item__type {
  text-transform: uppercase;
  font-size: 12px;
}

.transaction-item__type--debit {
  color: red;
}
.transaction-item__type--credit {
  color: green;
}
.transaction-item__merchant {
  font-weight: 500;
  font-size: 16px;
}
.transaction-item__balance {
  align-self: center;
  text-align: right;
}
</style>
