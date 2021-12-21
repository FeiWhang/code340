<template>
    <div class="LinkGo" :style="linkStyle">
        <a class="Link" :href="to" :target="target" rel="noopener">
            <span>
                {{ title }}
            </span>
            <div class="iconBars"></div>
        </a>
    </div>
</template>

<script>
export default {
    name: "LinkGo",

    props: [
        "to",
        "target",
        "title",
        "bgGradient",
        "bgColor",
        "elemColor",
        "fontSize",
        "padding",
        "cursor",
        "hoverColor",
    ],
    computed: {
        linkStyle() {
            return {
                "--cursor": this.cursor
                    ? this.cursor
                    : this.to === undefined
                    ? "default"
                    : "pointer",
                "--elemColor": this.elemColor,
                "--bgGradient":
                    this.bgGradient === undefined ? "none" : this.bgGradient,
                "--bgColor": this.bgColor,
                "--fontSize":
                    this.fontSize === undefined ? "16px" : this.fontSize,
                "--padding":
                    this.padding === undefined ? "6px 16px" : this.padding,
                "--hoverColor":
                    this.hoverColor === undefined ? "none" : this.hoverColor,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.LinkGo {
    width: fit-content;
}
.Link {
    cursor: var(--cursor);
    pointer-events: visible;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--elemColor);
    border-radius: 32px;
    background-image: var(--bgGradient);
    background-color: var(--bgColor);
    padding: var(--padding);
    font-size: var(--fontSize);
    font-weight: 500;
    letter-spacing: 0.2px;
    transition: opacity, background-color 0.25s ease;
    span {
        display: inline-block;
    }
    .iconBars::before,
    ::after {
        background-color: var(--elemColor);
    }
}
.Link:hover {
    background-color: var(--hoverColor);
}
.Link .iconBars {
    display: flex;
    width: 9px;
    height: 2px;
    margin: 0 0 0 8px;
    border-radius: 32px;
    transition: transform 0.3s ease, background-color 0.3s ease;
    background-color: transparent;
}

.Link .iconBars::before,
.Link .iconBars::after {
    content: "";
    position: absolute;
    width: 8px;
    height: 2px;
    margin: 0 0 0 16px;
    border-radius: 32px;
}

.Link .iconBars::before {
    transform: translateX(-16px) rotate(45deg) translateY(-3.5px);
}

.Link .iconBars::after {
    transform: translateX(-16px) rotate(-45deg) translateY(3.5px);
}

.Link:hover .iconBars {
    background-color: var(--elemColor);
    transform: translateX(3px);
}
</style>
