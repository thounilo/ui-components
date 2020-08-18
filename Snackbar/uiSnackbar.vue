<style lang="scss">
  @import '../assets/_variables.scss';

  .ui-snackbar {
    --position: fixed;
    --height: 3em;
    --snackbar-scale: 1;
    position: var(--position);
    bottom: calc(var(--height) * -1);
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    align-items: center;
    min-height: 3em;
    max-width: 16em;
    width: 100%;
    padding: 0 1em;
    background: #222;
    color: var(--ui-c-light);
    font-size: calc(var(--snackbar-scale) * 1em);
    border-radius: var(--ui-border-radius-small);
    transition: transform 300ms ease-in-out;
    z-index: $z-fixed + 10;
    &__close {
      position: absolute;
      top: 0.5em;
      right: 0.5em;
      display: flex;
      align-items: center;
      padding: 0.5em;
      border-radius: var(--ui-border-radius-circle);
      transition: background 180ms;
      &:hover {
        background: $state-hover;
        cursor: pointer;
      }
    }
    &--show {
      transform: translate(-50%, -4em);
    }
  }
</style>

<template>
  <div :class="computedClass" :style="_styleProps">
    <div>
      {{ content }}
    </div>
    <div class="ui-snackbar__close" @click="hideSnackbar">
      <ui-icon size="4" icon="close" />
    </div>
  </div>
</template>

<script lang="ts">
  import { uiIcon } from '../index'
  import { defineComponent, ref, computed, watch } from 'vue'
  import styleProps from '../assets/styleProps'

  export default defineComponent({
    name: 'ui-snackbar',
    components: { uiIcon },
    props: {
      modelValue: {
        type: Boolean,
        default: false,
      },
      content: {
        type: String,
        default: '',
      },
      timeout: {
        type: Number,
        default: 4000,
      },
      persistent: {
        type: Boolean,
        default: false,
      },
      styleProps: {
        type: Object,
        default: () => {
          return {}
        },
      },
    },
    setup(props, { emit }) {
      let timeout: number | null

      let isVisible = computed({
        get: () => props.modelValue,
        set: value => emit('update:modelValue', value),
      })

      const hideSnackbar = () => {
        isVisible.value = false
        timeout = null
      }

      const showSnackbar = (bool: boolean) => {
        if (!bool) return

        if (timeout) {
          clearTimeout(timeout)
        }

        if (!props.persistent) {
          timeout = setTimeout(hideSnackbar, props.timeout)
        }
      }

      watch(
        () => isVisible.value,
        (bool: boolean) => {
          showSnackbar(bool)
        }
      )
      const _styleProps = styleProps(props.styleProps, 'snackbar')
      const computedClass = computed(() => {
        return {
          'ui-snackbar': true,
          'ui-snackbar--show': isVisible.value,
        }
      })

      return {
        hideSnackbar,
        computedClass,
        _styleProps,
      }
    },
  })
</script>
