<style lang="scss">
  @import '../assets/_variables.scss';

  .ui-radio {
    --scale: 1;
    display: inline-flex;
    flex-direction: row-reverse;
    align-items: center;

    &__label {
      margin-left: 0.5rem;
      font-size: calc(var(--scale) * 1em);
    }
    &__input {
      position: relative;
      display: inline-block;
      background: var(--ui-c-light);
      width: calc(var(--scale) * 1.25em);
      height: calc(var(--scale) * 1.25em);
      border-radius: var(--ui-border-radius-circle);

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
      width: 70%;
      height: 70%;
      border-radius: var(--ui-border-radius-circle);
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
    <label :for="uuid" class="ui-radio__input">
      <input
        class="hide-input"
        :value="label"
        v-on:input="handleChange"
        :id="uuid"
        type="radio"
        :name="name"
        :checked="isChecked"
      />
      <div :class="['ui-radio__checkmark', isChecked ? 'ui-radio--is-checked' : '']"></div>
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
