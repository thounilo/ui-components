<style lang="scss">

  $transition-duration: 300ms;

  .ui-toggle {

    --width: 2.6em;
    --height: 1.25em;
    --cursor-size: calc(var(--height) * .8);
    --cursor-start: .2em;

    position: relative;
    display: inline-block;
    width: var(--width);
    height: var(--height);

    & input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    input:checked + &__slider {
      background-color: var(--BASE-PRIMARY);
    }

    input:checked + &__slider:before {
      transform: translateX(calc(var(--width) - var(--cursor-size) - (var(--cursor-start)*2)));
    }

    &__slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: $transition-duration;
      border-radius: 34px;

    }

    &__slider:before {
      position: absolute;
      content: "";
      height: var(--cursor-size);
      width: var(--cursor-size);
      left: var(--cursor-start);
      bottom: calc((var(--height) - var(--cursor-size)) / 2);
      background-color: var(--BASE-LIGHT);
      transition: $transition-duration;
      border-radius: 34px;
    }
  }


</style>

<template>

  <label class="ui-toggle">
    <input type="checkbox">
    <span class="ui-toggle__slider round"></span>
  </label>

</template>

<script>
  export default {
    name: "ui-toggle"
  }
</script>