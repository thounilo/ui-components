<style lang="scss">
  @import '../assets/_variables.scss';

  .ui-radio {

    --radio-size: calc(var(--radio-scale, 1) * 1.25em);
    --radio-checkmark-size: calc(var(--radio-size, 1) * 0.7);

    display: inline-flex;
    flex-direction: row-reverse;
    align-items: center;

    &__label {
      margin-left: 0.5rem;
      font-size: calc(var(--radio-scale) * 1em);
    }
    &__input {
      position: relative;
      width: var(--radio-size);
      height: var(--radio-size);
      background: var(--radio-background);
      border-radius: var(--radio-border-radius);
      transition: box-shadow 180ms;
      flex: 1 0 auto;

      &:hover,
      &:focus-within {
        box-shadow: var(--state-active-shadow);
      }
    }
    &__label,
    &__input {
      cursor: pointer;
    }

    &__label:hover ~ &__input {
      box-shadow: var(--state-active-shadow);
    }

    &__checkmark {
      position: absolute;
      top: 50%;
      left: 50%;
      width: var(--radio-checkmark-size);
      height: var(--radio-checkmark-size);
      border-radius: var(--radio-border-radius);
      transform: translate(-50%, -50%) scale(0.5);
      transition: all 180ms ease-in-out;
      &._checked {
        background: var(--ui-c-primary);
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
</style>

<template>
  <div class="ui-radio">
    <label :class="['ui-radio__label', labelClass]" :for="uuid">{{ label }}</label>
    <label class="ui-radio__input" :for="uuid">
      <input
        class="hide-input"
        type="radio"
        v-bind="$attrs"
        :id="uuid"
        :value="label"
        :checked="modelValue === label"
        @input="$emit('update:modelValue', label)"
      />
      <div
        :class="[
          'ui-radio__checkmark',
          checkmarkClass,
        ]"
      ></div>
    </label>
  </div>
</template>

<script lang="ts">

  import { minihash } from '../assets/utils.js'
  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'uiRadio',
    props: {
      modelValue: String,
      label: {
        type: String,
        required: true,
      },
    },
    setup(props, { emit }) {

      const labelClass = computed(() => props.modelValue === props.label ? 'c-primary' : '')
      const checkmarkClass = computed(() => props.modelValue === props.label ? '_checked' : '')

      return {
        uuid: minihash(8, 'lu'),
        foo: props.modelValue === props.label ? 'c-primary' : '',
        labelClass,
        checkmarkClass,
      }
    },
  })
</script>
