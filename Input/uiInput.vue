<style lang="scss">
  @import '../assets/_variables.scss';
  @import '../assets/_common';

  $message-font-size: 0.75em;

  .ui-input {
    --height: auto;
    --width: 20em;
    --border-radius: var(--ui-border-radius-small);
    --border: none;
    --background: var(--ui-c-transparent-light-5);
    --color: var(--ui-c-light);
    --padding: 0.5em 0.75em;
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
        color: var(--ui-c-transparent-light-60);
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
        :value="inputValue"
        :type="type"
        :placeholder="placeholder"
        :validate="validate"
        :autofocus="autofocus"
        :required="required"
        :disabled="disabled"
        :spellcheck="spellcheck"
        @input="onInput"
        ref="uiElement"
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

<script lang="ts">
  import { minihash } from '../assets/utils'
  import { defineComponent, computed, ref } from 'vue'
  import { uiIcon } from '../index'

  export default defineComponent({
    name: 'uiInput',
    components: { uiIcon },
    props: {
      modelValue: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: 'text',
      },
      for: {
        type: String,
        default: '',
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

      //* Icon
      icon: {
        type: String,
        default: '',
      },
      iconSize: {
        type: [Number, String],
        default: 5,
      },

      //* Theme
      light: {
        type: Boolean,
        default: false,
      },
      outline: {
        type: Boolean,
        default: false,
      },
      fluid: {
        type: Boolean,
        default: false,
      },
      fill: {
        type: Boolean,
        default: false,
      },

      //* Attrs
      placeholder: {
        type: String,
        default: '',
      },
      validate: {
        type: Boolean,
        default: false,
      },
      autofocus: {
        type: Boolean,
        default: false,
      },
      required: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      spellcheck: {
        type: Boolean,
        default: false,
      },
      id: {
        type: String,
        default: '',
      },

      //* State
      state: {
        type: Boolean,
        default: null,
      },
    },
    // TODO styleProps
    setup(props, { emit }) {
      const computedClasses = computed(() => {
        return {
          'ui-input': true,
          'ui-input__light': !!props.light,
          'ui-input--with-icon': !!props.icon,
          'ui-input--outline': !!props.outline,
          'ui-input--fill': props.fill,
          'w-full': !!props.fluid,
        }
      })

      let inputValue = computed({
        get: () => props.modelValue,
        set: value => emit('update:modelValue', value),
      })

      const onInput = (e: InputEvent) => {
        inputValue.value = (<HTMLInputElement>e.target).value
      }

      const uuid = computed(() => (props.id ? props.id : minihash(8, 'lu')))

      const hasIcon = ref(!!props.icon)
      const computedID = computed(() => {
        return props.for ? props.for : uuid
      })

      const handleIconClick = (e: MouseEvent) => emit('click:icon', e)

      return {
        computedClasses,
        uuid,
        hasIcon,
        computedID,
        handleIconClick,
        onInput,
        inputValue,
      }
    },
  })
</script>
