<template>
    <div class="sell">
        <Header />
        <router-view></router-view>
        <Footer :waveFillColor="'#fff'" />
    </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Shared/Footer.vue";
</script>
