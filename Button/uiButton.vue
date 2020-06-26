<style lang="scss">

  @import '../assets/_variables.scss';

  $gap: .35em;
  $transition-duration: 300ms;

  .ui-button {

    --size: 1em;
    --color: var(--ui-c-light);
    --background: var(--ui-c-primary);
    --border: none;
    --border-radius: #{map-get($border-radius, 'sm')};

    font-size: var(--size);
    position: relative;
    display: flex;
    align-items: center;
    width: initial;
    height: $button-height;
    padding: $button-padding;
    color: var(--color);
    background: var(--background);
    border: var(--border);
    border-radius: var(--border-radius);
    font-family: var(--ui-font);
    cursor: pointer;
    transition: all $transition-duration;

    &:hover::before {
      background: $state-hover;
    }

    &:focus::before {
      background: $state-active;
      box-shadow: 0 0 0 .1em $state-active-border;
    }

    &:active::before {
      background: $state-active;
    }

    &:active {
      animation: interaction $transition-duration forwards;
    }

    &:disabled {
      background: $state-disabled;
      color: $state-disable-color;
    }

    & > *:nth-child(2) {
      margin-left: $gap;
      margin-right: $gap;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: transparent;
      z-index: 2;
      border-radius: var(--border-radius);
    }
  }

  //* Sizes
  .ui-button {
    &--tiny {
      --size: var(--ui-size-tiny);
    }
    &--small {
      --size: var(--ui-size-small);
    }
    &--medium {
      --size: var(--ui-size-medium);
    }
    &--large {
      --size: var(--ui-size-large);
    }
    &--giant {
      --size: var(--ui-size-giant);
    }
  }

  //* Variants
  .ui-button {
    &--outline, &--ghost {
      --color: var(--ui-c-primary);
      --background: transparent;
    }

    &--outline {
      --border: #{$base-border-width} solid var(--ui-c-primary);
    }

    &--ghost {
      --border: none;
    }
  }

  .ui-button--reverse {
    & > *:nth-child(2) {
      order: 1;
    }
    & > *:nth-child(1) {
      order: 2;
      margin-left: $gap;
    }
  }

  @keyframes interaction {
    50% {
      transform: translateY( calc( var(--size) * .05)) scale(.99);
    }
  }

</style>

<template>
  <button :class="computedClasses" v-on="$listeners">
    <slot name="icon">
      <ui-icon class="z-5" v-if="icon" :icon="icon" :size="iconSize" />
    </slot>
    <slot>
      <span class="inline-block z-5 uppercase">{{ text }}</span>
    </slot>
  </button>
</template>

<script>
  export default {
    name: "ui-button",
    components: { uiIcon: () =>  import('../Icon/uiIcon') },
    props: {
      text: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      iconSize: {
        type: Number,
        default: 5
      },
      iconRight: {
        type: Boolean,
        default: false
      },

      //* Sizes?
      tiny: Boolean,
      small: Boolean,
      medium: Boolean,
      large: Boolean,
      giant: Boolean,

      //* Style
      outline: Boolean,
      ghost: Boolean
    },
    computed: {
      computedClasses() {
        return {
          'ui-button': true,
          'ui-button--tiny': this.tiny,
          'ui-button--small': this.small,
          'ui-button--medium': this.medium,
          'ui-button--large': this.large,
          'ui-button--giant': this.giant,
          'ui-button--outline': this.outline,
          'ui-button--ghost': this.ghost,
          'z-1': true
        }
      }
    },
  }
</script>