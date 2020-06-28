<style lang="scss">

  @import '../assets/_variables.scss';

  .ui-radio {
    // TODO Add animation to checkmark on appear
    --size: 1.25em;
    display: inline-flex;
    flex-direction: row-reverse;
    align-items: center;

    &__input {
      display: inline-block;
      position: relative;
      background: #ccc;
      width: var(--size);
      height: var(--size);
      border-radius: #{map-get($border-radius, 'circle')};
      overflow: hidden;

      &:hover, &:focus-within {
        box-shadow: 0 0 0 $state-active-border-width $state-active-border;
      }
    }

    &__label:hover ~ &__input {
      box-shadow: 0 0 0 $state-active-border-width $state-active-border;
    }

    &__checkmark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transform-origin: center center;
      width: 100%;
      height: 100%;
      width: 50%;
      height: 50%;
      border-radius: #{map-get($border-radius, 'circle')};

      &.is-checked {
        background: var(--ui-c-primary);
        animation: radio-appear 200ms;
      }
    }

    & input {
      width: 0;
      height: 0;
      margin: 0;
      opacity: 0
    }

    &__label {
      margin-left: .5em;
    }
  }

  @keyframes radio-appear {
    0% {
      transform: scale(.5) translate(-50%, -50%);
      opacity: 1;
    }
    60% {
      transform: scale(1.2) translate(-50%, -50%);
    }
    80% {
      transform: scale(.9) translate(-50%, -50%);
    }
    100% {
      transform: scale(1) translate(-50%, -50%);
      opacity: 1
    }
  }

</style>

<template>
  <div class="ui-radio">
    <label class="ui-radio__label" :for="uuid">{{ label }}</label>
    <label :for="uuid" class="ui-radio__input">
      <input
        :value="computedValue"
        v-on:input="handleChange"
        :id="uuid"
        type="radio"
        :name="name"
        :checked="isChecked"
      >
      <span :class="[computedClass, 'ui-radio__checkmark']"></span>
    </label>
  </div>
</template>

<script>

  import { minihash } from "../assets/utils";

  export default {
    name: "ui-radio",
    props: {
      valueName: String,
      value: String,
      label: {
        type: String,
        required: true
      },
      name: String
    },
    data() {
      return {
        isChecked: this.value
      }
    },
    computed: {
      uuid() {
        return minihash(8, 'lu')
      },
      computedClass() {
        return this.isChecked ? 'is-checked' : ''
      },
      computedValue() {
        return this.label
      }
    },
    methods: {
      handleChange() {
        this.$emit('input', this.computedValue)
      },
    },
    watch: {
      value(val) {
        this.isChecked = this.value === this.computedValue
      }
    }
  }
</script>