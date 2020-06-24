<style lang="scss">

  $transition-duration: 300ms;

  .ui-toggle {

    --width: 2.6em;
    --height: 1.25em;
    --cursor-size: calc(var(--height) * .8);
    --cursor-start: .2em;
    --color-checked: var(--BASE-PRIMARY);
    --color-unchecked: var(--BASE-LIGHT);
    --color-background: #ccc;
    --transition-duration: 300ms;

    position: relative;
    display: inline-block;
    width: var(--width);
    height: var(--height);

    input:checked + &__slider {
      background-color: var(--color-checked);
    }

    input:checked + &__slider:before {
      transform: translateX( calc( var(--width) - var(--cursor-size) - (var(--cursor-start)*2)));
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
      bottom: calc((var(--height) - var(--cursor-size)) / 2);
      width: var(--cursor-size);
      height: var(--cursor-size);
      background-color: var(--color-unchecked);
      border-radius: var(--height);
      transition: var(--transition-duration);
    }

    & input {
      opacity: 0;
      width: 0;
      height: 0;
    }

  }


</style>

<template>

  <label class="ui-toggle">
    <input
      @input="$emit('input', $event)"
      type="checkbox"
      :value="value"
    />
    <span class="ui-toggle__slider"></span>
  </label>

</template>

<script>
  export default {
    name: "ui-toggle",
    props: {
      value: Boolean
    }
  }
</script>