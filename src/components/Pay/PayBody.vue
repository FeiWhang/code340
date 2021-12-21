<template>
    <div class="PayBody">
        <suspense>
            <PayCard :productId="route.params.id" />
        </suspense>
    </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const PayCard = defineAsyncComponent(() => import("./PayCard.vue"));
</script>

<style lang="scss" scoped>
.PayBody {
    padding: 12rem 12px 0 12px;
    min-height: calc(100vh - 360px);
    min-height: -o-calc(100vh - 360px); /* opera */
    min-height: -webkit-calc(100vh - 360px); /* google, safari */
    min-height: -moz-calc(100vh - 360px); /* firefox */
    width: var(--layoutWidth);
    margin: 0 auto;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}
</style>
