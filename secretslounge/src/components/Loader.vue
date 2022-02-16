<template>
    <transition name="fade">
        <div
            class="loader-overlay"
            :class="{ fullscreen: fullscreen, showBackdrop: showBackdrop }"
            :style="loaderDimensions"
        >
            <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        fullscreen: {
            type: Boolean,
            default: false,
        },
        showBackdrop: {
            type: Boolean,
            default: false,
        },
        size: {
            type: Number,
            default: 64,
        },
        color: {
            type: String,
            default: '#3D2B1C',
        },
    },
    computed: {
        loaderDimensions() {
            return {
                '--loader-container-size': `${this.size * 1.25}px`,
                '--loader-spinner-size': `${this.size}px`,
                '--loader-spinner-borderWidth': `${this.size / 8}px`,
                '--loader-spinner-color': `${this.color}`,
            };
        },
    },
};
</script>

<style lang="scss">
.loader-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &.showBackdrop {
        background: rgba(255, 255, 255, 0.7);
        z-index: 20;
    }
    &.fullscreen {
        position: fixed;
        background: rgba(255, 255, 255, 0.7);
        z-index: 9999;
    }
}
.lds-ring {
    display: inline-block;
    position: relative;
    width: var(--loader-container-size);
    height: var(--loader-container-size);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    width: var(--loader-spinner-size);
    height: var(--loader-spinner-size);
    border: var(--loader-spinner-borderWidth) solid var(--loader-spinner-color);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.11, 0, 0.5, 0) infinite;
    border-color: var(--loader-spinner-color) transparent transparent
        transparent;
}
.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}
@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
