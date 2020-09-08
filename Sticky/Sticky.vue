<style lang="scss">
  @import '../assets/_variables.scss';
  .ui-sticky {
    --sticky-position-top: 0;
    --sticky-position-left: 0;
    --sticky-position-bottom: initial;
    --sticky-position-right: initial;

    --sticky-position: fixed;
    --sticky-height: min-content;
    --sticky-width: 100%;
    --sticky-background: transparent;

    position: var(--sticky-position);
    top: var(--sticky-position-top);
    left: var(--sticky-position-left);
    bottom: var(--sticky-position-bottom);
    right: var(--sticky-position-right);
    width: 100%;
    max-width: var(--sticky-width);
    height: var(--sticky-height);
    background: var(--sticky-background);
    z-index: $z-fixed;
  }
</style>

<template>
  <div class="ui-sticky" :style="_styleProps">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { onMounted, defineComponent, reactive } from 'vue'
  import styleProps from '../assets/theme/styleProps'
  export default defineComponent({
    name: 'uiSticky',
    props: {
      styleProps: {
        type: Object,
        default: () => {
          return {}
        },
      },
    },
    setup(props) {
      let _styleProps = reactive({})
      _styleProps = styleProps('sticky',props.styleProps)
      return {
        _styleProps,
      }
    },
  })
</script>
