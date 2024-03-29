import { signal } from "@preact/signals";

// state
// initial with 8 shapes
export const count = signal(8);

// mutations
export const increment = () => {
  count.value++;
};
export const decrement = () => {
  count.value--;
};