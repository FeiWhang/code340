<template>
    <div class="Header" :style="style">
        <div class="HeaderContainer">
            <router-link class="HeaderLogo" to="/" exact>
                <h1>Code340</h1>
            </router-link>
            <div class="HeaderView">
                <router-link
                    class="HeaderView__link"
                    active-class="active"
                    exact
                    to="/"
                >
                    <span>Home</span>
                </router-link>
                <router-link
                    class="HeaderView__link"
                    active-class="active"
                    exact
                    to="/product"
                >
                    <span>Product</span>
                </router-link>
                <router-link
                    class="HeaderView__link"
                    active-class="active"
                    exact
                    to="/sell"
                >
                    <span>Seller</span>
                </router-link>
                <profile-dropdown />
            </div>
        </div>
    </div>
</template>

<script>
import ProfileDropdown from "./ProfileDropdown.vue";

export default {
    components: { ProfileDropdown },
    name: "Header",
    props: {
        isHome: {
            default: false,
            type: Boolean,
        },
    },
    data() {
        return {
            scrollPosition: 0,
        };
    },
    methods: {
        updateScroll() {
            this.scrollPosition = window.scrollY;
        },
    },
    mounted() {
        window.addEventListener("scroll", this.updateScroll);
    },
    computed: {
        style() {
            return {
                "--headerPadding": this.scrollPosition > 30 ? "8px" : "24px",
                "--headerBgColor": this.isHome
                    ? this.scrollPosition > 30
                        ? "var(--darkPurple)"
                        : "transparent"
                    : "white",
                "--logoGradient": this.isHome
                    ? "linear-gradient(45deg, #bdbdbd, #ffffff)"
                    : "linear-gradient(45deg, var(--darkPurple), var(--lightPurple))",
                "--textColor": this.isHome ? "white" : "black",
                "--hoverColor": this.isHome
                    ? "rgba(255, 255, 255, 0.1)"
                    : "var(--purpleHover)",
                "--activeColor": this.isHome
                    ? "rgba(255, 255, 255, 0.3)"
                    : "var(--purple)",
                "--activeTextColor": this.isHome ? "var(--greyHover)" : "white",
                "--border": this.isHome ? "none" : "2px solid var(--greyHover)",
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.Header {
    z-index: 100;
    background-color: var(--headerBgColor);
    backdrop-filter: blur(18.88px);
    position: fixed;
    margin: auto;
    width: 100%;
    top: 0;
    padding: var(--headerPadding) 0;
    transition: all 0.3s ease;
    border-bottom: var(--border);
}
.HeaderContainer {
    display: flex;
    width: var(--layoutWidth);
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
}
.HeaderLogo {
    text-decoration: none;
    color: var(--purple);
    font-size: 24px;
    h1 {
        padding: 0;
        margin: 0;
        background-image: var(--logoGradient);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
    }
}
.HeaderView {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__link {
        text-decoration: none;
        color: var(--textColor);
        margin: 0 12px;
        line-height: 24px;
        padding: 4px 16px;
        width: 69px;
        border-radius: 24px;
        letter-spacing: 0.2px;
        font-size: 16px;
        font-weight: 500;
        transition: all 0.2s ease-in-out;
        &:hover {
            background-color: var(--hoverColor);
        }
        &.active {
            color: var(--activeTextColor);
            background-color: var(--activeColor);
        }
    }
}
</style>
