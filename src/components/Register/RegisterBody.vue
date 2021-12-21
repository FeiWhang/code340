<template>
    <div class="RegisterBody">
        <div class="RegisterCard">
            <h1>Get Started</h1>
            <div class="RegisterForm">
                <label for="FullName">Full name</label>
                <input
                    v-model.trim="form.fullName.value"
                    type="text"
                    id="FullName"
                />
                <label for="Email">Email</label>
                <input v-model.trim="form.email.value" type="text" id="Email" />
                <label for="Password">Password</label>
                <input
                    v-model.trim="form.password.value"
                    type="password"
                    id="Password"
                />
                <label for="ConfirmPassword">Confirm password</label>
                <input
                    v-model.trim="form.confirmPassword.value"
                    type="password"
                    id="ConfirmPassword"
                />
            </div>

            <button
                class="RegisterCard__registerButton"
                @click="handleRegister"
            >
                Create account
            </button>

            <p class="RegisterCard__error" :key="store.getters.registerError">
                {{ store.getters.registerError }}
            </p>
            <div class="RegisterCard__footer">
                <p>Have an account?</p>
                <router-link to="/login" class="RegisterCard__link"
                    >Login</router-link
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();

const form = reactive({
    fullName: { value: "", tag: "Full name" },
    email: { value: "", tag: "Email" },
    password: { value: "", tag: "Password" },
    confirmPassword: { value: "", tag: "Confirm password" },
});

function validate() {
    for (const [, v] of Object.entries(form)) {
        if (v.value == "") {
            store.commit("setRegisterError", v.tag + " cannot be blank");
            return false;
        }
    }

    if (form.confirmPassword.value != form.password.value) {
        store.commit("setRegisterError", "Confirm password does not match");
        return false;
    }
    return true;
}

function handleRegister() {
    if (validate()) {
        const [firstName, lastName] = form.fullName.value.split(" ");
        store.dispatch("register", {
            firstName: firstName,
            lastName: lastName,
            email: form.email.value,
            password: form.password.value,
        });
    }
}
</script>

<style lang="scss" scoped>
.RegisterBody {
    display: flex;
    justify-content: center;
    width: var(--layoutWidth);
    margin: 0 auto;
    margin-top: 14rem;
}
.RegisterCard {
    padding: 32px 48px;
    border-radius: 16px;
    box-shadow: 6px 6px 14px #ccc9d4, -8px -8px 12px #f6f6ff;
    h1 {
        margin-bottom: 3rem;
        font-size: 24px;
    }
    &__registerButton {
        cursor: pointer;
        font-size: 16px;
        background-color: var(--lightPurple);
        border: none;
        padding: 12px 16px;
        width: 300px;
        font-weight: 500;
        border-radius: 8px;
        color: white;
        outline: none;
        margin-top: 2.5rem;
        margin-bottom: 4rem;
        transition: opacity 0.3s ease;
    }
    &__registerButton:hover {
        opacity: 0.75;
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
    &__error {
        color: var(--redError);
        margin-bottom: 2rem;
        transition: all 0.3 ease-in-out;
        animation: 0.3s shake alternate;
    }
}

.RegisterForm {
    display: flex;
    flex-direction: column;
    label {
        text-align: left;
        margin-left: 4px;
        font-weight: 500;
        font-size: 15px;
    }
    input {
        padding: 10px 16px;
        margin: 8px 0 32px 0;
        width: 278px;
        font-size: 16px;
        border-radius: 8px;
        box-shadow: 0 0 2px #aaaab4;
        border: none;
        outline: none;
        transition: all 0.2s ease-in-out;
    }
    input:focus {
        box-shadow: 0 0 4px var(--lightPurple);
    }
    &__name {
        display: flex;
        input {
            margin: 0.5rem;
            width: 227px;
        }
    }
}
</style>
