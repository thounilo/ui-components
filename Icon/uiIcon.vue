<style lang="scss">
  .ui-icon {
    --icon-size: 100%;
    --icon-color: currentColor;

    display: inline-block;
    width: var(--icon-size);
    height: var(--icon-size);
    fill: var(--icon-color);
  }
</style>

<template>
  <svg class="ui-icon" :style="_styleProps" v-bind="$attrs">
    <use :xlink:href="computedPath" />
  </svg>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref } from 'vue'
  import iconPath from '../assets/Icons/symbols.svg'
  import styleProps from '../assets/styleProps'

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
        default: 5,
      },
      styleProps: {
        type: Object,
        default: () => {
          return {}
        },
      },
    },
    setup(props) {
      const icon = ref()

      const computedPath = computed(() => `${iconPath}#${props.icon}`)
      const _styleProps = styleProps(props.styleProps, 'icon')
      onMounted(() => {
        icon.value.style.setProperty('--icon-size', `${props.size * 0.25}em`)
      })

      return {
        icon,
        computedPath,
        _styleProps,
      }
    },
  })
</script>
