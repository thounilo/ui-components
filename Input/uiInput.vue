<style lang="scss">

  @import '../assets/_variables.scss';

  $message-font-size: .75em;
  $placeholder-color: #dbdbdb;
  $placeholder-size: .8em;

  .ui-input {

    --height: #{$input-text-height};
    --width:  #{$input-text-width};
    --border-radius: var(--ui-border-radius-sm);
    --border: none;
    --background: var(--ui-c-primary);
    --color:      var(--ui-c-light);

    width: 100%;
    max-width: var(--width);
    color: var(--color);

    &__element {

      position: relative;
      width: 100%;
      min-height: var(--height);
      padding: #{$input-text-padding};
      color: currentColor;
      background: var(--background);
      border-radius: var(--border-radius);
      font-family: var(--ui-font);
      font-size: 1em;

      &:focus,
      &:hover {
        box-shadow: $state-active-box-shadow;
      }

      &::placeholder {
        color: $placeholder-color;
        font-size: $placeholder-size;
      }
    }

    &__icon {
      position: absolute;
      right: .5em;
      top: 50%;
      transform: translateY(-50%)
    }

    &__label {
      display: block;
      margin-bottom: .5em;
    }

    &__message {
      font-size: .75em;
      margin-top: .5em;
      font-style: italic;
      display: inline-block;
    }
  }

  .ui-input {

    &--tiny   { --size: var(--ui-size-tiny);  }
    &--small  { --size: var(--ui-size-small); }
    &--medium { --size: var(--ui-size-medium);}
    &--large  { --size: var(--ui-size-large); }
    &--giant  { --size: var(--ui-size-giant); }

    &--ghost,
    &--outline {
      input {
        --color: var(--ui-c-light);
        --background: hsla(0, 0%, 50%, .1);
      }
    }

    &--outline {
      --border: #{$base-border-width} solid var(--ui-c-primary);
      & input {
        border: var(--border);
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

    <slot name="label" >
      <label class="ui-input__label" v-if="label" :for="computedID">
        {{label}}
      </label>
    </slot>

    <div class="relative">
      <input
        class="ui-input__element"
        :list="list"
        :id="computedID"
        :type="type"
        :placeholder="placeholder"
        :validate="validate"
        :autofocus="autofocus"
        :required="required"
        :disabled="disabled"
        :value="value"
        v-on:input="$emit('input', $event.target.value)"
        ref="uiElement"
      />

      <slot name="input-icon">
        <uiIcon class="ui-input__icon"
          v-if="hasIcon"
          @click="handleIconClick"
          :icon="icon"
          :size="iconSize"
        />
      </slot>
    </div>

    <span class="ui-input__message" v-if="message">
      {{message}}
    </span>

  </div>

</template>

<script>

  import { minihash } from '../assets/utils.js'

  export default {
    name: "ui-input",
    components: { uiIcon: () => import('../Icon/uiIcon.vue') },
    props: {
      type: {
        type: String,
        default: 'text',
        validator: type => [
          'text',
          'password',
          'email',
          'url',
          'tel',
          'search',
        ].some(t => t === type)
      },
      for: {
        type: String,
      },
      //* Layout
      label: {
        type: String,
        default: ''
      },
      message: {
        type: String,
        default: ''
      },

      icon: {
        type: String,
      },
      iconSize: {
        type: [Number, String],
        default: 5
      },

      // TODO
      //* Theme
      light: Boolean,
      outline: Boolean,
      ghost: Boolean,

      //* Sizes?
      tiny: Boolean,
      small: Boolean,
      medium: Boolean,
      large: Boolean,
      giant: Boolean,

      //* Attrs
      placeholder: {
        type: String,
        default: ''
      },
      validate: {
        type: Boolean,
        default: false
      },
      autofocus: {
        type: Boolean,
        default: false
      },
      required: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      id: {
        type: String
      },
      list: {
        type: String
      },

      //* State
      value: {
        type: String
      },
      // TODO
      state: {
        type: Boolean,
        default: null
      },
    },
    computed: {
      computedClasses() {
        return {
          'ui-input': true,
          'ui-input__light': !!this.light,
          'ui-input--with-icon': !!this.icon,
          'ui-input--outline': !!this.outline,
          'ui-input--ghost': !!this.ghost,

          'ui-input--tiny': !!this.tiny,
          'ui-input--small': !!this.small,
          'ui-input--medium': !!this.medium,
          'ui-input--large': !!this.large,
          'ui-input--giant': !!this.giant,
        }
      },
      uuid() {
        return this.id ? this.id : minihash(8, 'lu')
      },
      hasIcon() {
        return !!this.icon
      },
      computedID() {
        if(this.for) {
          return this.for
        }
        return this.uuid
      }
    },
    methods: {
      handleIconClick(e) {
        console.log('e', e)
        this.$emit('click:icon', e)
      }
    }
  }
</script>