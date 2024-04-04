<script setup>
const props = defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: [String, Boolean],
    default: "",
  },
  restoreWidth: {
    type: Boolean,
    required: false,
    default: false,
  },
  invalid: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <label v-if="props.label" :for="props.label" class="capitalize">
    {{ props.label }}
  </label>
  <input
    type="text"
    :id="props.label"
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
    :class="[
      'mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500',
      invalid ? 'border-red-500' : 'border-gray-300',
      !restoreWidth ? 'w-full' : '',
    ]"
    :="$attrs"
  />
</template>
