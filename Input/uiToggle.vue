<style lang="scss">
  @import '../assets/_variables.scss';

  .ui-toggle {
    --scale: 1;
    --input-width: calc(var(--scale) * 2.8em);
    --input-height: calc(var(--scale) * 1.25em);
    --checkmark-size: calc(var(--input-height) * 0.7);
    --checkmark-start: calc(var(--scale) * 0.2em);
    --border-radius: var(--ui-border-radius-small);
    color: var(--toggle-color, currentColor);
    display: inline-flex;
    flex-direction: row-reverse;
    align-items: center;

    &__label {
      margin-left: 0.5em;
      font-size: calc(var(--scale) * 1em);
    }
    &__input {
      position: relative;
      width: var(--input-width);
      height: var(--input-height);
      border-radius: var(--border-radius);
      overflow: hidden;
      transition: box-shadow 180ms;
      flex: 1 0 auto;

      &:hover,
      &:focus-within { 
        box-shadow: $state-active-box-shadow;
      }
    }
    &__input,
    &__label {
      cursor: pointer;
    }
    &__checkmark {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--toggle-background);
    }

    &__checkmark:before {
      content: '';
      position: absolute;
      left: var(--checkmark-start);
      top: calc((var(--input-height) - var(--checkmark-size)) / 2);
      width: var(--checkmark-size);
      height: var(--checkmark-size);
      background-color: var(--ui-c-primary);
      border-radius: var(--border-radius);
      transition: transform 180ms ease-in-out;
    }

    &--is-checked {
      background-color: var(--ui-c-primary);
      &:before {
        background: var(--ui-c-light);
        transform: translateX(
          calc(
            var(--input-width) - var(--checkmark-size) -
              (var(--checkmark-start) * 2)
          )
        );
      }
    }
  }
</style>

<template>
  <div :class="['ui-toggle', uuid]">
    <label :class="['ui-toggle__label', !isChecked ? 'c-light' : 'c-primary']" :for="uuid">{{ label }}</label>
    <label class="ui-toggle__input">
      <input
        class="hide-input"
        :value="isChecked"
        :id="uuid"
        type="checkbox"
        @input="(isChecked = !isChecked)"
      />
      <span
        :class="[
          'ui-toggle__checkmark',
          isChecked ? 'ui-toggle--is-checked' : '',
        ]"
      ></span>
    </label>
  </div>
</template>

<script lang="ts">
  import { minihash } from '../assets/utils.js'
  import { defineComponent, computed, inject, onBeforeMount, onUnmounted } from 'vue'
  import { styleProps } from '../assets/theme/styleProps'

  import globalCSS from '../assets/theme/css'
  const useCSS=globalCSS('toggleStyles')

  export default defineComponent({
    name: 'uiToggle',
    props: { 
      modelValue:Boolean, 
      label: String,
      //* Style
      ghost: {
        type: Boolean,
        default: true,
      },
      prefix: {
        type: String,
        default: 'toggle'
      },
      variant: {
        type: String,
        default: 'ghost'
      },
      styleProps: {
        type: Object,
        default: () => {}
      },
    },

    setup(props, { emit }) {
      const uuid=`_${minihash(11, 'lu')}`
      const uuidClass=`.${uuid}`

      const Theme:any=inject('theme')

      const themeStyles = Object.assign(
        {},
        Theme.props(props.variant),
        props.styleProps )

      const theme = styleProps(
        props.prefix, 
        themeStyles, 
        )

      onBeforeMount(() => useCSS.insert(uuidClass, theme))
      onUnmounted(()   => useCSS.delete(uuidClass))

      let isChecked = computed({
        get: () => props.modelValue,
        set: value => emit('update:modelValue', value),
      })

      const handleChange = () => (isChecked.value = !isChecked.value)

      return {
        uuid,
        isChecked,
        handleChange,
      }
    },
  })
</script>
