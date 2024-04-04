<script setup>
import { useVuelidate } from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { BaseButton, BaseInput, ErrorMessage } from "../components/index";

const formData = reactive({
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  termsAndConditions: false,
});

const errorMessage = ref(null);

const rules = computed(() => {
  return {
    firstname: { required, minLength: minLength(3) },
    lastname: { required, minLength: minLength(3) },
    email: { required, email },
    password: { required },
    termsAndConditions: { required },
  };
});

const v$ = useVuelidate(rules, formData);

const store = useStore();
const router = useRouter();
const route = useRoute();

const Register = async () => {
  try {
    const isFormDataCorrect = await v$.value.$validate();
    console.log(isFormDataCorrect, formData.termsAndConditions);
    if (!isFormDataCorrect && formData.termsAndConditions === false) return;

    await store.dispatch("auth/signup", {
      username: `${formData.firstname} ${formData.lastname}`,
      email: formData.email,
      password: formData.password,
      termsAndConditions: formData.termsAndConditions,
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
    <!-- left panel of the login page -->
    <section class="flex items-center w-6/12 bg-gray-100 h-screen">
      <form novalidate @submit.prevent="Register" class="w-[500px] mx-auto mt-20">
        <header class="mb-6">
          <h2 class="capitalize text-2xl text-center mb-2">Sign up</h2>
          <p class="text-center">
            Create your
            <span class="uppercase text-indigo-500">shopify</span> account today
            and start shopping
          </p>
        </header>

        <div>
          <div class="flex items-center justify-between space-x-5 mb-4">
            <div class="w-6/12">
              <BaseInput label="firstname" v-model.trim="formData.firstname" placeholder="e.g: Doe" />
              <ErrorMessage :errors="v$.firstname.$errors" />
            </div>
            <div class="w-6/12">
              <BaseInput label="lastname" v-model.trim="formData.lastname" placeholder="e.g: Doe" />
              <ErrorMessage :errors="v$.lastname.$errors" />
            </div>
          </div>
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
              <BaseInput id="termsAndConditions" type="checkbox" v-model="formData.termsAndConditions"
                placeholder="e.g. example@gmail.com" restoreWidth />
              <label label="termsAndConditions" verticalLabel>
                I agree to the
                <router-link to="#" class="text-indigo-500">
                  Terms
                </router-link>
                and
                <router-link to="#" class="text-indigo-500">
                  Privacy Policy.
                </router-link>
              </label>
              <ErrorMessage :errors="v$.termsAndConditions.$errors" />
            </div>
          </div>
          <div class="mb-4 mt-8">
            <!-- <button >
              sign up
            </button> -->
            <BaseButton type="submit" mode="formBtn">Sign Up</BaseButton>
          </div>
        </div>
      </form>
    </section>

    <!-- right panel of the login page -->
    <section class="w-6/12 mt-20 px-20">
      <header class="mb-10">
        <div class="flex items-center justify-center">
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
  </div>
</template>

<style lang="scss" scoped></style>
