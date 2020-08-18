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

<script lang="ts">
  import { theme } from '../assets/theme'
  import {
    defineComponent,
    onMounted,
    onBeforeUnmount,
    provide,
    reactive,
  } from 'vue'

  export default defineComponent({
    name: 'uiApp',
    setup() {
      let themeProvider = reactive(theme)
      provide('theme', themeProvider)

      const updateViewportHeightUnit = () => {
        document.documentElement.style.setProperty(
          '--vh',
          `${window.innerHeight * 0.01}px`
        )
      }

      onMounted(() => {
        updateViewportHeightUnit()
        window.addEventListener('resize', updateViewportHeightUnit)
      })

      onBeforeUnmount(() => {
        window.removeEventListener('resize', updateViewportHeightUnit)
      })

      return {
        updateViewportHeightUnit,
      }
    },
  })
</script>
