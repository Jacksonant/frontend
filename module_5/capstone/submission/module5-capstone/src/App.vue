<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { colours } from "@/helpers/color.js";

const pokemons = ref([]);

const fetchData = async () => {
  try {
    let { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/");

    data.results.map(async (obj: any) => {
      try {
        let { data } = await axios.get(obj.url);
        pokemons.value.push(data);
        console.log(pokemons);
      } catch (e) {
        console.error(e);
        alert(e);
        pokemons.value = [];
      }
    });
  } catch (e) {
    console.error(e);
    alert(e);
  }
};

const getColorFromType = (type: any) => {
  return colours[type];
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="container mx-auto px-4">
    <p class="text-7xl font-bold text-center my-8">My Pokemons</p>
    <div class="grid grid-cols-3 gap-4">
      <div class="card" v-for="(pokemon, key) in pokemons" :key="key">
        <img
          class="display-image"
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
          alt=""
          :style="`border: 6px solid ${getColorFromType(
            pokemon.types[0].type.name
          )}`"
        />

        <p class="text-2xl font-bold text-center my-8 capitalize">
          {{ pokemon?.name }}
        </p>

        <p class="text-md font-bold text-left">
          ID:
          <span class="font-normal"> #{{ pokemon?.id }} </span>
        </p>

        <p class="text-md font-bold text-left">
          Height:
          <span class="font-normal">
            {{ pokemon?.height }}
          </span>
        </p>

        <p class="text-md font-bold text-left">
          Weight:
          <span class="font-normal">
            {{ pokemon?.weight }}
          </span>
        </p>

        <p class="text-md font-bold text-left">Abilities:</p>

        <span
          :style="`background-color: ${getColorFromType(
            pokemon.types[0].type.name
          )}`"
          v-for="(ability, key) in pokemon.abilities"
          :key="key"
          class="mx-3 inline-block ability mt-2 font-semibold"
        >
          {{ ability?.ability?.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
img.display-image {
  width: 180px;
  /* background-color: grey; */
  border-radius: 50%;
  display: block;
  padding: 20px;
  margin: 0 auto;
}

div.card {
  border-radius: 20px;
  background-color: #fff;
  height: 480px;
  box-shadow: 1px 2px 15px 4px #dadada;
  padding: 20px;
}

body {
  background-color: #eee;
}
.ability {
  /* background-color: red; */
  border-radius: 30px;
  padding: 5px 8px;
}
</style>
