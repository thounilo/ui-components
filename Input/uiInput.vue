<style lang="scss">
  @import '../assets/_variables.scss';
  @import '../assets/_common';

  $message-font-size: 0.75em;

  .ui-input {


    width: 100%;
    max-width: var(--input-width);
    color: var(--input-color);

    &__element {
      position: relative;
      width: 100%;
      min-height: var(--input-height);
      padding: var(--input-padding);
      color: currentColor;
      background: var(--input-background);
      border-radius: var(--input-border-radius);
      font-family: var(--ui-font);
      font-size: calc(var(--input-scale) * 1em);
      border: var(--input-border);

      &::placeholder {
        color: var(--ui-c-transparent-light-60);
        font-size: calc(var(--input-scale) * 0.9em);
      }
    }

    &__input {
      @include interactable($hover: true, $focus: true);
    }

    &__icon {
      position: absolute;
      right: 0.5em;
      top: 50%;
      transform: translateY(-50%);
    }

    &__label {
      display: block;
      margin-bottom: 0.5em;
      font-size: calc(var(--input-scale) * 1em);
      color: var(--ui-c-light)
    }

    &__message {
      font-size: calc(var(--input-scale) * 0.75em);
      margin-top: 0.5em;
      font-style: italic;
      display: inline-block;
      color: var(--ui-c-light-subtle)
    }
  }

</style>

<template>
  <div :class="['ui-input', themeClass]">
    <slot name="label">
      <label class="ui-input__label" v-if="label" :for="computedID">{{
        label
      }}</label>
    </slot>

    <div class="ui-input__input">
      <input
        class="ui-input__element"
        :id="computedID"
        :value="inputValue"
        :type="type"
        :placeholder="placeholder"
        :validate="validate"
        :autofocus="autofocus"
        :required="required"
        :disabled="disabled"
        :spellcheck="spellcheck"
        @input="onInput"
        ref="uiElement"
      />

      <slot name="input-icon">
        <uiIcon
          class="ui-input__icon"
          v-if="hasIcon"
          @click="handleIconClick"
          :icon="icon"
          :size="iconSize"
        />
      </slot>
    </div>

    <span class="ui-input__message" v-if="message">{{ message }}</span>
  </div>
</template>

<script lang="ts">
  import { minihash } from '../assets/utils'
  import { defineComponent, computed, ref, inject, onMounted, onUnmounted } from 'vue'
  import { uiIcon } from '../index'
  import CSS from '../assets/theme/css'
  const css = CSS('inputStyles')
  
  export default defineComponent({
    name: 'uiInput',
    components: { uiIcon },
    props: {
      modelValue: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: 'text',
      },
      for: {
        type: String,
        default: '',
      },
      //* Layout
      label: {
        type: String,
        default: '',
      },
      message: {
        type: String,
        default: '',
      },

      //* Icon
      icon: {
        type: String,
        default: '',
      },
      iconSize: {
        type: [Number, String],
        default: 5,
      },

      //* Theme
      light: {
        type: Boolean,
        default: false,
      },
      outline: {
        type: Boolean,
        default: false,
      },
      fill: {
        type: Boolean,
        default: false,
      },
      variant: {
        type: String,
        default: 'ghost',
      },
      //* Attrs
      placeholder: {
        type: String,
        default: '',
      },
      validate: {
        type: Boolean,
        default: false,
      },
      autofocus: {
        type: Boolean,
        default: false,
      },
      required: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      spellcheck: {
        type: Boolean,
        default: false,
      },
      id: {
        type: String,
        default: '',
      },
      //* new stuff
      prefix: {
        type: String,
        default: 'input'
      },
      raised: Boolean,
      fluid: Boolean,
      scale: {
        type: Number,
        default: 1,
      },
      styleProps: {
        type: Object,
        default: () => {}
      },
      //* State
      state: {
        type: Boolean,
        default: null,
      },
    },
    setup(props, { emit }) {

      const Theme:any = inject('theme')
      const {
        props: getProps,
        styles,
        styleProps,
        getClasses
      } = Theme

      const variants = [
        props.variant,
        props.raised ? 'raised' : null,
        props.fluid  ? 'fluid': null,
      ].filter(Boolean)


      const s = styleProps(props.prefix, 
        getProps(variants),
        {scale: props.scale},
        props.styleProps,
      )
      const {themeClass, themeSelector} = getClasses()

      onMounted(() => css.insert(themeSelector, s))
      onUnmounted(() => css.delete(themeSelector))


      let inputValue = computed({
        get: () => props.modelValue,
        set: value => emit('update:modelValue', value),
      })

      const onInput = (e: InputEvent) => {
        inputValue.value = (<HTMLInputElement>e.target).value
      }

      const uuid = computed(() => (props.id ? props.id : minihash(8, 'lu')))

      const hasIcon = ref(!!props.icon)
      const computedID = computed(() => props.for ? props.for : uuid.value)

      const handleIconClick = (e: MouseEvent) => emit('click:icon', e)

      return {
        uuid,
        hasIcon,
        computedID,
        handleIconClick,
        onInput,
        inputValue,
        themeClass,
      }
    },
  })
</script>
