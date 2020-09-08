<style lang="scss">
  .ui-icon {
    display: inline-block;
    width: var(--icon-size, 100%);
    height: var(--icon-size, 100%);
    fill: var(--icon-color, currentColor);
  }
</style>

<template>
  <svg class="ui-icon" :style="_styleProps" v-bind="$attrs">
    <use :xlink:href="computedPath" />
  </svg>
</template>

<script lang="ts">
  //@ts-ignore
  import iconPath from '../assets/Icons/symbols.svg'
  import { computed, defineComponent, onMounted, ref } from 'vue'
  import {styleProps} from '../assets/theme/styleProps'

  export default defineComponent({
    name: 'ui-icon',
    props: {
      icon: {
        type: String,
        default: '',
        required: true,
      },
      size: {
        type: Number,
        default: 0,
      },
      styleProps: {
        type: Object,
        default: () => {
          return {
          }
        },
      },
    },
    setup(props) {
      const icon = ref()
      const computedPath = computed(() => `${iconPath}#${props.icon}`)
      let _prefix = 'icon'

      let _styles = Object.assign(
        {},
        {'--size': `${props.size * .25}em`},
        props.styleProps
      )

      const _styleProps = styleProps( _prefix, _styles)

      return {
        icon,
        computedPath,
        _styleProps,
      }
    },
  })
</script>
