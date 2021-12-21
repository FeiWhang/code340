<template>
    <div class="HomeHero">
        <div class="HomeHero__text">
            <h1>Online marketplace</h1>
            <h2>For itemcode, voucher, giftcard</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nostrum, dignissimos obcaecati dolor aut ad cupiditate
                consequuntur. Id, qu
            </p>
            <LinkGo
                to="/register"
                title="Get Started"
                bgColor="var(--yellow)"
                padding="6px 16px"
                elemColor="#260057"
                hoverColor="#ffc642"
            />
        </div>
        <div class="HomeHero__art">
            <img src="@/assets/home_hero.png" alt="" draggable="false" />
        </div>
    </div>
</template>

<script setup>
import LinkGo from "@/components/Shared/LinkGo";
</script>

<style lang="scss" scoped>
.HomeHero {
    padding: 8rem 12px 0 12px;
    height: 670px;
    display: flex;
    column-gap: 128px;
    align-items: center;
    justify-content: center;
    width: var(--layoutWidth);
    margin: 0 auto;
    &__text {
        color: white;
        text-align: left;
        h1 {
            font-size: 48px;
        }
        h2 {
            font-size: 32px;
            margin-bottom: 12px;
        }
        p {
            font-size: 18px;
            margin-bottom: 32px;
        }
    }
    &__art {
        img {
            width: 450px;
        }
    }
}
</style>
