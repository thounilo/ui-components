<style lang="scss">

  @import '../assets/_variables.scss';

  $container-size: 1.5em;
  $checkmark-size: 50%;

  .ui-checkbox {

    --size: 1.25em;
    --checkmark-size: 50%;

    position: relative;
    display: inline-flex;
    flex-direction: row-reverse;
    align-items: center;
    cursor: pointer;

    &__container {
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: var(--size);
      height: var(--size);
      background: #ccc;
      border-radius: #{map-get($border-radius, 'sm')};
      cursor: pointer;

      svg {
        width: var(--checkmark-size);
        height: var(--checkmark-size);
        fill: var(--ui-c-light);
        animation: checkbox-leave 200ms both;
      }
      svg.isChecked {
        animation: checkbox-appear 200ms both;
      }
      &.isChecked {
        background: var(--ui-c-primary);
      }
      &:hover {
        box-shadow: 0 0 0 $state-active-border-width $state-active-border;
      }
      &:focus-within {
        box-shadow: 0 0 0 $state-active-border-width $state-active-border;
      }
    }
    &__label {
      margin-left: .5em;
      vertical-align: bottom;
      cursor: pointer;
    }
    &__label:hover ~ &__container {
      box-shadow: 0 0 0 $state-active-border-width $state-active-border;
    }
  }

  .ui-checkbox input {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0;
    width: 100%;
    height: 100%;
    margin: 0;
  }


  @keyframes checkbox-appear {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    60% {
      transform: scale(1.2);
    }
    80% {
      transform: scale(.9)
    }
    100% {
      transform: scale(1);
      opacity: 1
    }
  }

  @keyframes checkbox-leave {
    100% {
      transform: scale(0);
      opacity: 0
    }
  }

</style>

<template>

  <div class="ui-checkbox">
    <label class="ui-checkbox__label" :for="uuid">{{ label }}</label>
    <label :class="[
      'ui-checkbox__container',
      computedClass
    ]"
     :for="uuid"
     tabindex
    >
      <input
        :id="uuid"
        name="checkbox"
        type="checkbox"
        :value="value"
        ref="input"
        v-on:input="handleChange($event)"
      />
      <svg :class="computedClass" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" width="24" height="24" viewBox="0 0 24 24">
        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
      </svg>
    </label>
  </div>

</template>

<script>

  import { minihash } from "../assets/utils";

  export default {
    name: "ui-checkbox",
    inheritAttrs: false,
    data() {
      return {
        isChecked: null
      }
    },
    props: {
      value: Boolean,
      label: String
    },
    computed: {
      uuid() {
        return minihash(8, 'lu')
      },
      computedClass() {
        return this.isChecked ? 'isChecked' : ''
      },
    },
    methods: {
      handleChange({target}) {
        this.$emit('input', target.checked)
        this.isChecked = target.checked
      }
    }
  }

</script>