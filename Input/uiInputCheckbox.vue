<style lang="scss">


  @import '../assets/_variables.scss';

  .ui-checkbox {
    width: 2em;
    height: 2em;
    position: relative;

    &__element {
      background: teal;
      width: 1em;
      height: 1em;
      border-radius: #{map-get($border-radius, 'sm')}
    }
  }

  .ui-checkbox input {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
  }

  .ui-checkbox input:checked + div{
    background: red;
  }

  .isChecked {
    // background: pink;

    &::before {
      content: 'x';
      width: 1em;
      height: 1em;
    }
  }

</style>

<template>
  <div class="ui-checkbox" tabindex>
    <input
      type="checkbox"
      :value="value"
      v-on:input="$emit('input', $event.target.checked)"
    />
    <div :class="['ui-checkbox__element', isChecked]">

    </div>
  </div>
</template>

<script>
  export default {
    name: "ui-checkbox",
    inheritAttrs: false,
    props: {
      value: Boolean,
      label: String
    },
    computed: {
      isChecked() {
        return true ? 'isChecked' : ''
      }
    }
  }
</script>