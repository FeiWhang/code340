<template>
    <div class="PayCard">
        <PayModal
            v-if="showPayModal"
            :product="product"
            :private="privateData"
        />
        <h2 class="PayCard__header">Payment</h2>
        <img :src="product.imgDataUrl" alt="" class="PayCard__img" />
        <h3 class="PayCard__title">
            <span>Title <br /></span>{{ product.title }}
        </h3>
        <h3 class="PayCard__price">
            <span>Price <br /></span>{{ product.price }} THB
        </h3>
        <google-pay-button
            environment="TEST"
            v-bind:button-type="buttonType"
            v-bind:button-color="buttonColor"
            v-bind:existing-payment-method-required="
                existingPaymentMethodRequired
            "
            v-bind:paymentRequest.prop="{
                apiVersion: paymentRequest.apiVersion,
                apiVersionMinor: paymentRequest.apiVersionMinor,
                allowedPaymentMethods: paymentRequest.allowedPaymentMethods,
                merchantInfo: paymentRequest.merchantInfo,
                transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPriceLabel: 'Total',
                    totalPrice: amount,
                    currencyCode: 'THB',
                    countryCode: 'TH',
                },
            }"
            v-on:loadpaymentdata="onLoadPaymentData"
            v-on:error="onError"
        ></google-pay-button>
    </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { auth, db } from "@/main";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import "@google-pay/button-element";
import router from "@/router";
import PayModal from "./PayModal.vue";

const props = defineProps({
    productId: {
        type: String,
        default: "",
    },
});

const product = ref({});
const productRef = doc(db, "products", props.productId);
const docSnapshot = await getDoc(productRef);
product.value = docSnapshot.data();
if (!product.value || product.value.buyerID != null) {
    alert("Product no longer exist!");
    router.push("/product");
}
product.value.expDate = new Date(product.value.expDate);

// payment
const existingPaymentMethodRequired = false;
const buttonColor = "white";
const buttonType = "pay";
const amount = String(product.value.price);
const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
        {
            type: "CARD",
            parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
            },
            tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                    gateway: "example",
                    gatewayMerchantId: "exampleGatewayMerchantId",
                },
            },
        },
    ],
    merchantInfo: {
        merchantId: "12345678901234567890",
        merchantName: "Demo Merchant",
    },
};

const showPayModal = ref(false);
const privateData = ref({});
function onError(event) {
    console.error("error", event.error);
}
function onLoadPaymentData(event) {
    console.log("load payment data", event.detail);
    (async () => {
        // update products collection
        await updateDoc(productRef, {
            buyerID: auth.currentUser.uid,
            buyAt: serverTimestamp(),
        });
        // get private product info
        const privateSnapshot = await getDoc(
            doc(productRef, "private", "detail")
        );
        privateData.value = privateSnapshot.data();
        showPayModal.value = true;
    })();
}
</script>

<style lang="scss" scoped>
.PayCard {
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
        0 18px 36px -18px rgba(0, 0, 0, 0.3),
        0 -12px 36px -8px rgba(0, 0, 0, 0.025);
    background-color: white;
    &__img {
        width: 150px;
        height: 150px;
        margin-top: 32px;
    }
    span {
        font-size: 16px;
        font-weight: 400;
    }
    h3 {
        font-size: 18px;
        font-weight: 500;
        text-align: left;
    }
    &__title {
        margin-top: 32px;
    }
    &__price {
        margin-top: 16px;
        margin-bottom: 64px;
    }
    h3:after {
        display: inline-block;
        content: "";
        border-top: 2px solid var(--greyHover);
        width: 100%;
    }
}
</style>
