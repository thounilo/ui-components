<style lang="scss">
  @import '../assets/_variables.scss';

  .ui-checkbox {
    --scale: 1;
    --input-size: calc(var(--scale) * 1.25em);
    --checkmark-size: calc(var(--input-size) * 0.7);
    --border-radius: var(--ui-border-radius-sm);

    display: inline-flex;
    flex-direction: row-reverse;
    align-items: center;

    &__label {
      margin-left: 0.5em;
      font-size: calc(var(--scale) * 1em);
    }
    &__input {
      position: relative;
      width: var(--input-size);
      height: var(--input-size);
      background: var(--ui-c-light-subtle);
      border-radius: var(--border-radius);

      &:hover,
      &:focus-within {
        box-shadow: $state-active-box-shadow;
      }
    }
    &__input,
    &__label {
      cursor: pointer;
    }
    &__label:hover ~ &__input {
      box-shadow: $state-active-box-shadow;
    }
    &__checkmark {
      position: absolute;
      top: 50%;
      left: 50%;
      width: var(--checkmark-size);
      height: var(--checkmark-size);
      transform: translate(-50%, -50%) scale(0.5);
      border-radius: var(--border-radius);
      transition: all 180ms ease-in-out;
    }
    &--is-checked {
      background: var(--ui-c-primary);
      transform: translate(-50%, -50%) scale(1);
    }
  }
</style>

<template>
  <div class="ui-checkbox">
    <label class="ui-checkbox__label" :for="uuid">{{ label }}</label>
    <label class="ui-checkbox__input" :for="uuid">
      <input
        class="hide-input"
        :value="value"
        :id="uuid"
        type="checkbox"
        @input="handleChange($event)"
      />
      <div
        :class="[
          'ui-checkbox__checkmark',
          isChecked ? 'ui-checkbox--is-checked' : '',
        ]"
      ></div>
    </label>
  </div>
</template>

<script>
  import { minihash } from '../assets/utils'

  export default {
    name: 'ui-checkbox',
    inheritAttrs: false,
    data() {
      return {
        isChecked: null,
      }
    },
    props: {
      value: Boolean,
      label: String,
      checked: Boolean,
    },
    computed: {
      uuid() {
        return minihash(8, 'lu')
      },
    },
    methods: {
      handleChange({ target }) {
        this.isChecked = target.checked
        this.$emit('input', target.checked)
      },
    },
  }
</script>
