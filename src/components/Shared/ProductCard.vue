<template>
    <div
        class="ProductCard"
        :title="props.product.title"
        @click="onProductCardClicked(props.product.id)"
    >
        <img
            :src="props.product.imgDataUrl + ''"
            alt=""
            class="ProductCard__img"
            draggable="false"
        />
        <div class="ProductCard__detail">
            <p class="ProductCard__title">{{ props.product.titleCrop }}</p>
            <CategoryTag :category="props.product.category" :size="13" />
            <p class="ProductCard__price">
                ฿{{ props.product.price.toLocaleString("en-US") }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";
import router from "@/router";
import CategoryTag from "@/components/Shared/CategoryTag.vue";

const props = defineProps({
    product: {
        type: Object,
    },
});
function onProductCardClicked(id) {
    router.push("/product/" + id);
}
</script>

<style lang="scss" scoped>
.ProductCard {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    transition: box-shadow, transform 0.2s ease-in-out;
    background-color: white;
    border-radius: 4px;
    overflow: hidden;
    &__img {
        width: 100%;
    }
    p {
        text-align: left;
        padding: 2px 0;
    }
    &__title {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 4px;
        line-height: 18px;
        height: 36px;
    }
    &__detail {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0 8px;
    }
    &__price {
        font-size: 18px;
        font-weight: 500;
        color: var(--lightPurple);
        margin: 4px 0;
    }
}
.ProductCard:hover {
    box-shadow: -4px -4px 4px #eef8ff, 4px 4px 4px #d0ebff;
    transform: translateY(-2px);
}
</style>
