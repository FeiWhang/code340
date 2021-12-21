<template>
    <div class="SellAddForm">
        <div class="InputRow">
            <div class="InputRow__item">
                <label for="Code">Code</label>
                <input
                    v-model="formData.code"
                    type="text"
                    name="Code"
                    maxlength="50"
                    id="Code"
                />
                <label for="Code" id="SubLabel">* max 50 characters</label>
            </div>
            <div class="InputRow__item">
                <label for="Secret">Secret</label>
                <input
                    v-model="formData.secret"
                    type="text"
                    name="Secret"
                    maxlength="30"
                    id="Secret"
                />
                <label for="Secret" id="SubLabel">* optional</label>
            </div>
        </div>
        <br />
        <div class="InputRow">
            <div class="InputRow__item">
                <label for="Expiration">Expiration date</label>
                <input
                    type="date"
                    name="Expiration"
                    id="Expiration"
                    v-model="formData.expDate"
                    :style="{ color: formData.expDate ? 'black' : '#d5d5d5' }"
                />
                <label for="Expiration" id="SubLabel">* at leaset 1 day</label>
            </div>
            <div class="InputRow__item">
                <label for="Price">Price</label>
                <span id="PriceContainer">
                    <input
                        v-model.number="formData.price"
                        type="number"
                        name="Price"
                        id="Price"
                        min="0"
                    />
                </span>
                <label for="Price" id="SubLabel">* at least 0</label>
            </div>
        </div>
        <br />
        <div class="InputRow">
            <div class="InputRow__item">
                <label for="Title">Title</label>
                <input
                    v-model.trim="formData.title"
                    type="text"
                    name="Title"
                    maxlength="50"
                    id="Title"
                />
            </div>
            <div class="InputRow__item">
                <label for="Category">Category</label>
                <select v-model="formData.category" name="Category">
                    <option>Item Code</option>
                    <option>Voucher Code</option>
                    <option>Gift Card</option>
                    <option>Cash Card</option>
                    <option>E-Coupon</option>
                    <option>Others</option>
                </select>
            </div>
        </div>
        <label for="Title" id="SubLabel">* max 50 characters</label>
        <br />
        <label for="Description">Description</label>
        <textarea
            class="DescriptionArea"
            name="Description"
            v-model="formData.description"
            cols="80"
            rows="8"
            maxlength="500"
            wrap="hard"
        ></textarea>
        <label for="Code" id="SubLabel">* max 500 characters</label>
        <br />
    </div>
</template>

<script setup>
import { inject } from "vue";
const formData = inject("formData");
</script>

<style lang="scss" scoped>
.SellAddForm {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    label {
        font-size: 15px;
        font-weight: 500;
        text-align: left;
        margin-left: 4px;
    }
    #SubLabel {
        font-size: 14px;
        font-weight: 400;
        color: #c8c8d8;
    }
    input {
        padding: 8px 16px;
        font-size: 16px;
        border-radius: 8px;
        border: 1px solid #e9e9e9;
        outline: none;
        margin: 4px 0;
        transition: all 0.2s ease-in-out;
    }

    input:focus {
        box-shadow: 0 0 3px var(--lightPurple);
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    #Title {
        width: 350px;
    }
    #Price {
        width: 110px;
        padding-right: 48px;
    }
    #PriceContainer {
        position: relative;
    }
    #PriceContainer:after {
        position: absolute;
        top: 13px;
        font-size: 14px;
        right: 14px;
        font-weight: 500;
        color: grey;
        content: "THB";
    }
    #Code {
        width: 350px;
        text-transform: uppercase;
    }
    #Secret {
        width: 220px;
        text-transform: uppercase;
    }
    #Expiration {
        width: 140px;
        font-family: Arial, Helvetica, sans-serif;
    }
    .InputRow {
        display: flex;
        align-items: center;
        column-gap: 32px;
        select {
            margin: 4px 0;
            padding: 8px 24px;
            font-size: 16px;
            border-radius: 8px;
            border: 1px solid #e9e9e9;
            outline: none;
            transition: all 0.2s ease-in-out;
        }
        &__item {
            display: flex;
            flex-direction: column;
        }
    }
}
.DescriptionArea {
    outline: none;
    margin: 4px 0;
    padding: 16px;
    border-radius: 12px;
    resize: none;
    font-size: 16px;
    border: 1px solid #e9e9e9;
    font-family: Arial, Helvetica, sans-serif;
    transition: all 0.2s ease-in-out;
}

.DescriptionArea:focus {
    box-shadow: 0 0 3px var(--lightPurple);
}
</style>
