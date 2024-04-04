<script setup>
import { BaseButton, BaseInput, ErrorMessage } from "@/components";
import { required } from "@vuelidate/validators";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";

import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
const formData = reactive({
  email: "",
  password: "",
  rememberMe: false,
});
const errorMessage = ref(null);

const rules = computed(() => {
  return {
    firstname: { required },
    lastname: { required },
    email: { required },
    password: { required },
    rememberMe: { required },
  };
});

const v$ = useVuelidate(rules, formData);

const store = useStore();
const router = useRouter();
const route = useRoute();

const Login = async () => {
  try {
    await store.dispatch("auth/login", {
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe,
    });

    const redirectUrl = "/" + (route.query.redirect || "dashboard");
    router.replace(redirectUrl);
  } catch (error) {
    errorMessage.value = error.message || "Failed to authenticate, try later.";
  }
};
</script>

<template>
  <div class="flex h-screen">
    <!-- right panel of the login page -->
    <section class="w-6/12 mt-20 px-20">
      <header class="mb-10">
        <div class="flex items-center justify-center">
          <span><box-icon class="fill-indigo-500 w-10 h-10" name='shopping-bag'></box-icon></span>
          <h2 class="text-3xl text-center uppercase font-bold mb-2 ml-2">
            Shopify
          </h2>
        </div>
        <p class="text-2xl text-center">
          SHOPIFY dashboard uses line charts to visualize customer-related
          metrics and trends over time
        </p>
      </header>
      <div>
        <img src="../assets/img/bg-imag.svg" alt="" />
      </div>
    </section>

    <!-- left panel of the login page -->
    <section class="flex items-center w-6/12 bg-gray-100 h-screen">
      <form @submit.prevent="Login" class="w-[500px] mx-auto mt-20">
        <header class="mb-6">
          <h2 class="capitalize text-2xl text-center mb-2">Login</h2>
          <p class="text-center">
            Login to your
            <span class="uppercase text-indigo-500">shopify</span> account today
            and start shopping
          </p>
        </header>
        <div>
          <div class="mb-4">
            <BaseInput label="email" type="email" v-model.trim="formData.email" placeholder="e.g. example@gmail.com" />
            <ErrorMessage :errors="v$.email.$errors" />
          </div>
          <div class="mb-4">
            <BaseInput label="password" type="password" v-model.trim="formData.password"
              placeholder="e.g. Create Password" />
            <ErrorMessage :errors="v$.password.$errors" />
          </div>
          <div class="mb-4">
            <div class="flex items-center">
              <input type="checkbox" name="terms" id="terms" v-model="formData.rememberMe"
                class="rounded text-indigo-500" />
              <label for="terms" class="ml-2 text-sm">
                remember my preference
              </label>
            </div>
            <p class="text-red-400">{{ errorMessage }}</p>
          </div>
          <div class="mb-4 mt-8">
            <BaseButton type="submit" mode="fullwidth">Login</BaseButton>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
