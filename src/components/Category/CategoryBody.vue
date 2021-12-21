<template>
    <div class="CategoryBody">
        <div class="CategoryBody__hero" :style="heroStyle">
            <h1 class="CategoryBody__title">{{ category.title }}</h1>
        </div>
        <div class="CategoryBody__showcase">
            <ProductCard
                class="ProductCard"
                v-for="(product, index) in products"
                :key="index"
                :product="product"
            />
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { db } from "@/main";
import { dText } from "@/components/Shared/datetime.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { categories } from "@/components/Shared/const.js";
import ProductCard from "@/components/Shared/ProductCard.vue";

const route = useRoute();

const category = categories.find((c) => c.id == route.params.id);
if (category === undefined) {
    alert("This category does not exist!");
    router.push("/product");
}
const heroStyle = {
    "--bgColor": category.bgColor,
    "--textColor": category.textColor,
};

const products = ref([]);
const categoryQuery = query(
    collection(db, "products"),
    where("buyerID", "==", null),
    where("expDate", ">", dText),
    where("category", "==", category.title)
);

onBeforeMount(async () => {
    const categorySnapshot = await getDocs(categoryQuery);
    categorySnapshot.forEach((doc) => {
        const data = doc.data();
        const productData = {
            id: doc.id,
            title: data.title,
            category: data.category,
            price: data.price,
            imgDataUrl: data.imgDataUrl,
        };
        productData.titleCrop =
            productData.title.length > 30
                ? productData.title.slice(0, 30).trim() + "..."
                : productData.title;
        products.value.push(productData);
    });
});
</script>

<style lang="scss" scoped>
.CategoryBody {
    padding: 10rem 12px 0 12px;
    min-height: calc(100vh - 360px);
    min-height: -o-calc(100vh - 360px); /* opera */
    min-height: -webkit-calc(100vh - 360px); /* google, safari */
    min-height: -moz-calc(100vh - 360px); /* firefox */
    width: var(--layoutWidth);
    margin: 0 auto;
    margin-bottom: 8rem;
    &__hero {
        display: flex;
        height: 200px;
        background-color: var(--bgColor);
        margin-bottom: 3rem;
        border-radius: 8px;
    }
    &__title {
        margin: auto;
        color: var(--textColor);
    }
    &__showcase {
        display: grid;
        grid: auto/repeat(6, minmax(0, 1fr));
        row-gap: 16px;
        column-gap: 8px;
    }
}
</style>
