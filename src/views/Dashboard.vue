<template>
  <div class="wrapper">
    <Header :name="name" :avatar="avatar" />

    <div class="account">
      <section class="transactions">
        <h1 class="transactions-title">Transactions</h1>
        <span v-for="transaction of transactions" :key="transaction.amount">
          <TransactionItem :transaction="transaction" />
        </span>
      </section>
      <section class="account-overview">
        <div class="stats">
          <div class="balance">
            <h1 class="balance-header">Current Balance</h1>
            <p class="balance-amount">{{ currentBalance }}</p>
          </div>
          <div class="account-trend">
            <h1 class="account-trend__title">Account Trend</h1>
            <canvas id="accountTrend" width="200" height="150"></canvas>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import TransactionItem from "../components/TransactionItem.vue";

export default {
  name: "Dashboard",
  components: {
    TransactionItem,
    Header,
  },
  data() {
    return {
      chartData: {},
    };
  },
  computed: {
    name() {
      return this.$store.state.user.name;
    },
    avatar() {
      return this.$store.state.user.avatar;
    },
    currentBalance() {
      // set up Intl money number formatter for US currency
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      const startingBalance = this.$store.state.balance;
      // get the current balance to display
      const balance = this.$store.state.transactions.reduce((acc, a) => {
        if (a.type === "debit") {
          return acc - a.amount;
        } else {
          return acc + a.amount;
        }
      }, startingBalance);

      return formatter.format(balance);
    },
    transactions() {
      let runningBalance = this.$store.state.balance;
      // reverse the sorted array so the balance is calculated in the right order
      const sortedData = JSON.parse(
        JSON.stringify(this.$store.state.transactions)
      ).reverse();

      // update the sortedData to include the new running balance
      sortedData.forEach((t) => {
        // if its a debit, subtract the amount an update the props, otherwise add for credit
        if (t.type === "debit") {
          const newBalance = runningBalance - t.amount;
          runningBalance = newBalance;
          t.runningBalance = newBalance;
        } else {
          const newBalance = runningBalance + t.amount;
          runningBalance = newBalance;
          t.runningBalance = newBalance;
        }
      });
      return sortedData.reverse();
    },
  },
  mounted() {
    // if we got here without the user, get them again
    if (!this.name || !this.avatar) {
      this.getUserDetails();
    }
    // get transaction/balance
    this.getAccountDetails();

    // build the data for the account chart
    this.buildChartData();

    // create the actual chart
    this.createChart();
  },
  methods: {
    async getAccountDetails() {
      await this.$store.dispatch("getTransactions");
    },
    async getUserDetails() {
      await this.$store.dispatch("getUser");
    },
    buildChartData() {
      const credits = [];
      const debits = [];
      const labels = [];
      const chart = [];
      // copy the transactions from the store for manipulation
      const sortedData = JSON.parse(
        JSON.stringify(this.$store.state.transactions)
      );

      // modify debits to be negative values and create credit/debit arrays
      sortedData.forEach((t) => {
        if (t.type === "debit") {
          const negativeValue = t.amount * -1;
          t.amount = negativeValue;
          debits.push(negativeValue);
          labels.push(negativeValue);
        } else {
          credits.push(t.amount);
          labels.push(t.amount);
        }
      });
      // sort credit/debit arrays and remove duplicates
      const sortedCredits = Array.from(new Set(credits.sort((a, b) => a - b)));
      const sortedDebits = Array.from(new Set(debits.sort((a, b) => b - a)));
      // bin the data to make a nicer chart
      sortedData.forEach((t) => {
        if (t.amount < 0) {
          chart.push(sortedDebits.indexOf(t.amount) - 1);
        } else {
          chart.push(sortedCredits.indexOf(t.amount) + 1);
        }
      });
      this.chartData = {
        data: chart,
        labels,
      };
    },
    createChart() {
      const ctx = document.getElementById("accountTrend");
      // render the chart
      const accountTrend = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.chartData.labels,
          datasets: [
            {
              data: this.chartData.data.reverse(),
              borderColor: "#23346B",
              borderWidth: 3,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false, // hide table legend
            },
            tooltip: {
              enabled: true, // disable tooltips
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              display: false, // hide y axis labels
            },
            x: {
              display: false, // hide X axis labels
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: calc(100vh - 48px);
  min-height: calc(100% - 48px);
  overflow-y: auto;
  width: calc(100% - 48px);
  min-width: 600px;
  background-color: #eee;
  border-radius: 5px;
}

.account {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: space-between;
  column-gap: 24px;
}

.transactions {
  display: flex;
  flex-direction: column;
  flex: 0 1 80%;
  margin: 24px 0 0 24px;
  padding: 12px 24px 24px;
  row-gap: 16px;
  background-color: whitesmoke;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}
.transactions-title {
  padding: 12px;
  width: 100%;
  text-align: left;
  border-bottom: 1px solid lightgray;
  margin-bottom: 12px;
}

.account-overview {
  display: flex;
  flex-direction: column;
  flex: 0 1 20%;
  flex-wrap: wrap;
  padding: 24px;
}

.stats {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  row-gap: 24px;
}
/* account balance card styles */
.balance {
  height: 150px;
  width: 250px;
  border-radius: 5px;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}
.balance-header {
  padding: 12px;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid lightgray;
}
.balance-amount {
  margin-top: 24px;
  font-size: 24px;
  font-weight: 500;
}
/* media queries to make the page small viewport friendly */
@media screen and (max-width: 1100px) {
  .account {
    flex-wrap: wrap-reverse;
    row-gap: 24px;
  }
  .stats {
    flex-direction: row;
    justify-content: center;
    column-gap: 24px;
  }
  .balance {
    height: 200px;
  }
  .transactions {
    width: 100%;
    justify-content: center;
  }
}
/* Graph styles */
.account-trend {
  height: 200px;
  width: 250px;
  border-radius: 5px;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}
.account-trend__title {
  padding: 12px;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid lightgray;
}
#accountTrend {
  margin-top: 24px;
  max-width: 200px;
  max-height: 100px;
}
</style>
