<template>
    <div class="home">
        <Header :isHome="true" />
        <HomeBody />
        <Footer :waveFillColor="'#fff'" />
    </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue";
import HomeBody from "@/components/Home/HomeBody.vue";
import Footer from "@/components/Shared/Footer.vue";
</script>
