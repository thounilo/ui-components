<style lang="scss">

  @import '../../assets/_variables.scss';

  .ui-input {

    --height: #{map-get($input-text, 'height')};
    --width:  #{map-get($input-text, 'width')};

    --border-radius: var(--BASE-BORDER-RADIUS);
    --border-color:  var(--BASE-BORDER-COLOR);
    --border-width:  var(--BASE-BORDER-WIDTH);

    --background: var(--BASE-PRIMARY);
    --color:      var(--BASE-LIGHT);

    width:     100%;
    max-width: var(--width);

    color: var(--color);

    & input {

      width: 100%;
      height: var(--height);
      padding: .25rem .5rem;

      color: currentColor;
      background: var(--background);
      border: var(--border-width) solid var(--border-color);
      border-radius: var(--border-radius);

      font-family: var(--BASE-FONT);
      transition: var(--BASE-TRANSITION-BACKGROUND);

      &:focus {
        background: var(--BASE-PRIMARY-DARKER);
        outline: none;
        transition: var(--BASE-TRANSITION-BACKGROUND);
      }

      &::placeholder {
        color: #dbdbdb;
        font-size: .75rem;
      }
    }

    & label {
      display: block;
      margin-bottom: .5rem;
      font-weight: bold;
      font-size: .8rem;
    }

    &__message {
      font-size: .6rem;
      margin-top: .5rem;
      font-style: italic;
      display: inline-block;
    }

    &__icon {
      position: absolute;
      right: .5rem;
      top: 50%;
      transform: translateY(-50%)
    }

    &--has-icon {
      & input {
        padding-right: 2.25rem;
      }
    }

  //* Try styles
    &--outline {
      --border-color: var(--BASE-PRIMARY);
      --background: transparent;
    }
  //* End
  }

  .ui-input__light {
    --background: var(--THEME-COLOR);
    --color: #FFF;
  }

</style>

<template>

  <div :class="computedClasses">

    <slot name="label" >
      <label v-if="label" :for="computedId">
        {{label}}
      </label>
    </slot>

    <div class="relative">
      <input
        :id="computedId"
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

      <slot name="input-icon" >
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

  import { minihash } from '../../assets/utils.js'

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
      light: {
        type: Boolean,
        default: false
      },
      outline: {
        type: Boolean,
        default: false
      },

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
        console.log('this.outline', this.outline)
        return {
          'ui-input': true,
          'ui-input__light': !!this.light,
          'ui-input--has-icon': !!this.icon,
          'ui-input--outline': !!this.outline,
        }
      },
      computedId() {
        return this.id ? this.id : minihash(8, 'lu')
      },
      hasIcon() {
        return !!this.icon
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