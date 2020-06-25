<style lang="scss">

  .ui-container {

    --display: block;
    --x: flex-start;
    --y: flex-start;
    --direction: 'row';
    --wrap: nowrap;

    display: var(--display);

    &__flex {
      --display: flex;
      flex-direction: var(--direction);
      justify-content: var(--x);
      align-items: var(--y);
      flex-wrap: var(--wrap);
    }
  }

</style>

<template>
  <component
    :class="[computedClasses]"
    :is="tag"
    ref="uiElement"
  >
    <slot></slot>
  </component>
</template>

<script>

  function setElementStyles(el, styles) {
    for(let [prop, value] of Object.entries(styles)) {
      if(typeof value === 'string' && value.length) {
        el.style.setProperty(prop, value)
      }
    }
  }

  export default {
    name: "ui-container",
    props: {
      tag: {
        type: String,
        default: 'div'
      },

      //* Layout
      flex: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: 'row'
      },
      x: {
        type: String,
        default: ''
      },
      y: {
        type: String,
        default: ''
      },
      wrap: {
        type: Boolean,
        default: false
      },

    },
    computed: {
      computedClasses() {
        return {
          'ui-container': true,
          'ui-container__flex': !!this.flex
        }
      }
    },
    mounted() {
      if(this.wrap) {
        setElementStyles(this.$refs.uiElement, {
          '--wrap': 'wrap'
        })
      }
      if(this.flex) {
        if(this.direction === 'column') {
          setElementStyles(this.$refs.uiElement, {
            '--direction': this.direction,
            '--x': this.y,
            '--y': this.x
          })
        } else {
          setElementStyles(this.$refs.uiElement, {
            '--x': this.x,
            '--y': this.y
          })
        }
      }
    }
  }
</script>