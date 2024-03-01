import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { createStore } from "vuex";

const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
  },
  actions: {
    async registerUser(context, { email, password, username }) {
      const auth = getAuth();
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (response) {
        context.commit("SET_USER", response.user);
        response.user.updateProfile({ displayName: username });
      } else {
        throw new Error("failed to register user");
      }
    },
  },
});

export default store;
