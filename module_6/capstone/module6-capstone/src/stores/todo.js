import { defineStore } from "pinia";

export const useTodosStore = defineStore({
  id: "todo",
  state: () => ({
    items: [
      { id: 1, name: "Homework", completed: false },
      { id: 2, name: "Game", completed: false },
      { id: 3, name: "Cfrg", completed: true },
      { id: 4, name: "Efg", completed: false },
      { id: 5, name: "Byuf", completed: true },
      { id: 6, name: "fg", completed: true },
    ],
  }),
  getters: {
    completed() {
      return this.items.filter((item) => item.completed);
    },
    uncompleted() {
      return this.items.filter((item) => !item.completed);
    },
  },
  actions: {
    addItems(item) {
      let obj = { id: this.items.length + 1, name: item, completed: false };
      this.items.push(obj);
    },
    removeItem(id) {
      this.items = this.items.filter((item) => item.id !== id);
    },
  },
});
