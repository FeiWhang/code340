<template>
    <div class="HomeBody">
        <div class="HomeHeroContainer">
            <HomeHero />
        </div>
        <HomePartner />
    </div>
</template>

<script setup>
import HomeHero from "./HomeHero.vue";
import HomePartner from "./HomePartner.vue";
</script>

<style lang="scss" scoped>
.HomeBody {
    min-height: calc(100vh - 168px);
    min-height: -o-calc(100vh - 168px);
    min-height: -webkit-calc(100vh - 168px);
    min-height: -moz-calc(100vh - 168px);
}

.HomeHeroContainer {
    position: relative;
    background-image: linear-gradient(150deg, var(--darkPurple), var(--purple));
}
</style>
