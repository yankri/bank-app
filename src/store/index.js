import { createStore } from "vuex";

import data from "../assets/transactions";

export default createStore({
  state() {
    return {
      balance: 0,
      transactions: [],
      user: {},
    };
  },
  mutations: {
    saveUser(state, user) {
      state.user = user;
    },
    saveTransactions(state, transactions) {
      state.balance = transactions.balance;
      state.transactions = transactions.transactions;
    },
  },
  actions: {
    getUser({ commit }) {
      commit("saveUser", { name: data.name, avatar: data.avatar });
    },
    getTransactions({ commit }) {
      const sortedTransactions = data.transactions.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      const returnVal = {
        transactions: sortedTransactions,
        balance: data.balance,
      };
      commit("saveTransactions", returnVal);
    },
  },
});
