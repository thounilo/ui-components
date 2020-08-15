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
  <svg class="ui-icon" ref="icon" v-bind="$attrs">
    <use :xlink:href="computedPath" />
  </svg>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref } from 'vue'
  //@ts-ignore
  import iconPath from '../assets/Icons/symbols.svg'

  export default defineComponent({
    name: 'ui-icon',
    props: {
      icon: {
        type: String,
        default: '',
        required: true,
      },
      size: {
        type: [Number, String],
        default: 5,
      },
    },
    setup(props) {
      const icon = ref(null)

      const computedPath = computed(() => {
        return `${iconPath}#${props.icon}`
      })
      onMounted(() => {
        let size =
          typeof props.size === 'string' ? parseInt(props.size) : props.size
        console.log('icon', icon)
        icon.value.style.setProperty('--icon-size', `${size * 0.25}em`)
      })
      return {
        icon,
        computedPath,
      }
    },
    mounted() {},
  })
</script>
