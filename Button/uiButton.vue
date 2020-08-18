<style lang="scss">
  @import '../assets/_variables.scss';
  @import '../assets/_common.scss';

  .ui-button {
    --button-scale: 1;
    --button-gap: 0.35em;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;

    width: var(--button-width, min-content);
    height: var(--button-height, min-content);
    padding: var(--button-padding, 0.25em 0.5em);
    color: var(--button-color, var(--ui-c-light, #333));
    background: var(--button-background, transparent);
    border: var(--button-border, none);
    border-radius: var(
      --button-border-radius,
      var(--ui-border-radius-small, 0)
    );
    font-family: var(--ui-font);
    font-size: calc(var(--button-scale) * 1em);
    gap: var(--button-gap, 0);

    @include interactable($hover: true, $focus: true, $active: false);

    // box-shadow: 0.11em 0.11em 0em 0em hsla(0, 0%, 0%, 0.3);
    // transition: all 300ms;

    // &:hover {
    //   transform: translate(0.1em, 0.1em);
    //   box-shadow: 0.01em 0.01em 0em 0em hsla(0, 0%, 0%, 0.3);
    // }
    @supports not (gap: 1em) {
      & > *:nth-child(2) {
        margin-left: var(--button-gap);
        margin-right: var(--button-gap);
      }
    }
  }

  .ui-button {
    &--outline,
    &--ghost {
      --button-color: var(--ui-c-primary);
      --button-background: transparent;
    }
    &--fill {
      --button-background: var(--ui-c-primary);
      --button-color: var(--ui-c-light);
    }
    &--outline {
      --button-border: #{$base-border-width} solid var(--ui-c-primary);
    }
    &--square {
      --button-padding: 0.25em;
    }
  }
</style>

<template>
  <button
    :class="computedClasses"
    v-bind="$attrs"
    ref="buttonRef"
    :style="_styleProps"
  >
    <slot name="icon">
      <uiIcon class="z-5" v-if="icon" :icon="icon" :size="computedIconSize" />
    </slot>
    <slot>
      <span class="inline-block uppercase" v-if="text">{{ text }}</span>
    </slot>
  </button>
</template>

<script lang="ts">
  import { defineComponent, computed, onMounted, ref } from 'vue'
  import { uiIcon } from '../index'
  import { styleProps } from '../assets/styleProps'

  export default defineComponent({
    name: 'uiButton',
    components: { uiIcon },
    props: {
      text: {
        type: String,
        default: '',
      },
      icon: {
        type: String,
        default: '',
      },
      iconSize: {
        type: [Number, String],
        default: 5,
      },
      //* Scale
      scale: {
        type: [Number, String],
      },
      //* Style
      fluid: Boolean,
      outline: Boolean,
      ghost: Boolean,
      fill: Boolean,
      styleProps: {
        type: Object,
      },
    },
    setup(props) {
      const computedClasses = computed((): any => {
        return {
          'ui-button': true,
          'ui-button--outline': props.outline,
          'ui-button--ghost': props.ghost,
          'ui-button--fill': props.fill,
          'w-full': props.fluid,
        }
      })

      const computedIconSize = computed(() => {
        return typeof props.iconSize === 'string'
          ? parseInt(props.iconSize)
          : props.iconSize
      })

      //? is reactive
      const _styleProps = computed(() => {
        let p = Object.assign(
          {},
          props.styleProps ? props.styleProps : {},
          props.scale ? { scale: props.scale } : {}
        )
        return styleProps(p, 'button')
      })

      return {
        computedClasses,
        computedIconSize,
        _styleProps,
      }
    },
  })
</script>
