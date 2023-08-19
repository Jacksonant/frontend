<script setup>
import TodoControls from "@/components/TodoControls.vue";
import { useTodosStore } from "@/stores/todo.js";
import { TrashIcon } from "@heroicons/vue/24/solid";
import { ref, computed } from "vue";

const todo = useTodosStore();
let selectedTab = ref("");

const todoItems = computed(() => {
  switch (selectedTab.value) {
    case "all":
      return todo.items;
    case "completed":
      return todo.completed;
    case "uncompleted":
      return todo.uncompleted;
  }
});

// import { mapState } from "pinia";
// import { computed } from "vue";

// const items = computed(() => mapState(useTodosStore, ["items"]));
</script>

<template>
  <div class="flex justify-center items-center h-1/2 my-8">
    <div class="bg-white rounded-xl p-16 flex flex-col gap-4">
      <h1 class="text-center mb-8 text-2xl font-[800]">LJH Todo List</h1>
      <TodoControls
        @selectTab="(val) => (selectedTab = val)"
        @todoItem="(val) => todo.addItems(val)"
      />
      <div
        class="transform transition duration-600 hover:scale-105 flex gap-2 items-center border rounded-md w-full p-4"
        v-for="(item, key) in todoItems"
        :key="key"
      >
        <input type="checkbox" v-model="item.completed" />
        <span
          :class="`w-[80%] ${item.completed ? 'line-through  opacity-70' : ''}`"
          >{{ item.name }}</span
        >
        <TrashIcon
          @click="todo.removeItem(item.id)"
          class="h-6 w-6 text-blue-500 cursor-pointer hover:opacity-80"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
