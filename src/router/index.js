import { createWebHistory, createRouter } from "vue-router";
import { getAuth } from "firebase/auth";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
        meta: {
            preventByAuth: true,
        },
    },
    {
        path: "/register",
        name: "Regist",
        component: () => import("@/views/Register.vue"),
        meta: {
            preventByAuth: true,
        },
    },
    {
        path: "/product/:id?",
        name: "Product",
        component: () => import("@/views/Product.vue"),
    },
    {
        path: "/myitem",
        name: "MyItem",
        component: () => import("@/views/MyItem.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/sell",
        name: "Sell",
        component: () => import("@/views/Sell.vue"),
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "add",
                component: () =>
                    import("@/components/Sell/Add/SellAddBody.vue"),
            },
            {
                path: "",
                component: () => import("@/components/Sell/Main/SellBody.vue"),
            },
        ],
    },
    {
        path: "/pay/:id",
        name: "pay",
        component: () => import("@/views/Pay.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/category/:id",
        name: "Category",
        component: () => import("@/views/Category.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/views/PageNotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
const checkAuth = async (to, _, next) => {
    const auth = getAuth();

    if (to.meta.requiresAuth) {
        if (auth.currentUser) next();
        else {
            alert("Please login first!");
            next("/login");
        }
    } else if (to.meta.preventByAuth) {
        if (auth.currentUser) {
            alert("Please logout first!");
            next("/");
        } else next();
    } else {
        next();
    }
};

router.beforeEach(checkAuth);

export default router;
