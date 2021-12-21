<template>
    <div class="ProductShowcase">
        <h2 class="ProductShowcase__title">All products</h2>
        <div class="ProductShowcase__container">
            <ProductCard
                class="ProductCard"
                v-for="(product, index) in allProducts"
                :key="index"
                :product="product"
            />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { db } from "@/main";
import ProductCard from "@/components/Shared/ProductCard.vue";
import { dText } from "@/components/Shared/datetime.js";
import { collection, query, where, getDocs } from "firebase/firestore";

const allProducts = ref([]);

const productRef = collection(db, "products");
const q = query(
    productRef,
    where("buyerID", "==", null),
    where("expDate", ">", dText)
);
// TODO: IMPLEMENT PAGINATION (LOAD MORE)
getDocs(q)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
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
            allProducts.value.push(productData);
        });
    })
    .catch((e) => {
        alert(e.code);
    });
</script>

<style lang="scss" scoped>
.ProductShowcase {
    margin-top: 4rem;
    margin-bottom: 8rem;
    &__title {
        text-align: left;
    }
    &__container {
        display: grid;
        grid: auto/repeat(6, minmax(0, 1fr));
        row-gap: 16px;
        column-gap: 8px;
        margin-top: 1rem;
    }
}
</style>
