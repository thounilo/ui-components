<style lang="scss">
  @import '../assets/_common.scss';

  .ui-select {
    --scale: 1;
    --height: 8em;
    --width: 20em;
    --input-scale: var(--scale);
    --input-width: var(--width);

    max-width: var(--width);
    width: 100%;
    border-radius: var(--ui-border-radius-sm);
    overflow: hidden;

    &__input {
      --border-radius: 0;
      --scale: var(--input-scale);
      --width: var(--input-width);
      font-size: calc(var(--scale) * 1em);
    }

    &__options {
      height: 100%;
      padding: 0.5em 0;
      background: var(--ui-c-dark);
      min-height: var(--height);
      max-height: var(--height);
      background: var(--ui-c-transparent-dark-10);
      @include scrollbar();
    }

    &__option {
      @include interactable($hover: true);
      padding: 0.5em 0.75em;
      font-size: calc(var(--scale) * 0.9em);
    }

    &--fluid {
      --width: 100%;
    }
  }
</style>

<template>
  <div :class="['ui-select', fluid ? 'ui-select--fluid' : '']">
    <uiInput
      ghost
      style=""
      class="ui-select__input"
      type="text"
      :for="uuid"
      :label="label"
      v-model="inputValue"
      :placeholder="placeholder"
    />
    <div class="ui-select__options">
      <div
        class="ui-select__option"
        @click="onClick(option)"
        v-for="option in opts"
        :key="option"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
  import { minihash } from '../assets/utils'
  import { uiInput } from '../index'

  export default {
    name: 'ui-select',
    props: {
      label: {
        type: String,
        default: '',
      },
      size: Number,
      options: Array,
      behavior: {
        type: String,
        default: 'event', // input
      },
      placeholder: String,
      fluid: Boolean,
    },
    components: {
      uiInput,
    },
    computed: {
      uuid() {
        return minihash(8, 'lu')
      },
    },
    data() {
      return {
        inputValue: '',
        opts: [],
        visibleOpts: [],
      }
    },
    methods: {
      onClick(e) {
        if (this.behavior === 'event') {
          this.inputValue = ''
        }

        if (this.behavior === 'input') {
          this.inputValue = e
        }

        this.$nextTick(() => {
          this.opts = this.options
        })

        this.$emit('onSelect', e)
      },
    },
    mounted() {
      this.opts = this.options
    },
    watch: {
      inputValue(v) {
        this.$nextTick(() => {
          const query = new RegExp(`${v}`, 'gi')
          this.opts = this.options.filter(o => query.test(o))
        })
      },
    },
  }
</script>
