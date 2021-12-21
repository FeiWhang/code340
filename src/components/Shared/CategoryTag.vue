<template>
    <div class="CategoryTag">
        <span
            :style="{
                'background-color': category.bgColor,
                color: category.textColor,
                'font-size': size + 'px',
                padding: padding,
            }"
            >{{ category.title }}</span
        >
    </div>
</template>

<script setup>
import { defineProps } from "vue";
import { categories } from "@/components/Shared/const.js";

const props = defineProps({
    category: {
        type: String,
        default: "Others",
    },
    size: {
        type: Number,
        default: 14,
    },
    padding: {
        type: String,
        default: "2px 8px",
    },
});

const category = categories.find((c) => c.title == props.category);
</script>

<style lang="scss" scoped>
.CategoryTag {
    span {
        border-radius: 24px;
    }
}
</style>
