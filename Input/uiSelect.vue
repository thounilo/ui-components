<style lang="scss">
  @import '../assets/_common.scss';

  .ui-select {
    --select-scale: 1;
    --select-height: 8em;
    --width: 20em;
    --input-scale: var(--select-scale);
    --input-width: var(--width);

    max-width: var(--width);
    width: 100%;
    border-radius: var(--ui-border-radius-small);
    overflow: hidden;

    &__input {
      --border-radius: 0;
      --select-scale: var(--input-scale);
      --width: var(--input-width);
      font-size: calc(var(--select-scale) * 1em);
    }

    &__options {
      height: 100%;
      padding: 0.5em 0;
      background: var(--ui-c-dark);
      min-height: var(--select-height);
      max-height: var(--select-height);
      background: var(--ui-c-transparent-dark-10);
      @include scrollbar();
    }

    &__option {
      @include interactable($hover: true);
      padding: 0.5em 0.75em;
      font-size: calc(var(--select-scale) * 0.9em);
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
        v-for="opt in selectOptions"
        @click="onOptionClick(opt)"
        :key="opt"
      >
        {{ opt }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import uiInput from './uiInput.vue'

  import { minihash } from '../assets/utils.js'
  import { defineComponent, ref, watch, computed, reactive } from 'vue'

  export default defineComponent({
    name: 'ui-select',
    emits: ['onSelect'],
    props: {
      label: {
        type: String,
        default: '',
      },
      options: {
        type: Array as () => string[],
        default: [],
      },
      placeholder: String,
      fluid: Boolean,
    },
    components: {
      uiInput,
    },
    setup(props, { emit }) {
      const uuid = minihash(8, 'lu')

      let inputValue = ref('')
      let selectOptionsValue = ref(props.options)
      let selectOptions = computed({
        get: () => selectOptionsValue.value,
        set: value => (selectOptionsValue.value = value),
      })

      const onOptionClick = (opt: string) => {
        emit('onSelect', opt)
        selectOptions.value = props.options
        inputValue.value = ''
      }

      watch(
        () => inputValue.value,
        (value: string) => {
          const query = new RegExp(`${value}`, 'gi')
          selectOptions.value = props.options.filter(o => query.test(o))
        }
      )

      return {
        uuid,
        inputValue,
        selectOptions,
        onOptionClick,
      }
    },
    // data() {
    //   return {
    //     inputValue: '',
    //     opts: [],
    //   }
    // },
    // methods: {
    //   onClick(e) {
    //     this.$nextTick(() => {
    //       this.opts = this.options
    //     })

    //     this.$emit('onSelect', e)
    //   },
    // },
    // mounted() {
    //   this.opts = this.options
    // },
    // watch: {
    //   inputValue(v) {
    //     this.$nextTick(() => {
    //       const query = new RegExp(`${v}`, 'gi')
    //       this.opts = this.options.filter(o => query.test(o))
    //     })
    //   },
    // },
  })
</script>
