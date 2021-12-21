<template>
    <div class="LoginBody">
        <div class="LoginCard">
            <h1>Sign in</h1>
            <label for="Email">Email</label>
            <input v-model.trim="email" type="text" id="Email" />
            <label for="Password">Password</label>
            <input
                v-model.trim="password"
                type="password"
                id="Password"
                v-on:keyup.enter="handleLogin"
            />
            <button class="LoginCard__loginButton" @click="handleLogin">
                Continue
            </button>
            <p class="LoginCard__error" :key="store.getters.loginError">
                {{ store.getters.loginError }}
            </p>
            <div class="LoginCard__footer">
                <p>Don't have an account?</p>
                <router-link to="/register" class="LoginCard__link"
                    >Sign up</router-link
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const email = ref("");
const password = ref("");
const store = useStore();

function handleLogin() {
    store.dispatch("logIn", { email: email.value, password: password.value });
}
</script>

<style lang="scss" scoped>
.LoginBody {
    display: flex;
    justify-content: center;
    width: var(--layoutWidth);
    margin: 0 auto;
    margin-top: 14rem;
}
.LoginCard {
    display: flex;
    flex-direction: column;
    padding: 32px 48px;
    border-radius: 32px;
    box-shadow: 6px 6px 14px #ccc9d4, -8px -8px 12px #f6f6ff;
    h1 {
        margin-bottom: 3rem;
        font-size: 24px;
    }
    label {
        text-align: left;
        text-align: left;
        margin-left: 4px;
        font-weight: 500;
        font-size: 15px;
    }
    input {
        padding: 10px 16px;
        width: 250px;
        font-size: 16px;
        border-radius: 8px;
        border: none;
        box-shadow: 0 0 2px #aaaab4;
        outline: none;
        transition: all 0.2s ease-in-out;
        margin: 8px 0 24px 0;
    }
    input::placeholder {
        color: rgba(0, 0, 0, 0.18);
        font-size: 15px;
    }
    input:focus {
        box-shadow: 0 0 4px var(--lightPurple);
    }
    &__email,
    &__password {
        position: relative;
        &__icon {
            position: absolute;
            top: 7px;
            left: 8px;
            height: 19px;
            width: auto;
        }
    }
    &__loginButton {
        cursor: pointer;
        font-size: 16px;
        background-color: var(--lightPurple);
        border: none;
        padding: 12px 16px;
        font-weight: 500;
        border-radius: 8px;
        margin-top: 32px;
        width: 284px;
        color: white;
        outline: none;
        margin-bottom: 4rem;
        transition: opacity 0.2s ease;
    }
    &__loginButton:hover {
        opacity: 0.75;
    }
    &__error {
        color: var(--redError);
        margin-bottom: 3rem;
        max-width: 275px;
        transition: all 0.3 ease-in-out;
        animation: 0.3s shake alternate;
    }
    &__footer {
        display: flex;
        align-items: center;
        justify-content: center;
        p {
            font-size: 15px;
            margin-right: 8px;
        }
    }
    &__link {
        font-size: 15px;
        text-decoration: none;
        color: var(--lightPurple);
    }
}
</style>
