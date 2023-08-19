<script setup>
import { ref, onMounted } from "vue";

const emit = defineEmits(["todoItem", "selectTab"]);
let inputText = ref("");
let currentTab = ref("all");

const selectTab = (tab) => {
  currentTab.value = tab;
  emit("selectTab", tab);
};

onMounted(() => {
  selectTab(currentTab.value);
});
</script>

<template>
  <div class="flex gap-2">
    <input
      autofocus
      class="border rounded-lg border-red-300 border-2 px-4 py-2 focus:outline-none"
      type="text"
      v-model="inputText"
    />
    <button
      class="bg-black rounded-xl text-white px-2 hover:opacity-80"
      @click="$emit('todoItem', inputText)"
    >
      Add item
    </button>
  </div>

  <div class="flex gap-2">
    <button
      @click="selectTab('all')"
      :class="`px-4 border-b-2 ${
        currentTab === 'all' ? 'border-orange-300' : null
      } hover:opacity-80`"
    >
      All
    </button>
    <button
      @click="selectTab('completed')"
      :class="`px-4 border-b-2 ${
        currentTab === 'completed' ? 'border-orange-300' : null
      } hover:opacity-80`"
    >
      Completed
    </button>
    <button
      @click="selectTab('uncompleted')"
      :class="`px-4 border-b-2 ${
        currentTab === 'uncompleted' ? 'border-orange-300' : null
      } hover:opacity-80`"
    >
      Uncompleted
    </button>
  </div>
</template>
