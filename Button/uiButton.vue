<style lang="scss">

  @import '../assets/_common.scss';

  .ui-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    
    width:         var(--btn-width);
    height:        var(--btn-height);
    padding:       var(--btn-padding);
    color:         var(--btn-color);
    background:    var(--btn-background);
    border:        var(--btn-border); 
    border-radius: var(--btn-border-radius);
    box-shadow:    var(--btn-box-shadow);
    font-size:     calc(var(--btn-scale) * var(--ui-base-unit));
    gap:           var(--btn-gap);
    font-family:   var(--ui-font);

    @include interactable($hover: true, $focus: true, $active: false);

    @supports not (gap: 1em)  {
      & > *:nth-child(2) {
        margin-left: var(--btn-gap);
        margin-right: var(--btn-gap);
      }
    }
  }

</style>

<template>
  <button :class="['ui-button', uuid, ]">
    <slot name="icon">
      <uiIcon class="z-5" v-if="icon" :icon="icon" :size="iconSize" />
    </slot>
    <slot>
      <span :class="uppercase" v-if="text">{{ text }}</span>
    </slot>
  </button>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, reactive, inject, onBeforeMount, onUnmounted } from 'vue'
  import { uiIcon } from '../index'

  import { minihash } from '../assets/minihash'
  import { styleProps } from '../assets/theme/styleProps'
  import globalCSS from '../assets/theme/css'
  import merge from 'lodash/merge'
  const useCSS=globalCSS('buttonStyles')

  export default defineComponent({
    name: 'uiButton',
    components: { uiIcon },
    props: {
      text: {
        type: String,
        default: '',
      },
      icon: {
        type: String,
        default: '',
      },
      iconSize: {
        type: Number,
        default: 4,
      },
      //* Scale
      scale: {
        type: Number,
        default: 1,
      },
      //* Style
      fluid: Boolean,
      uppercase: {
        type: Boolean,
        default: true
      },
      raised: {
        type: Boolean,
        default: false
      },
      prefix: {
        type: String,
        default: 'btn'
      },
      styleProps: {
        type: Object,
        default: () => {}
      },
      /**
       * @values ghost, fill, outline
       * 
       */
      variant: {
        type: String,
        default: 'ghost'
      },
   
    },
    setup(props, {emit}) {
      const uuid=`_${minihash(11, 'lu')}`
      const cssSelector=`button.${uuid}`

      const styles = [
        props.variant,
        props.raised ? 'raised' : null,
        props.fluid  ? 'fluid': null,
      ].filter(Boolean)

      const Theme:any = inject('theme')

      const theme = Theme.styleProps(props.prefix, 
        Theme.props(styles),
        { scale: props.scale },
        props.styleProps,
      )

      onBeforeMount(()=>useCSS.insert(cssSelector, theme))
      onUnmounted(()=>useCSS.delete(cssSelector))

      return {
        uuid,
        uppercase: props.uppercase ? Theme.classes.uppercase : '',
        iconSize: props.iconSize * props.scale,
      }
    },
  })
</script>
