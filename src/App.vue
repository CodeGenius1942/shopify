<script setup>
import { computed, onBeforeMount, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const didAutoLogout = computed(() => {
  return store.getters['auth/didAutoLogout'];
});

watch(didAutoLogout, (curValue, oldValue) => {
  if (curValue && curValue !== oldValue) {
    router.replace("/dashboard");
  }
});

onBeforeMount(() => {
  store.dispatch("auth/tryLogin");
});
</script>

<template>
  <RouterView />
</template>
