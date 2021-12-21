<template>
    <div class="SellAddBody">
        <h2>Add new product</h2>
        <div class="SellAddBody__form">
            <div class="SellAddBody__left">
                <SellAddImage />
            </div>
            <div class="VerticalDivider"></div>
            <div class="SellAddBody__right">
                <SellAddForm />
            </div>
        </div>
        <div class="SellAddBody__footer">
            <p class="SellAddBody__footerError" :key="error" v-if="error">
                {{ error }}
            </p>
            <div class="ConfirmFooterContainer">
                <label class="ConfirmFooterContainer__label">
                    <input type="checkbox" v-model="checkedConfirm" />
                    <span class="ConfirmFooterContainer__checkmark"></span>I
                    have reviewed that the above information is correct</label
                >
            </div>
            <button class="SellAddBody__footerSubmit" @click="submitProduct">
                Submit
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, provide } from "vue";
import { auth, db } from "@/main";
import router from "@/router";
import {
    setDoc,
    addDoc,
    doc,
    collection,
    serverTimestamp,
} from "firebase/firestore";
import SellAddImage from "./SellAddImage.vue";
import SellAddForm from "./SellAddForm.vue";

// image
const imgDataUrl = ref("");
function cropSuccess(newImgDataUrl) {
    imgDataUrl.value = newImgDataUrl;
}
function clearImg() {
    imgDataUrl.value = "";
}
provide("imgDataUrl", imgDataUrl);
provide("clearImg", clearImg);
provide("cropSuccess", cropSuccess);

// form
const formData = reactive({
    code: "",
    secret: "",
    price: "",
    title: "",
    description: "",
    category: "",
    expDate: "",
});
provide("formData", formData);

// footer
const checkedConfirm = ref(false);
const error = ref("");

function validateForm(productData) {
    // check for confirm checkbox
    if (!checkedConfirm.value) {
        error.value =
            "* Please indicate that you have reviewed the above information";
        return false;
    }
    // check for empty data
    let isFilled = true;
    Object.values(productData).forEach((value) => {
        if (value === "") {
            isFilled = false;
        }
    });
    if (!isFilled) {
        error.value = "* No field can be left blank";
        return false;
    }
    // check price
    if (!Number.isInteger(productData.price) || productData.price <= 0) {
        error.value = "* Price has to be more than 0 with no decimal";
        return false;
    }
    if (productData.price > 999999999) {
        error.value = "* Price has to be less than a billion THB";
        return false;
    }
    // check expDate
    if (new Date(productData.expDate) <= new Date()) {
        error.value = "* Expiration date must be at least 1 day from now";
        return false;
    }
    return true;
}

function submitProduct() {
    const productData = {
        price: formData.price,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        expDate: formData.expDate,
        imgDataUrl: imgDataUrl.value,
    };
    if (!validateForm(productData)) return;
    // pass validation -> data manage
    productData.timestamp = serverTimestamp();
    productData.sellerID = auth.currentUser.uid;
    productData.buyerID = null;
    let detailData = {
        code: formData.code.toUpperCase(),
    };
    if (formData.secret) detailData.secret = formData.secret;
    // write to store
    addDoc(collection(db, "products"), productData)
        .then((newDoc) => {
            setDoc(
                doc(db, "products", newDoc.id, "private", "detail"),
                detailData
            ).then(() => {
                router.push("/sell");
                alert("Successfully created new product!");
            });
        })
        .catch((e) => {
            alert(e);
        });
}
</script>

<style lang="scss" scoped>
.SellAddBody {
    padding: 12rem 12px 0 12px;
    min-height: calc(100vh - 360px);
    min-height: -o-calc(100vh - 360px); /* opera */
    min-height: -webkit-calc(100vh - 360px); /* google, safari */
    min-height: -moz-calc(100vh - 360px); /* firefox */
    width: var(--layoutWidth);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    h2 {
        text-align: left;
        margin-bottom: 24px;
    }
    &__form {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;
    }
    .VerticalDivider {
        width: 2px;
        background-color: #c8c8d8;
        opacity: 0.2;
        border-radius: 4px;
        margin-top: 16px;
        margin-bottom: 48px;
    }
    &__left {
        margin-top: 12px;
    }
    &__footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 3rem;
    }
    &__footerError {
        margin-top: 1rem;
        color: var(--redError);
        transition: all 0.3 ease-in-out;
        animation: 0.3s shake alternate;
    }
    &__footerSubmit {
        cursor: pointer;
        padding: 12px 0;
        width: 250px;
        border-radius: 24px;
        font-size: 16px;
        font-weight: 600;
        border: none;
        background-color: var(--lightPurple);
        color: white;
        margin-top: 36px;
        transition: opacity 0.2s ease-in-out;
    }
    &__footerSubmit:hover {
        opacity: 0.75;
    }
}
.ConfirmFooterContainer {
    &__label {
        margin-top: 48px;
        display: block;
        position: relative;
        padding-left: 32px;
        cursor: pointer;
        font-size: 16px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    &__label input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
    &__checkmark {
        position: absolute;
        top: -1px;
        left: 0;
        height: 22px;
        width: 22px;
        border-radius: 4px;
        border: 1px solid #e8e8e8;
    }
    &__label input:checked ~ &__checkmark {
        background-color: var(--lightPurple);
    }
    &__checkmark:after {
        content: "";
        position: absolute;
        display: none;
        left: 7px;
        top: 1px;
        width: 5px;
        height: 12px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    &__label input:checked ~ &__checkmark:after {
        display: block;
    }
}
</style>
