<style lang="scss">
  @import '../assets/_variables.scss';
  @import '../assets/_common.scss';

  .ui-button {
    --width: auto;
    --height: auto;
    --color: var(--ui-c-light);
    --background: transparent;

    --border: none;
    --border-radius: var(--ui-border-radius-sm);

    --padding: 0.25em 0.75em;

    --scale: 1;
    --gap: 0.35em;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;

    width: var(--width);
    height: var(--height);
    padding: var(--padding);
    color: var(--color);
    background: var(--background);
    border: var(--border);
    border-radius: var(--border-radius);
    font-family: var(--ui-font);
    font-size: calc(var(--scale) * 1em);
    overflow: hidden;

    @include interactable($hover: true, $focus: true, $active: true);

    & > *:nth-child(2) {
      margin-left: var(--gap);
      margin-right: var(--gap);
    }
  }

  .ui-button {
    &--outline,
    &--ghost {
      --color: var(--ui-c-primary);
      --background: transparent;
    }
    &--fill {
      --background: var(--ui-c-primary);
      --color: var(--ui-c-light);
    }
    &--outline {
      --border: #{$base-border-width} solid var(--ui-c-primary);
    }
    &--square {
      --padding: 0.25em;
    }
    &--fluid {
      --width: 100%;
    }
  }
</style>

<template>
  <button :class="computedClasses" v-on="$listeners">
    <slot name="icon">
      <ui-icon class="z-5" v-if="icon" :icon="icon" :size="computedIconSize" />
    </slot>
    <slot>
      <span class="inline-block uppercase" v-if="text">{{ text }}</span>
    </slot>
  </button>
</template>

<script>
  export default {
    name: 'ui-button',
    components: { uiIcon: () => import('../Icon/uiIcon') },
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
      // iconRight: Boolean,

      //* Style
      fluid: Boolean,
      outline: Boolean,
      ghost: Boolean,
      fill: Boolean,
    },
    computed: {
      computedClasses() {
        return {
          'ui-button': true,
          'ui-button--outline': this.outline,
          'ui-button--ghost': this.ghost,
          'ui-button--fill': this.fill,
          'ui-button--square': this.icon && !this.text,
          'ui-button--fluid': this.fluid,
        }
      },
      computedIconSize() {
        return typeof this.iconSize === 'string'
          ? parseInt(this.iconSize)
          : this.iconSize
      },
    },
  }
</script>
