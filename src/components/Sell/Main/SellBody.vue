<template>
    <div class="SellBody">
        <h2>Your products</h2>
        <div class="SellBody__topbar">
            <div class="SellBody__nav">
                <a
                    @click="onNavChange(0)"
                    class="SellBody__navItem"
                    :class="[navIndex == 0 ? 'active' : '']"
                >
                    All
                </a>
                <a
                    @click="onNavChange(1)"
                    class="SellBody__navItem"
                    :class="[navIndex == 1 ? 'active' : '']"
                >
                    In Progress
                </a>
                <a
                    @click="onNavChange(2)"
                    class="SellBody__navItem"
                    :class="[navIndex == 2 ? 'active' : '']"
                >
                    Sold
                </a>
                <a
                    @click="onNavChange(3)"
                    class="SellBody__navItem"
                    :class="[navIndex == 3 ? 'active' : '']"
                >
                    Expired
                </a>
            </div>
            <LinkGo
                title="Add Product"
                bgColor="#f3f3f3"
                elemColor="#260057"
                to="/sell/add"
            />
        </div>
        <SellContent />
    </div>
</template>

<script setup>
import { ref, provide, onBeforeMount } from "vue";
import LinkGo from "@/components/Shared/LinkGo.vue";
import SellContent from "./SellContent.vue";
import { auth, db } from "@/main";
import {
    doc,
    collection,
    query,
    where,
    getDocs,
    orderBy,
    getDoc,
} from "firebase/firestore";
import { dText } from "@/components/Shared/datetime.js";
const navIndex = ref(0);

const allProducts = ref([]);
const showProducts = ref(allProducts.value);

function onNavChange(newNavIndex) {
    navIndex.value = newNavIndex;
    switch (newNavIndex) {
        case 0:
            showProducts.value = allProducts.value;
            break;
        case 1:
            showProducts.value = allProducts.value.filter(
                (product) => product.status == "In Progress"
            );
            break;
        case 2:
            showProducts.value = allProducts.value.filter(
                (product) => product.status == "Sold"
            );
            break;
        case 3:
            showProducts.value = allProducts.value.filter(
                (product) => product.status == "Expired"
            );
            break;
        default:
            showProducts.value = allProducts.value;
            break;
    }
}
const productRef = collection(db, "products");
const q = query(
    productRef,
    where("sellerID", "==", auth.currentUser.uid),
    orderBy("timestamp", "desc")
);

onBeforeMount(async () => {
    const newSnapshot = await getDocs(q);
    newSnapshot.forEach(async (newDoc) => {
        let productData = newDoc.data();
        const detailRef = doc(newDoc.ref, "private", "detail");
        const detailQ = query(detailRef);
        const detailSnapshot = await getDoc(detailQ);
        let detailData = detailSnapshot.data();
        productData.code = detailData.code;
        if (detailData.secret) productData.secret = detailData.secret;

        productData.id = newDoc.id;
        productData.status = productData.buyerID
            ? "Sold"
            : productData.expDate > dText
            ? "In Progress"
            : "Expired";
        productData.createDate = productData.timestamp.toDate();
        productData.expDate = new Date(productData.expDate);
        delete productData.timestamp;
        allProducts.value.push(productData);
    });
});

provide("showProducts", showProducts);
</script>

<style lang="scss" scoped>
.SellBody {
    padding: 12rem 12px 0 12px;
    min-height: calc(100vh - 360px);
    min-height: -o-calc(100vh - 360px); /* opera */
    min-height: -webkit-calc(100vh - 360px); /* google, safari */
    min-height: -moz-calc(100vh - 360px); /* firefox */
    width: var(--layoutWidth);
    margin: 0 auto;
    h2 {
        text-align: left;
    }
    &__topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 1.5rem 0;
        margin-top: 1rem;
    }
    &__nav {
        position: relative;
        display: flex;
        column-gap: 2.5rem;
    }
    &__nav::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--greyHover);
        height: 3px;
        border-radius: 3px;
        z-index: -1;
    }
    &__navItem {
        cursor: pointer;
        text-decoration: 0;
        font-size: 18px;
        font-weight: 500;
    }
    &__navItem:hover {
        color: var(--purple);
    }
    &__navItem.active {
        position: relative;
        padding-bottom: 6px;
        color: var(--lightPurple);
    }
    &__navItem::after {
        content: "";
        opacity: 0;
        transition: all 0.25s ease-out;
    }
    &__navItem.active::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        background: var(--lightPurple);
        height: 6px;
        border-radius: 6px;
        opacity: 1;
    }
}
</style>
