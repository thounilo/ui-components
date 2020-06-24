<style lang="scss">

  @import '../../assets/_variables.scss';

  $button-height: 2.25rem;
  $button-padding: .25rem .75rem;
  $button-background: var(--BASE-PRIMARY);
  $button-color: #FFF;
  // $button-border-radius: $theme-border-radius;
  $button-border-radius: 10em;
  .ui-button {

    --height: #{$button-height};
    --width: initial;
    --background: #{$button-background};
    --border: 2px solid transparent;
    --color: #{$button-color};

    display: flex;
    align-items: center;
    height: var(--height);
    width: var(--width);
    padding: $button-padding;
    background: var(--background);
    color: var(--color);
    border: var(--border);
    border-radius: #{$button-border-radius};
    transition: var(--BASE-TRANSITION-BACKGROUND);
    cursor: pointer;

    & > *:nth-child(2) {
      margin-left: .5em;
    }

    &__text {
      display: inline-block;
    }
    &:focus {
      outline: none;
    }
    &:active {
      background: var(--BASE-PRIMARY-DARKER);
      transition: all 300ms ;
    }
  }
  .ui-button--reverse {
    & > *:nth-child(2) {
      order: 1;
    }
    & > *:nth-child(1) {
      order: 2;
      margin-left: .5em;

    }
  }
</style>

<template>
  <button :class="computedClasses" v-on="$listeners">
    <slot name="icon">
      <ui-icon v-if="icon" :icon="icon" :size="iconSize" />
    </slot>
    <slot>
      <span class="ui-button__text">{{computedText}}</span>
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
      }

    },
    computed: {
      computedText() {
        return this.text.toUpperCase()
      },
      computedClasses() {
        return {
          'ui-button': true,
          'ui-button--reverse': this.iconRight
        }
      }
    },
  }
</script>