<template>
    <div class="MyItemBody">
        <h2 class="MyItemBody__title">My Items</h2>
        <div class="MyItemBody__content">
            <ul class="MyItemBody__list">
                <li class="MyItem" v-for="(item, index) in items" :key="index">
                    <div class="MyItem__header">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Purchased on</th>
                                    <th>Price</th>
                                    <th>Expires on</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ item.id }}</td>
                                    <td>
                                        {{
                                            String(
                                                item.buyAt.getDate()
                                            ).padStart(2, "0") +
                                            "/" +
                                            String(
                                                item.buyAt.getMonth() + 1
                                            ).padStart(2, "0") +
                                            "/" +
                                            item.buyAt.getFullYear()
                                        }}
                                    </td>
                                    <td>{{ item.price }} THB</td>
                                    <td>
                                        {{
                                            String(
                                                item.expDate.getDate()
                                            ).padStart(2, "0") +
                                            "/" +
                                            String(
                                                item.expDate.getMonth() + 1
                                            ).padStart(2, "0") +
                                            "/" +
                                            item.expDate.getFullYear()
                                        }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="MyItem__footer">
                        <img
                            :src="item.imgDataUrl"
                            alt=""
                            class="MyItem__img"
                        />
                        <div class="MyItem__detail">
                            <h3 class="MyItem__title">
                                {{ item.title }}
                            </h3>
                            <br />
                            <ContentCode
                                :code="item.code"
                                :secret="item.secret"
                            />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
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
import ContentCode from "@/components/Shared/ContentCode.vue";

const items = ref([]);
const myItemQuery = query(
    collection(db, "products"),
    where("buyerID", "==", auth.currentUser.uid),
    orderBy("buyAt", "desc")
);
onBeforeMount(async () => {
    const itemSnapshot = await getDocs(myItemQuery);
    itemSnapshot.forEach(async (newDoc) => {
        let itemData = newDoc.data();
        itemData.id = newDoc.id;
        itemData.buyAt = itemData.buyAt.toDate();
        itemData.expDate = new Date(itemData.expDate);
        const detailRef = doc(newDoc.ref, "private", "detail");
        const detailQuery = query(detailRef);
        const detailSnapshot = await getDoc(detailQuery);
        const detailData = detailSnapshot.data();
        itemData.code = detailData.code;
        if (detailData.secret) itemData.secret = detailData.secret;
        delete itemData.timestamp;
        delete itemData.sellerID;
        delete itemData.description;
        items.value.push(itemData);
    });
});
</script>

<style lang="scss" scoped>
.MyItemBody {
    padding: 12rem 12px 0 12px;
    min-height: calc(100vh - 360px);
    min-height: -o-calc(100vh - 360px); /* opera */
    min-height: -webkit-calc(100vh - 360px); /* google, safari */
    min-height: -moz-calc(100vh - 360px); /* firefox */
    width: var(--layoutWidth);
    margin: 0 auto;
    &__title {
        text-align: left;
    }
    &__content {
        margin: 2rem 0 8rem 0;
        border: 2px solid var(--greyHover);
    }
}
.MyItem {
    list-style: none;
    padding: 24px;
    display: list-item;
    border-bottom: 2px solid var(--greyHover);
    &__header {
        table {
            width: 100%;
            text-align: left;
            padding: 16px;
            border-radius: 4px;
            background-color: var(--greyHover);
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
    }
    &__footer {
        display: flex;
        margin-top: 10px;
        text-align: left;
        align-items: flex-start;
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
.MyItem:last-child {
    border-bottom: none;
}
</style>
