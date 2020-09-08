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
    background: var(--ui-theme-background);
  }

  .light {
    --ui-c-primary: red
  }
  
</style>

<template>
  <div :class="['ui-app', env.isDark ? '' : 'light']">
    <slot></slot>
  </div>
</template>

<script lang="ts">


  import {
    defineComponent,
    onMounted,
    onUnmounted,
    provide,
    reactive,
  } from 'vue'

  import { buildBaseProps, colorClasses } from '../assets/theme/cssProps'
  import css from '../assets/theme/css'
  import theme from '../assets/theme/theme'
  import {env} from '../assets/theme/theme'


  export default defineComponent({
    name: 'uiApp',
    setup() {

      let themeProvider = reactive(theme)
      provide('theme', themeProvider)
      console.log('THEME: ', themeProvider )
      const updateViewportHeightUnit = () => {
        document.documentElement.style.setProperty(
          '--vh',
          `${window.innerHeight * 0.01}px`
        )
      }

      const _css = css('ui-app')

      const buildCSS = () => {
        let body = document.documentElement
        _css.insert(':root', buildBaseProps())
        let colors = colorClasses()
        for(let entries of colors.entries()) {
          const prop  = entries[0].slice(5)
          _css.insert(`.${prop}`, {color: entries[1]})
        }
      }

      onMounted(() => {
        buildCSS()
        updateViewportHeightUnit()
        window.addEventListener('resize', updateViewportHeightUnit)
      })

      onUnmounted(() => {
        window.removeEventListener('resize', updateViewportHeightUnit)
      })

      return {
        updateViewportHeightUnit,
        env
      }
    },
  })
</script>
