<template>
    <div class="Footer">
        <div class="FooterContainer">
            <div class="FooterContainer__icon">
                <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="36px"
                    color="white"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    ></path>
                </svg>
                <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="36px"
                    color="white"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                </svg>
                <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="36px"
                    color="white"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    ></path>
                </svg>
            </div>
            <div class="FooterContainer__text">
                <h4>This website is part of ICCS340 project</h4>
                <h5>Mahidol University International College</h5>
                <p>*Only support screen width > 1080px</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.Footer {
    background-color: var(--darkPurple);
}
.FooterContainer {
    position: sticky;
    bottom: 0;
    display: flex;
    flex-direction: column;
    padding: 16px 12px;
    margin: 0 auto;
    &__icon {
        display: flex;
        flex-direction: row;
        align-items: center;
        align-self: center;
        column-gap: 32px;
        margin: 0 0 2rem 0;
    }
    &__text {
        color: white;
        p {
            margin-top: 12px;
            font-size: 14px;
        }
    }
}
</style>
