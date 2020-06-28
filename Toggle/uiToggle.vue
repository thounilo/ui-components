<style lang="scss">

  @import '../assets/_variables.scss';

  .ui-toggle {

    --width: 2.6em;
    --height: 1.25em;
    --cursor-size: calc(var(--height) * .75);
    --cursor-start: .2em;
    --color-checked: var(--ui-c-primary);
    --color-unchecked: var(--ui-c-light);
    --color-background: #ccc;
    --transition-duration: 300ms;

    position: relative;
    display: inline-block;
    width: var(--width);
    height: var(--height);

    &:focus-within > &__slider{
      box-shadow: 0 0 0 .2em $state-active-border;
    }

    &__slider {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--color-background);
      border-radius: var(--height);
      transition: var(--transition-duration);
      cursor: pointer;
    }

    &__slider:before {
      content: "";
      position: absolute;
      left: var(--cursor-start);
      top: calc(( var(--height) - var(--cursor-size)) / 2);
      width: var(--cursor-size);
      height: var(--cursor-size);
      background-color: var(--color-unchecked);
      border-radius: var(--height);
      transition: var(--transition-duration);
    }

    &__label {
      cursor: pointer;
      margin-left: .5em;
      display: inline-block;
      vertical-align: bottom;
    }

    input:checked + &__slider {
      background-color: var(--color-checked);
    }

    input:checked + &__slider:before {
      transform: translateX( calc( var(--width) - var(--cursor-size) - (var(--cursor-start)*2)));
    }

    & input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  }

</style>

<template>

  <div>
    <label class="ui-toggle">
      <input
        :id="uuid"
        @input="$emit('input', $event)"
        type="checkbox"
        :value="value"
      />
      <span class="ui-toggle__slider"></span>
    </label>
    <label class="ui-toggle__label" :for="uuid">{{ label }}</label>
  </div>

</template>

<script>

  import { minihash } from "../assets/utils";

  export default {
    name: "ui-toggle",
    props: { value: Boolean, label: String },
    computed: {
      uuid() {
        return minihash(8, 'lu')
      },
    },
  }

</script>