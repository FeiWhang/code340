<template>
    <div class="category">
        <Header />
        <CategoryBody />
        <Footer :waveFillColor="'#eef2f5'" />
    </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue";
import CategoryBody from "@/components/Category/CategoryBody.vue";
import Footer from "@/components/Shared/Footer.vue";
</script>

<style lang="scss" scoped>
.category {
    background-color: #eef2f5;
}
</style>
