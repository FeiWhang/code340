<template>
    <div class="ProductBody">
        <ProductCategory v-if="!id" />
        <ProductShowcase v-if="!id" />
        <suspense>
            <ProductId v-if="id" :id="id" />
        </suspense>
    </div>
</template>

<script setup>
import ProductCategory from "./ProductCategory.vue";
import ProductShowcase from "./ProductShowcase.vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { defineAsyncComponent, ref } from "vue";

const route = useRoute();

const id = ref(route.params.id);
onBeforeRouteUpdate((to) => {
    id.value = to.params.id;
});

const ProductId = defineAsyncComponent(() => import("./ProductId.vue"));
</script>

<style lang="scss" scoped>
.ProductBody {
    padding: 12rem 12px 0 12px;
    min-height: calc(100vh - 360px);
    min-height: -o-calc(100vh - 360px); /* opera */
    min-height: -webkit-calc(100vh - 360px); /* google, safari */
    min-height: -moz-calc(100vh - 360px); /* firefox */
    width: var(--layoutWidth);
    margin: 0 auto;
    background-color: transparent;
}
</style>
