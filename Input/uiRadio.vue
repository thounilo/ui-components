<style lang="scss">
  @import '../assets/_variables.scss';

  .ui-radio {
    --scale: 1;
    --input-size: calc(var(--scale) * 1.25em);
    --checkmark-size: calc(var(--input-size) * 0.7);
    --border-radius: var(--ui-border-radius-circle);

    display: inline-flex;
    flex-direction: row-reverse;
    align-items: center;

    &__label {
      margin-left: 0.5rem;
      font-size: calc(var(--scale) * 1em);
    }
    &__input {
      position: relative;
      width: var(--input-size);
      height: var(--input-size);
      background: var(--ui-c-light-subtle);
      border-radius: var(--border-radius);
      transition: box-shadow 180ms;
      flex: 1 0 auto;

      &:hover,
      &:focus-within {
        box-shadow: $state-active-box-shadow;
      }
    }
    &__label,
    &__input {
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
      border-radius: var(--border-radius);
      transform: translate(-50%, -50%) scale(0.5);
      transition: all 180ms ease-in-out;
    }
    &--is-checked {
      background: var(--ui-c-primary);
      transform: translate(-50%, -50%) scale(1);
    }
  }
</style>

<template>
  <div class="ui-radio">
    <label class="ui-radio__label" :for="uuid">{{ label }}</label>
    <label class="ui-radio__input" :for="uuid">
      <input
        class="hide-input"
        :value="label"
        :id="uuid"
        type="radio"
        :name="name"
        :checked="isChecked"
        @input="handleChange"
      />
      <div
        :class="[
          'ui-radio__checkmark',
          isChecked ? 'ui-radio--is-checked' : '',
        ]"
      ></div>
    </label>
  </div>
</template>

<script>
  import { minihash } from '../assets/utils'

  export default {
    name: 'ui-radio',
    props: {
      label: {
        type: String,
        required: true,
      },
      value: String,
      name: String,
    },
    data() {
      return {
        isChecked: this.value,
      }
    },
    computed: {
      uuid() {
        return minihash(8, 'lu')
      },
    },
    methods: {
      handleChange() {
        this.$emit('input', this.label)
      },
    },
    watch: {
      value(val) {
        this.isChecked = this.value === this.label
      },
    },
  }
</script>
