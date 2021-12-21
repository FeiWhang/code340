<template>
    <div class="product">
        <Header />
        <ProductBody />
        <Footer :waveFillColor="'#eef2f5'" />
    </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue";
import ProductBody from "@/components/Product/ProductBody.vue";
import Footer from "@/components/Shared/Footer.vue";
</script>

<style lang="scss" scoped>
.product {
    background-color: #eef2f5;
}
</style>
