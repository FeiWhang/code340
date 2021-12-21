import { auth, db } from "@/main";
import {
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import router from "@/router";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const authenticationModule = {
    state: {
        userProfile: {
            firstName: "",
            lastName: "",
            email: "",
        },
        loginError: "",
        registerError: "",
    },
    getters: {
        userID: () => auth.currentUser.uid,
        userProfile: (state) => state.userProfile,
        fullname: (state) =>
            state.userProfile.firstName + " " + state.userProfile.lastName,
        user2char: (state) =>
            (
                state.userProfile.firstName.charAt(0) +
                state.userProfile.lastName.charAt(0)
            ).toUpperCase(),
        email: (state) => state.userProfile.email,
        isAuth: () => (auth.currentUser ? true : false),
        loginError: (state) => state.loginError,
        registerError: (state) => state.registerError,
    },
    actions: {
        logIn({ commit, dispatch }, loginData) {
            signInWithEmailAndPassword(
                auth,
                loginData.email,
                loginData.password
            )
                .then((response) => {
                    dispatch("fetchProfile", response.user.uid).then(() => {
                        router.push("/");
                    });
                })
                .catch((e) => {
                    commit("setLoginError", e.code);
                });
        },
        fetchProfile({ commit }, uid) {
            const userRef = doc(db, "users", uid);
            getDoc(userRef)
                .then((snap) => {
                    commit("setUser", snap.data());
                })
                .catch((e) => {
                    alert("Failed to fetch user profile");
                    console.log(e);
                });
        },
        logOut({ commit }) {
            signOut(auth)
                .then(() => {
                    commit("setUser", {
                        firstName: "",
                        lastName: "",
                        email: "",
                    });
                    router.push("/login");
                })
                .catch((e) => {
                    console.log(e.code);
                });
        },
        register({ commit, dispatch }, regData) {
            createUserWithEmailAndPassword(
                auth,
                regData.email,
                regData.password
            )
                .then(() => {
                    dispatch("storeUser", {
                        firstName: regData.firstName,
                        lastName: regData.lastName,
                        email: regData.email,
                    });
                })
                .catch((e) => {
                    commit("setRegisterError", e.code);
                });
        },
        storeUser({ commit }, userData) {
            setDoc(doc(db, "users", auth.currentUser.uid), userData)
                .then(() => {
                    commit("setUser", userData);
                    router.push("/");
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
    mutations: {
        setUser(state, userData) {
            state.userProfile.firstName = userData.firstName;
            state.userProfile.lastName = userData.lastName;
            state.userProfile.email = userData.email;
        },
        setLoginError(state, errorCode) {
            state.loginError = errorCode;
        },
        setRegisterError(state, errorCode) {
            state.registerError = errorCode;
        },
    },
};
