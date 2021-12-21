<template>
    <div class="SellAddImage">
        <div class="SellAddImage__imageBox">
            <img
                v-if="imgDataUrl == ''"
                src="@/assets/image.png"
                draggable="false"
            />
            <img v-if="imgDataUrl != ''" :src="imgDataUrl" draggable="false" />
            <svg
                class="SellAddImage__imageBox__clear"
                v-if="imgDataUrl != ''"
                @click="clearImg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                ></path>
            </svg>
        </div>
        <button class="SellAddImage__imgButton" @click="showImageUpload = true">
            Set Image
        </button>
        <my-upload
            field="img"
            @crop-success="cropSuccess"
            v-model="showImageUpload"
            :width="256"
            :height="256"
            noCircle
            img-format="png"
            langType="en"
        ></my-upload>
    </div>
</template>

<script setup>
import { inject, ref } from "vue";
import myUpload from "vue-image-crop-upload";

const showImageUpload = ref(false);
const imgDataUrl = inject("imgDataUrl");
const cropSuccess = inject("cropSuccess");
const clearImg = inject("clearImg");
</script>

<style lang="scss" scoped>
.SellAddImage {
    &__imgButton {
        padding: 6px 12px;
        font-size: 14px;
        border: none;
        border-radius: 16px;
        cursor: pointer;
        background-color: var(--purple);
        color: white;
        transition: opacity 0.2s ease-in-out;
    }
    &__imgButton:hover {
        opacity: 0.78;
    }
    &__imageBox {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        background-color: #fafeff;
        width: 256px;
        height: 256px;
        display: flex;
        box-shadow: 4px 4px 6px rgba(50, 50, 93, 0.1),
            -4px -4px 6px rgba(50, 50, 93, 0.015);
        img {
            margin: auto;
        }
        margin-bottom: 1.5rem;
        &__clear {
            position: absolute;
            cursor: pointer;
            top: 4px;
            right: 4px;
            width: 20px;
            padding: 2px;
            color: var(--redError);
            border-radius: 50%;
            background-color: rgba($color: #e5e5e5, $alpha: 0.8);
        }
    }
}
</style>
