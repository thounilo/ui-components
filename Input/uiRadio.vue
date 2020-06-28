<style lang="scss">

  @import '../assets/_variables.scss';

  .ui-radio {

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
      width: 100%;
      height: 100%;
      width: 50%;
      height: 50%;
      border-radius: #{map-get($border-radius, 'circle')};

      &.is-checked {
        background: var(--ui-c-primary);
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

</style>

<template>
  <div class="ui-radio">
    <label class="ui-radio__label" :for="uuid">{{ label }}</label>
    <label :for="uuid" class="ui-radio__input">
      <input
        :value="value"
        v-on:input="handleChange"
        :id="uuid"
        type="radio"
        name="ui-radio"
      >
      <span :class="[computedClass, 'ui-radio__checkmark']"></span>
    </label>
  </div>
</template>

<script>

  import { minihash } from "../assets/utils";

  export default {
    name: "ui-radio",
    props: {value: Boolean, label: String},
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
      }
    },
    methods: {
      handleChange({target}) {
        console.log('target', target)
        this.isChecked = !!target.value
        this.$emit('input', target.value)
      },
    },
  }
</script>