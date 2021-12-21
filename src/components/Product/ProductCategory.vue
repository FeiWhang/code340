<template>
    <div class="ProductCategory">
        <h2 class="ProductCategory__title">Categories</h2>
        <div class="ProductCategory__container">
            <div
                class="CategoryCard"
                v-for="(category, index) in categories"
                :key="index"
                @click="toCategory(index)"
            >
                <img
                    :src="require('@/assets/' + category.img)"
                    alt=""
                    class="CategoryCard__img"
                    draggable="false"
                />
                <h2 class="CategoryCard__title">{{ category.title }}</h2>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from "@/router";
import { categories } from "@/components/Shared/const.js";

function toCategory(index) {
    router.push("/category/" + categories[index].id);
}
</script>

<style lang="scss" scoped>
.ProductCategory {
    &__title {
        text-align: left;
    }
    &__container {
        display: grid;
        grid: auto/repeat(6, minmax(0, 1fr));
        margin-top: 1rem;
    }
}

.CategoryCard {
    cursor: pointer;
    display: grid;
    grid: auto/repeat(1fr, 2);
    justify-items: center;
    row-gap: 24px;
    padding: 20px;
    border: 1px solid var(--greyHover);
    transition: box-shadow 0.2s ease-in-out;
    background-color: #f7fafc;
    &__title {
        font-size: 16px;
        font-weight: 500;
    }
    &__img {
        width: 54px;
        height: 54px;
        opacity: 0.69;
        transition: opacity 0.2s ease-in-out;
    }
}
.CategoryCard:hover {
    box-shadow: inset 0 0 4px var(--midBlue);
}
.CategoryCard:hover img {
    opacity: 0.88;
}
</style>
