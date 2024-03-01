<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const firstname = ref("");
const lastname = ref("");
const email = ref("");
const password = ref("");
const termsAndConditions = ref(false);
const errorMessage = ref(null);

const store = useStore();
const router = useRoute();

const registerUser = async () => {
  try {
    if (termsAndConditions) {
      await store.dispatch("registerUser", {
        username: `${firstname.value} ${lastname.value}`,
        email: email.value,
        password: password.value,
      });
      router.push("/");
    } else {
      errorMessage.value =
        "please agree to our terms and condition, before proceeding";
    }
  } catch (err) {
    errorMessage.value = err.message;
  }
};
</script>

<template>
  <div class="flex h-screen">
    <!-- left panel of the login page -->
    <section class="flex items-center w-6/12 bg-gray-100 h-full">
      <form @submit.prevent="registerUser" class="w-[500px] mx-auto mt-20">
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
              <label for="firstname" class="block">Firstname</label>
              <input
                type="text"
                placeholder="e.g: Joe"
                id="firstname"
                v-model="firstname"
                class="w-full mt-1 border-gray-300 rounded-lg focus:border-indigo-500 forcus:ring-indigo-500"
              />
            </div>
            <div class="w-6/12">
              <label for="lastname" class="block">Lastname</label>
              <input
                type="text"
                placeholder="e.g: Doe"
                id="lastname"
                v-model="lastname"
                class="w-full mt-1 border-gray-300 rounded-lg focus:border-indigo-500"
              />
            </div>
          </div>
          <div class="mb-4">
            <label for="email" class="block">Email</label>
            <input
              type="text"
              placeholder="example@gmail.com"
              id="email"
              v-model="email"
              class="w-full mt-1 border-gray-300 rounded-lg focus:border-indigo-500"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block">Pasword</label>
            <input
              type="password"
              placeholder="Create Password"
              id="password"
              v-model="password"
              class="w-full mt-1 border-gray-300 rounded-lg focus:border-indigo-500"
            />
          </div>
          <div class="mb-4">
            <div class="flex items-center">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                v-model="termsAndConditions"
                class="rounded text-indigo-500"
              />
              <label for="terms" class="block ml-2 text-sm">
                I agree to the
                <router-link to="/terms" class="text-indigo-500"
                  >Terms</router-link
                >
                and
                <router-link to="/terms" class="text-indigo-500"
                  >Privacy Policy.</router-link
                >
              </label>
            </div>
            <p class="text-red-400">{{ errorMessage }}</p>
          </div>
          <div class="mb-4 mt-8">
            <button class="w-full bg-indigo-500 text-white p-2 capitalize">
              sign up
            </button>
          </div>
        </div>
      </form>
    </section>

    <!-- right panel of the login page -->
    <section class="w-6/12 mt-20 px-20">
      <header class="mb-10">
        <div class="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8 mb-4 text-indigo-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
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
