<style lang="scss">
  @import '../assets/_variables.scss';

  .ui-overlay {
    --overlay-position: fixed;
    --overlay-position-top: 0;
    --overlay-position-left: 0;
    --overlay-position-bottom: initial;
    --overlay-position-right: initial;

    position: var(--overlay-position);
    top: var(--overlay-position-top);
    left: var(--overlay-position-left);
    bottom: var(--overlay-position-bottom);
    right: var(--overlay-position-right);
    width: 100%;
    height: 100%;
  }

  //? maybe some classes for background fade and similar transition effects
</style>

<template>
  <div class="ui-overlay" v-show="isActive" :style="_styleProps">
    <slot
      v-bind="{
        isActive,
        disable: disableOverlay,
        activate: activateOverlay,
      }"
    ></slot>
  </div>
</template>

/** * Simple overlay * */

<script lang="ts">
  import { defineComponent, computed, onMounted, onBeforeUnmount } from 'vue'
  import styleProps from '../assets/theme/styleProps'

  export default defineComponent({
    name: 'ui-overlay',
    props: {
      modelValue: {
        type: Boolean,
        default: false,
      },
      closeOnEsc: {
        type: Boolean,
        default: true,
      },
      delay: {
        type: Number,
        default: 0,
      },
      styleProps: {
        type: Object,
        default: () => {
          return {}
        },
      },
    },
    setup(props, { emit }) {
      let isActive = computed({
        get: () => props.modelValue,
        set: value => emit('update:modelValue', value),
      })
      const _styleProps = styleProps('overlay', props.styleProps )
      const activateOverlay = () => (isActive.value = true)
      const disableOverlay = () => {
        if (props.delay) {
          setTimeout(() => {
            isActive.value = false
          }, props.delay)
        } else {
          isActive.value = false
        }
      }

      const escListener = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
          disableOverlay()
        }
      }
      onMounted(() => {
        if (props.closeOnEsc) {
          window.addEventListener('keyup', escListener)
        }
      })
      onBeforeUnmount(() => {
        if (props.closeOnEsc) {
          window.removeEventListener('keyup', escListener)
        }
      })
      return {
        isActive,
        activateOverlay,
        disableOverlay,
        _styleProps,
      }
    },
  })
</script>
