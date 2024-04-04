<script setup>
const props = defineProps(["errors"]);
</script>

<template>
  <div>
    <p
      v-for="error in props.errors"
      :key="error.$uid"
      class="mt-2 text-sm text-red-600 dark:text-red-500"
    >
      {{ error.$message }}
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
