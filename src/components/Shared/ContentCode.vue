<template>
    <div class="ContentCode">
        <h3 class="ContentCode__text">
            {{ hideCode ? "*".repeat(code.length) : code }}
            <svg
                class="ContentCode__hid"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                v-if="!hideCode"
                @click="hideCode = !hideCode"
            >
                <title>Hide code</title>
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
            </svg>
            <svg
                class="ContentCode__hid"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                v-if="hideCode"
                @click="hideCode = !hideCode"
            >
                <title>Show code</title>
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                ></path>
            </svg>
        </h3>
        <h3 class="ContentCode__text" v-if="secret != ''">
            {{ hideSecret ? "*".repeat(secret.length) : secret }}
            <svg
                class="ContentCode__hid"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                v-if="!hideSecret"
                @click="hideSecret = !hideSecret"
            >
                <title>Hide secret</title>
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
            </svg>
            <svg
                class="ContentCode__hid"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                v-if="hideSecret"
                @click="hideSecret = !hideSecret"
            >
                <title>Show secret</title>
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                ></path>
            </svg>
        </h3>
    </div>
</template>

<script>
export default {
    data() {
        return {
            hideCode: true,
            hideSecret: true,
        };
    },
    props: {
        code: {
            type: String,
            default: "",
        },
        secret: {
            type: String,
            default: "",
        },
    },
};
</script>

<style lang="scss" scoped>
.ContentCode {
    &__text {
        transition: all 0.3s ease-in-out;
    }
    &__hid {
        width: 18px;
        height: 18px;
        cursor: pointer;
        margin-left: 8px;
        padding: 0 4px;
    }
    &__text {
        font-size: 16px;
    }
}
</style>
