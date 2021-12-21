<template>
    <div id="app" :style="appStyle">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    computed: {
        appStyle() {
            return {
                "--lightBlue": "#90d3ef",
                "--regBlue": "#2e94cf",
                "--midBlue": "#1080c5",
                "--darkBlue": "#0e6396",
                "--blueHover": "#f5f8fc",
                "--greenHover": "#e8ffe6",
                "--greyHover": "#f3f3f3",
                "--redError": "#d84458",
                "--redHover": "#ffccd3",
                "--lightPurple": "#4219b3",
                "--purple": "#330075",
                "--darkPurple": "#121427",
                "--purpleHover": "#faf8ff",
                "--layoutWidth": "1080px",
                "--green": "#009688",
                "--yellow": "#ffb916",
            };
        },
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

@keyframes shake {
    0% {
        transform: translateX(-16px);
    }
    25% {
        transform: translateX(16px);
    }
    50% {
        transform: translateX(-8px);
    }
    75% {
        transform: translateX(8px);
    }
    100% {
        transform: translateX(-4x);
    }
}
</style>
