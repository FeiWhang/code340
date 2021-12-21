<template>
    <div class="PayModal">
        <div class="PayModalContent">
            <h2 class="PayModalContent__header">Successfully purchased!</h2>
            <h3 class="PayModalContent__sub">Product details</h3>
            <div class="PayModalContent__body">
                <img
                    :src="props.product.imgDataUrl"
                    alt=""
                    class="PayModalContent__img"
                />
                <ul class="PayModalContent__info">
                    <li class="PayModalContent__infoItem">
                        <span class="PayModalContent__title">
                            {{ props.product.title }}
                        </span>
                    </li>
                    <li class="PayModalContent__infoItem">
                        <label>Exp:</label>
                        <span>
                            {{
                                String(product.expDate.getDate()).padStart(
                                    2,
                                    "0"
                                ) +
                                "/" +
                                String(product.expDate.getMonth() + 1).padStart(
                                    2,
                                    "0"
                                ) +
                                "/" +
                                product.expDate.getFullYear()
                            }}
                        </span>
                    </li>
                    <li class="PayModalContent__infoItem">
                        <label>Code:</label>
                        <span>
                            {{ props.private.code }}
                            <button @click="onCopyCode()" title="Copy code">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                                    ></path>
                                </svg>
                            </button>
                        </span>
                    </li>
                    <li
                        class="PayModalContent__infoItem"
                        v-if="props.private.secret"
                    >
                        <label>Secret:</label>
                        <span>
                            {{ props.private.secret }}
                            <button @click="onCopySecret()" title="Copy secret">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                                    ></path>
                                </svg>
                            </button>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="PayModalContent__footer">
                <p class="PayModalContent__note">
                    *All purchased code details will be at your item page
                </p>
                <button class="PayModalContent__ok" @click="ok()">OK</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";
import router from "@/router";

const props = defineProps({
    product: {
        type: Object,
    },
    private: {
        type: Object,
    },
});

function ok() {
    router.push("/myitem");
}
function onCopyCode() {
    navigator.clipboard.writeText(props.private.code).then(() => {
        alert("Code copied to clipboard!");
    });
}
function onCopySecret() {
    navigator.clipboard.writeText(props.private.secret).then(() => {
        alert("Secret copied to clipboard!");
    });
}
</script>

<style lang="scss" scoped>
.PayModal {
    display: block;
    position: fixed; /* Stay in place */
    z-index: 100; /* Sit on top */
    padding-top: 32px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.8); /* Black w/ opacity */
}

/* Modal Content */
.PayModalContent {
    position: relative;
    background-color: #ffffff;
    margin: auto;
    padding: 16px;
    width: 500px;
    border-radius: 16px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s;
    &__header {
        font-size: 20px;
        color: var(--purple);
        margin-bottom: 24px;
    }
    &__sub {
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 16px;
    }
    &__body {
        display: flex;
        column-gap: 24px;
        margin-bottom: 48px;
    }
    &__img {
        width: 150px;
    }
    &__info {
        list-style: none;
        li {
            float: left;
            margin-bottom: 12px;
        }
        label {
            width: 69px;
            float: left;
            text-align: left;
            font-weight: 600;
        }
        span {
            float: left;
            text-align: left;
            position: relative;
            button {
                cursor: pointer;
                outline: none;
                border: none;
                background-color: transparent;
                margin-left: 6px;
                svg {
                    position: absolute;
                    color: grey;
                    top: 0;
                    width: 20px;
                }
            }
        }
    }
    &__title {
        font-weight: 500;
        text-align: left;
    }
    &__note {
        font-size: 14px;
    }
    &__ok {
        cursor: pointer;
        margin-top: 4px;
        outline: none;
        border: none;
        color: white;
        border-radius: 32px;
        background-color: var(--lightPurple);
        padding: 8px 48px;
        transition: opacity 0.2s ease-in-out;
    }
    &__ok:hover {
        opacity: 0.75;
    }
}

/* Add Animation */
@-webkit-keyframes animatetop {
    from {
        top: -300px;
        opacity: 0;
    }
    to {
        top: 0;
        opacity: 1;
    }
}

@keyframes animatetop {
    from {
        top: -300px;
        opacity: 0;
    }
    to {
        top: 0;
        opacity: 1;
    }
}
</style>
