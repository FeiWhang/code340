import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { authenticationModule } from "./modules/authentication";

const store = createStore({
    modules: { authentication: authenticationModule },
    plugins: [createPersistedState({ paths: ["authentication.userProfile"] })],
});

export default store;
