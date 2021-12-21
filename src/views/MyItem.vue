<template>
    <div class="myitem">
        <Header />
        <MyItemBody />
        <Footer :waveFillColor="'#fff'" />
    </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue";
import MyItemBody from "@/components/MyItem/MyItemBody.vue";
import Footer from "@/components/Shared/Footer.vue";
</script>
