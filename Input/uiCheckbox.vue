<style lang="scss">
  @import '../assets/_variables.scss';

  .ui-checkbox {
    --checkmark-scale: 1;
    --checkmark-input-size: calc(var(--checkmark-scale) * 1.25em);
    --checkmark-size: calc(var(--checkmark-input-size) * 1);
    --checkmark-border-radius: var(--ui-border-radius-small);

    display: inline-flex;
    flex-direction: row-reverse;
    align-items: center;

    &__label {
      margin-left: 0.5em;
      font-size: calc(var(--checkmark-scale) * 1em);
    }
    &__input {
      position: relative;
      width: var(--checkmark-input-size);
      height: var(--checkmark-input-size);
      background: var(--checkmark-background, var(--ui-c-light-subtle, #FFF));
      border-radius: var(--checkmark-border-radius);
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
    &__label:hover ~ &__input {
      box-shadow: $state-active-box-shadow;
    }
    &__checkmark {
      position: absolute;
      top: 50%;
      left: 50%;
      width: var(--checkmark-size);
      height: var(--checkmark-size);
      transform: translate(-50%, -50%) scale(0.5);
      border-radius: var(--checkmark-border-radius);
      transition: all 180ms ease-in-out;
    }
    &--is-checked {
      background: var(--ui-c-primary);
      transform: translate(-50%, -50%) scale(1);
    }
  }
</style>

<template>
  <div :class="['ui-checkbox', uuid]">
<label :class="['ui-toggle__label', !isChecked ? 'c-light' : 'c-primary']" :for="uuid">{{ label }}</label>
    <label class="ui-checkbox__input" :for="uuid">
      <input
        class="hide-input"
        :value="isChecked"
        :id="uuid"
        type="checkbox"
        @click="handleChange"
      />
      <div
        :class="[
          'ui-checkbox__checkmark',
          isChecked ? 'ui-checkbox--is-checked' : '',
        ]"
      ></div>
    </label>
  </div>
</template>

<script lang="ts">

  import { minihash } from '../assets/utils.js'
  import { defineComponent, computed, onBeforeMount, onUnmounted, inject } from 'vue'
  import styleProps from '../assets/theme/styleProps'
  import globalCSS from '../assets/theme/css'
  const useCSS=globalCSS('checkboxStyles')

  export default defineComponent({
    name: 'uiCheckbox',
    props: {
      modelValue: Boolean,
      label: String,
      styleProps: {
        type: Object,
        default: () => {
          return {}
        },
      },
      ghost: {
        type: Boolean,
        default: true
      },
      prefix: {
        type: String,
        default: 'checkmark'
      },
      variant: {
        type: String,
        default: 'ghost'
      }
    },
    setup(props, { emit }) {


      const uuid=`_${minihash(11, 'lu')}`
      const uuidClass=`.${uuid}`

      const Theme:any=inject('theme')

      const styles = Theme.styleProps('checkbox',
        Theme.props(props.variant),
        props.styleProps,
      )

      const themeStyles = Object.assign(
        {},
        Theme.props(props.variant),
        props.styleProps )

      const theme = styleProps(
        props.prefix, 
        themeStyles, 
        )

      onBeforeMount(() => { 
        useCSS.insert(uuidClass, theme)  
      })
      onUnmounted(() => { 
        useCSS.delete(uuidClass)
      })
      let isChecked = computed({
        get: () => props.modelValue,
        set: value => emit('update:modelValue', value),
      })
      // checkboxStyles
  

      const handleChange = () => (isChecked.value = !isChecked.value)

      return {
        uuid,
        isChecked,
        handleChange,
      }
    },
  })
</script>
