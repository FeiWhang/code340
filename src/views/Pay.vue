<template>
    <div class="pay">
        <Header />
        <PayBody />
        <Footer :waveFillColor="'#eef2f5'" />
    </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue";
import PayBody from "@/components/Pay/PayBody.vue";
import Footer from "@/components/Shared/Footer.vue";
</script>

<style lang="scss" scoped>
.pay {
    background-color: #eef2f5;
}
</style>
