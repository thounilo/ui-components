<style lang="scss" scoped>

  @import '../../assets/_variables.scss';

  .ui-input-c {

    --size: #{map-get($input-checkbox, 'size')};
    --border-radius: var(--BASE-BORDER-RADIUS);
    --border-width: var(--BASE-BORDER-WIDTH);
    --border-color: var(--BASE-BORDER-COLOR);
    --border: var(--BASE-BORDER-WIDTH) solid var(--BASE-BORDER-COLOR);

    position: relative;
    display: flex;
    align-items: center;

    & label {
      display: inline-block;
      margin-left: .5rem;
    }

    input[type='checkbox'] {
      display: none;
    }

    &__checkbox {

      display: inline-flex;
      align-items: center;
      cursor: pointer;
      height: 100%;

      & > * { pointer-events: none; }

      &::before {
        content: '';
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--size);
        height: var(--size);
        border: var(--border);
        border-radius: var(--border-radius);
        transition: var(--BASE-TRANSITION-BACKGROUND);
        background: transparent;
      }

      &--is-checked {
        &::before {
          content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" ><path fill="white" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>');
          background: var(--BASE-PRIMARY-DARKER);
          border: var(--border);
          font-size: 1.1em;
        }
      }
    }

  }

  @keyframes wawe {
    50% {
      transform: scaleX(1.2);
    }
    75% {
      transform: scaleY(1.2);
    }
  }

</style>

<template>

  <div class="ui-input-c">

    <div :class="computedClasses" @click="toggle" >

      <input :id="uuid"  ref="input"  v-bind="$attrs"  type="checkbox"  />

      <label :for="uuid" v-if="label">
        {{label}}
      </label>

    </div>

  </div>

</template>

<script>

  import { minihash } from '../../assets/utils'

  export default {
    name: "qInputCheckbox",
    inheritAttrs: false,
    props: {
      label: {
        type: String,
        default: ''
      }
    },
    methods: {
      toggle(e) {
        this.$attrs.value = !this.$attrs.value
        this.$emit('input', this.$attrs.value)
      }
    },
    computed: {
      isChecked() {
        return this.$attrs.value
      },
      uuid() {
        return this.label ? minihash(10, 'lu') : ''
      },
      computedClasses() {
        return {
          'ui-input-c__checkbox': true,
          'ui-input-c__checkbox--is-checked': !!this.isChecked
        }
      }
    }
  }
</script>