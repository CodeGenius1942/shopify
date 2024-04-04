<script setup>
const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: null,
  },
  link: {
    type: Boolean,
    required: false,
    default: false,
  },
  to: {
    type: String,
    required: false,
    default: "/",
  },
});
</script>

<template>
  <button v-if="!link" :class="[
    'border-none inline-block no-underline py-2 px-5 text-white text-lg rounded-md bg-indigo-600 hover:bg-indigo-500',
    mode === 'fullwidth'
      ? 'w-full'
      : '',
  ]">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="[
    'border-none inline-block no-underline text-gray-900 hover:text-indigo-500 active:text-indigo-500',
    mode === 'btn' ? 'border-none inline-block no-underline py-2 px-1 text-white text-lg rounded-md bg-indigo-600 hover:bg-indigo-500' : '',
    mode === 'fullwidth' ? 'w-full' : '',
  ]">
    <slot></slot>
  </router-link>
</template>

<style scoped></style>
