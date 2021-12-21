<template>
    <div class="ProfileDropdown">
        <button class="ProfileDropdown__avatar" @click="profileClicked">
            <h2 v-if="isAuth">{{ store.getters.user2char }}</h2>
            <svg
                v-if="!isAuth"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="28px"
                height="28px"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
            </svg>
        </button>
        <transition name="dropDown">
            <div class="ProfileDropdown__menu" v-if="profileToggled">
                <button
                    class="ProfileDropdown__avatar"
                    disabled
                    :style="{ cursor: 'default' }"
                >
                    <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="28px"
                        height="28px"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                    </svg>
                </button>
                <p class="ProfileDropdown__name">
                    {{ store.getters.fullname }}
                </p>
                <p class="ProfileDropdown__email">
                    {{ store.getters.email }}
                </p>
                <hr />
                <router-link
                    class="ProfileDropdown__item"
                    active-class="active"
                    exact
                    to="/myitem"
                >
                    <span>My Item</span>
                </router-link>
                <hr />
                <span class="ProfileDropdown__logout" @click="handleLogout">
                    Logout
                </span>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const isAuth = ref(store.getters.isAuth);
const profileToggled = ref(false);

function profileClicked() {
    isAuth.value
        ? (profileToggled.value = !profileToggled.value)
        : router.push("/login");
}

function handleLogout() {
    store.dispatch("logOut");
}
</script>

<style lang="scss" scoped>
.ProfileDropdown {
    position: relative;
    margin-left: 32px;
    &__avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        background-color: var(--green);
        color: white;
        border: none;
        h2 {
            font: 21px;
            font-weight: 500;
        }
    }

    &__menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: fixed;
        top: 98px;
        width: 220px;
        border: 1px solid var(--blueHover);
        transform: translateX(-169px);
        box-shadow: 0px 2px 6px lightgray;
        border-radius: 8px;
        overflow: hidden;
        padding: 12px 4px 4px 4px;
        background: white;
    }

    &__name {
        font-size: 17px;
        font-weight: 500;
        margin: 12px 0 2px 0;
    }
    &__email {
        font-size: 16px;
        margin-bottom: 12px;
    }

    &__item {
        text-decoration: none;
        width: 200px;
        padding: 8px 0;
        border-radius: 24px;
        font-weight: 500;
        transition: all 0.2s ease-in-out;
    }
    &__item:hover {
        background-color: var(--greyHover);
    }

    hr {
        width: 236px;
        border-top: 1px solid rgba(0, 0, 0, 0.05);
        margin: 8px 0;
    }

    &__logout {
        cursor: pointer;
        color: red;
        width: 200px;
        padding: 8px 0;
        border-radius: 24px;
        font-weight: 500;
        margin-bottom: 8px;
        transition: all 0.2s ease-in-out;
    }

    &__logout:hover {
        background-color: var(--greyHover);
    }
}

.dropDown-enter-active {
    animation: dropDown 0.2s ease-in-out;
}
.dropDown-leave-active {
    animation: pullUp 0.2s ease-in-out;
}

@keyframes dropDown {
    0% {
        opacity: 0.3;
        transform: translate(-169px, -4px);
    }

    100% {
        opacity: 1;
        transform: translate(-169px, 0);
    }
}

@keyframes pullUp {
    0% {
        opacity: 1;
        transform: translate(-169px, 0);
    }

    100% {
        opacity: 0.3;
        transform: translate(-169px, -4px);
    }
}
</style>
