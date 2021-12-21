<template>
    <div class="SellContent">
        <transition name="fade-down">
            <ul class="SellContent__list" :key="products">
                <li
                    class="SellContent__item"
                    v-for="(product, index) in products"
                    :key="index"
                >
                    <div class="SellContent__header">
                        <table class="HeaderTable">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Date created</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Expires on</th>
                                    <th class="HeaderTable__status">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ product.id }}</td>
                                    <td>
                                        {{
                                            String(
                                                product.createDate.getDate()
                                            ).padStart(2, "0") +
                                            "/" +
                                            String(
                                                product.createDate.getMonth() +
                                                    1
                                            ).padStart(2, "0") +
                                            "/" +
                                            product.createDate.getFullYear()
                                        }}
                                    </td>
                                    <td>{{ product.category }}</td>
                                    <td>{{ product.price }} THB</td>
                                    <td>
                                        {{
                                            String(
                                                product.expDate.getDate()
                                            ).padStart(2, "0") +
                                            "/" +
                                            String(
                                                product.expDate.getMonth() + 1
                                            ).padStart(2, "0") +
                                            "/" +
                                            product.expDate.getFullYear()
                                        }}
                                    </td>
                                    <td class="HeaderTable__status">
                                        <span
                                            class="HeaderTable__statusDetail"
                                            :class="
                                                product.status.replace(' ', '')
                                            "
                                        >
                                            {{ product.status }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="SellContent__footer">
                        <img
                            :src="product.imgDataUrl"
                            alt=""
                            class="FooterTable__img"
                        />

                        <div class="FooterTable">
                            <ContentCode
                                :code="product.code"
                                :secret="product.secret"
                            />
                            <br />
                            <h3 class="FooterTable__title">
                                {{ product.title }}
                            </h3>
                            <p class="FooterTable__desc">
                                {{ product.description }}
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script setup>
import { inject } from "vue";
import ContentCode from "@/components/Shared/ContentCode.vue";

const products = inject("showProducts");
</script>

<style lang="scss" scoped>
.SellContent {
    margin: 2rem 0 8rem 0;
    border: 2px solid var(--greyHover);
    &__item {
        list-style: none;
        padding: 24px;
        display: list-item;
        border-bottom: 2px solid var(--greyHover);
    }
    &__item:last-child {
        border-bottom: none;
    }
    &__footer {
        margin-top: 8px;
        display: flex;
    }
    transition: all 0.5s ease-in-out;
}

table {
    width: 100%;
    text-align: left;
    border-radius: 4px;
}
th {
    font-size: 14px;
    font-weight: 300;
    color: #777777;
}
td {
    font-size: 16px;
    padding-top: 8px;
}

.HeaderTable {
    padding: 16px;
    background-color: var(--greyHover);
    &__status {
        text-align: right;
    }
    &__statusDetail {
        padding: 4px 12px;
        border-radius: 24px;
        font-size: 16px;
        color: white;
    }
    &__status .InProgress {
        background: var(--green);
    }
    &__status .Sold {
        background: var(--lightPurple);
    }
    &__status .Expired {
        background: #777777;
    }
}
.FooterTable {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    margin-top: 10px;
    &__detail {
        vertical-align: top;
    }
    &__img {
        width: 200px;
        height: 200px;
        margin-right: 2rem;
    }
    &__title {
        font-size: 17px;
        font-weight: 600;
    }
}

.fade-down-enter-active,
.fade-down-leave-active {
    transition: all 0.25s ease-in-out;
    transform: translateY(12px);
}

.fade-down-enter-from,
.fade-down-leave-to {
    opacity: 0;
    transform: translateY(-12px);
}
</style>
