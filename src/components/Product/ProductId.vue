<template>
    <div class="ProductId">
        <div class="ProductId__main">
            <div class="ProductId__left">
                <img
                    :src="product.imgDataUrl"
                    alt=""
                    class="ProductId__img"
                    draggable="false"
                />
                <div class="ProductId__detail">
                    <div class="ProductId__header">
                        <h2 class="ProductId__title">{{ product.title }}</h2>
                        <div class="ProductId__tag">
                            <CategoryTag
                                :category="product.category"
                                :size="14"
                                :padding="'4px 8px'"
                            />
                            <p class="ProductId__expire">
                                EXP:
                                {{
                                    String(product.expDate.getDate()).padStart(
                                        2,
                                        "0"
                                    ) +
                                    "/" +
                                    String(
                                        product.expDate.getMonth() + 1
                                    ).padStart(2, "0") +
                                    "/" +
                                    product.expDate.getFullYear()
                                }}
                            </p>
                        </div>
                    </div>
                    <div class="ProductId__footer">
                        <h2 class="ProductId__price">฿{{ product.price }}</h2>
                        <button class="ProductId__buy" @click="onBuyClicked()">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            <div class="ProductId__right">
                <div class="ProductId__seller">
                    <p class="ProductId__sellerText">Sold by</p>
                    <p class="ProductId__sellerName">
                        {{ product.seller }}
                    </p>
                </div>
                <div class="ProductId__create">
                    <p class="ProductId__createText">Created on</p>
                    <p class="ProductId__createDate">
                        {{
                            String(product.createDate.getDate()).padStart(
                                2,
                                "0"
                            ) +
                            "/" +
                            String(product.createDate.getMonth() + 1).padStart(
                                2,
                                "0"
                            ) +
                            "/" +
                            product.createDate.getFullYear()
                        }}
                    </p>
                </div>
                <button class="ProductId__copy" @click="onCopyClicked()">
                    Copy URL
                    <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        class="ProductId__copyIcon"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
        <div class="ProductId__description">
            <p class="ProductId__descriptionHeader">
                Product details of {{ product.title }}
            </p>
            <p class="ProductId__text">{{ product.description }}</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { auth, db } from "@/main";
import { doc, getDoc, query } from "firebase/firestore";
import router from "@/router";
import CategoryTag from "@/components/Shared/CategoryTag.vue";

const props = defineProps({
    id: {
        type: String,
        default: "",
    },
});
const product = ref(null);

const docSnapshot = await getDoc(query(doc(db, "products", props.id)));
product.value = docSnapshot.data();
if (!product.value || product.value.buyerID != null) {
    alert("Product no longer exist!");
    router.push("/product");
}
product.value.expDate = new Date(product.value.expDate);
product.value.createDate = product.value.timestamp.toDate();

// get seller info
const userSnapshot = await getDoc(doc(db, "users", product.value.sellerID));
const userData = userSnapshot.data();
product.value.seller = userData.firstName + " " + userData.lastName;

function onCopyClicked() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Link copied to clipboard!");
    });
}

function onBuyClicked() {
    // check if user login
    if (!auth.currentUser) {
        alert("Please login first!");
        router.push("/login");
        return;
    }
    // prompt user to confirm buying
    const isConfirmed = confirm("Please confirm to buy this product.");
    if (!isConfirmed) return;
    if (product.value.sellerID == auth.currentUser.uid) {
        alert("Cannot buy your own product!");
        return;
    }
    router.push("/pay/" + props.id);
}
</script>

<style lang="scss" scoped>
.ProductId {
    border-radius: 12px;
    &__main {
        display: flex;
        justify-content: flex-end;
        padding: 16px;
        background-color: white;
        margin-bottom: 16px;
        border-radius: 8px;
        column-gap: 16px;
    }
    &__left {
        margin-right: auto;
        display: flex;
        column-gap: 24px;
    }
    &__img {
        width: 300px;
        height: 300px;
    }
    &__detail {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
    }
    &__header {
        display: flex;
        flex-direction: column;
        row-gap: 8px;
    }
    &__title {
        text-align: left;
        font-size: 22px;
        font-weight: 500;
    }
    &__tag {
        display: flex;
        align-items: center;
        column-gap: 16px;
        p {
            font-size: 14px;
            color: grey;
            padding: 4px 8px;
            border-radius: 16px;
        }
    }
    &__category {
        background-color: var(--greyHover);
    }
    &__expire {
        background-color: var(--redHover);
    }
    &__footer {
        display: flex;
        flex-direction: column;
        row-gap: 16px;
    }
    &__price {
        font-weight: 600;
        color: var(--lightPurple);
        text-align: left;
    }
    &__buy {
        cursor: pointer;
        font-size: 18px;
        color: white;
        outline: none;
        border: none;
        border-radius: 4px;
        padding: 10px 72px;
        background-color: var(--yellow);
        transition: opacity 0.2s ease-in-out;
    }
    &__buy:hover {
        opacity: 0.75;
    }
    &__right {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        row-gap: 16px;
        align-items: flex-end;
        width: 300px;
    }
    &__seller,
    &__create {
        text-align: left;
        padding: 8px 12px;
        border-radius: 12px;
        background-color: var(--greyHover);
    }
    &__sellerText,
    &__createText {
        font-size: 14px;
        margin-bottom: 4px;
        color: grey;
    }
    &__copy {
        cursor: pointer;
        font-size: 14px;
        color: white;
        outline: none;
        border: none;
        border-radius: 16px;
        padding: 4px 8px;
        background-color: var(--midBlue);
        transition: opacity 0.2s ease-in-out;
        display: flex;
        column-gap: 6px;
        align-items: center;
    }
    &__copy:hover {
        opacity: 0.9;
    }
    &__copyIcon {
        width: 20px;
    }
    &__description {
        text-align: left;
        padding: 16px;
        border-radius: 8px;
        background-color: white;
    }
    &__descriptionHeader {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 16px;
    }
}
</style>
