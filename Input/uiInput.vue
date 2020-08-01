<style lang="scss">
  @import '../assets/_variables.scss';
  @import '../assets/_common';

  $message-font-size: 0.75em;

  .ui-input {
    --height: #{$input-text-height};
    --width: #{$input-text-width};
    --border-radius: var(--ui-border-radius-sm);
    --border: none;
    --background: var(--ui-c-transparent-light-5);
    --color: var(--ui-c-light);
    --padding: #{$input-text-padding};
    --scale: 1;

    width: 100%;
    max-width: var(--width);
    color: var(--color);

    &__element {
      position: relative;
      width: 100%;
      min-height: var(--height);
      padding: var(--padding);
      color: currentColor;
      background: var(--background);
      border-radius: var(--border-radius);
      font-family: var(--ui-font);
      font-size: calc(var(--scale) * 1em);
      border: var(--border);

      &::placeholder {
        color: var(--ui-c-theme-font-subtle);
        font-size: calc(var(--scale) * 0.9em);
      }
    }

    &__input {
      @include interactable($hover: true, $focus: true);
    }

    &__icon {
      position: absolute;
      right: 0.5em;
      top: 50%;
      transform: translateY(-50%);
    }

    &__label {
      display: block;
      margin-bottom: 0.5em;
      font-size: calc(var(--scale) * 1em);
    }

    &__message {
      font-size: calc(var(--scale) * 0.75em);
      margin-top: 0.5em;
      font-style: italic;
      display: inline-block;
    }
  }

  .ui-input {
    &--outline {
      --color: var(--ui-c-light);
      --background: var(--ui-c-transparent-light-5);
      --border: #{$base-border-width} solid var(--ui-c-primary);
    }

    &--fill {
      --background: var(--ui-c-primary);
      &:focus-within {
        & input {
          z-index: 0;
        }
      }
    }
    &--with-icon {
      & input {
        padding-right: 2.25em;
      }
    }
  }
</style>

<template>
  <div :class="computedClasses">
    <slot name="label">
      <label class="ui-input__label" v-if="label" :for="computedID">{{
        label
      }}</label>
    </slot>

    <div class="ui-input__input">
      <input
        class="ui-input__element"
        :id="computedID"
        :value="value"
        :type="type"
        :placeholder="placeholder"
        :validate="validate"
        :autofocus="autofocus"
        :required="required"
        :disabled="disabled"
        :spellcheck="spellcheck"
        ref="uiElement"
        v-on:input="$emit('input', $event.target.value)"
      />

      <slot name="input-icon">
        <uiIcon
          class="ui-input__icon"
          v-if="hasIcon"
          @click="handleIconClick"
          :icon="icon"
          :size="iconSize"
        />
      </slot>
    </div>

    <span class="ui-input__message" v-if="message">{{ message }}</span>
  </div>
</template>

<script>
  import { minihash } from '../assets/utils.js'

  export default {
    name: 'ui-input',
    components: { uiIcon: () => import('../Icon/uiIcon.vue') },
    props: {
      type: {
        type: String,
        default: 'text',
        validator: type =>
          ['text', 'password', 'email', 'url', 'tel', 'search'].some(
            t => t === type
          ),
      },
      for: {
        type: String,
      },
      //* Layout
      label: {
        type: String,
        default: '',
      },
      message: {
        type: String,
        default: '',
      },

      icon: String,
      iconSize: {
        type: [Number, String],
        default: 5,
      },

      // TODO
      //* Theme
      light: Boolean,
      outline: Boolean,
      fluid: Boolean,
      fill: Boolean,

      //* Attrs
      placeholder: {
        type: String,
        default: '',
      },
      validate: Boolean,
      autofocus: Boolean,
      required: Boolean,
      disabled: Boolean,
      spellcheck: {
        type: Boolean,
        default: false,
      },
      id: String,

      //* State
      value: {
        type: String,
        default: '',
      },
      // TODO
      state: {
        type: Boolean,
        default: null,
      },
    },
    computed: {
      computedClasses() {
        return {
          'ui-input': true,
          'ui-input__light': !!this.light,
          'ui-input--with-icon': !!this.icon,
          'ui-input--outline': !!this.outline,
          'ui-input--fill': this.fill,
          'w-full': !!this.fluid,
        }
      },
      uuid() {
        return this.id ? this.id : minihash(8, 'lu')
      },
      hasIcon() {
        return !!this.icon
      },
      computedID() {
        return this.for ? this.for : this.uuid
      },
    },
    methods: {
      handleIconClick(e) {
        this.$emit('click:icon', e)
      },
    },
  }
</script>
