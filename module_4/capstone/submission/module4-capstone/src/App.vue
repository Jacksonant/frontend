<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";

onMounted(() => {
  fetchData();
});

const rates = ref({});
const convertedValue = ref(0);
const left = ref({
  value: 0,
  option: "USD",
});
const right = ref({
  value: 0,
  option: "MYR",
});

const fetchData = async () => {
  await axios
    .get("https://api.exchangerate.host/latest?base=USD")
    .then((res) => (rates.value = res.data.rates));

  console.log(rates.value, "ref");
};

const changeCurrency = async () => {
  await axios
    .get(`https://api.exchangerate.host/latest?base=${left.value.option}`)
    .then((res) => (rates.value = res.data.rates));

  console.log(rates.value, "ref");
};

const convertValue = () => {
  const leftCurrency = left.value.option;
  const rightCurrency = right.value.option;

  const leftToBaseRate = rates.value[leftCurrency];
  const rightToBaseRate = rates.value[rightCurrency];

  if (leftToBaseRate && rightToBaseRate) {
    convertedValue.value =
      (left.value.value / leftToBaseRate) * rightToBaseRate;
  }
};
</script>

<template>
  <div class="container">
    <div class="control">
      <select name="" id="" v-model="left.option" @change="changeCurrency">
        <option :value="key" v-for="(rate, key) in rates" :key="key">
          {{ key }}
        </option>
      </select>
      <input type="number" v-model="left.value" />
    </div>

    <div class="control">
      <select name="" id="" v-model="right.option">
        <option :value="key" v-for="(rate, key) in rates" :key="key">
          {{ key }}
        </option>
      </select>
      <input type="number" v-model="convertedValue" />
    </div>
    <button @click="convertValue">Convert currency</button>
  </div>
</template>

<style scoped>
  .container {
    height: 100vh;
    display: flex;
    align-items: center;
  }

  .controls {
    margin: 0 15px;
  }

  select {
    display: block;
  }
</style>
