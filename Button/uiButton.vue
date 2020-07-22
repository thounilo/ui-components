<style lang="scss">

  @import '../assets/_variables.scss';
  @import '../assets/_common.scss';

  $gap: .35em;
  $transition-duration: 300ms;

  .ui-button {

    --width: auto;

    --color: var(--ui-c-light);
    --background: var(--ui-c-primary);

    --border: none;
    --border-radius: #{$b-r-sm};

    --padding: #{$button-padding};

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    padding: var(--padding);
    color: var(--color);
    background: var(--background);
    border: var(--border);
    border-radius: var(--border-radius);
    font-family: var(--ui-font);
    overflow: hidden;

    @extend %scales-common;

    @include pseudo-states-for-interactive-element();

    & > *:nth-child(2) {
      margin-left: $gap;
      margin-right: $gap;
    }
  }

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
    &--square {
      --padding: .5em;
    }
    &--reverse {
      & > *:nth-child(2) {
        order: 1;
      }
      & > *:nth-child(1) {
        order: 2;
        margin-left: $gap;
      }
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
      <span class="inline-block z-5 uppercase" v-if="text">{{ text }}</span>
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
      fluid: Boolean,
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
          'ui-button--square': this.icon && !this.text,
          'ui-button--fluid': this.fluid
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