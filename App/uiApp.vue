<style lang="scss">
  @import '../assets/_utility-classes.scss';
  @import '../assets/_base.scss';

  :root {
    --vh: 1vh;
  }

  .ui-app {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    @include scrollbar();
  }
</style>

<template>
  <div class="ui-app">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'ui-app',
    mounted() {
      this.updateViewportHeightUnit()
      window.addEventListener('resize', this.updateViewportHeightUnit)
    },
    destroyed() {
      window.removeEventListener('resize', this.updateViewportHeightUnit)
    },
    methods: {
      updateViewportHeightUnit() {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
      },
    },
  }
</script>
