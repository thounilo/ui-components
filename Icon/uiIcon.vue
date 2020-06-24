<style lang="scss">

  .ui-icon {

    --size: 100%;
    --color: currentColor;

    display: inline-block;
    width: var(--size);
    height: var(--size);
    fill: var(--color);

  }

</style>

<template>
  <svg class="ui-icon" ref="element" v-on="$listeners" v-bind="$attrs">
    <use :xlink:href="computedPath" />
  </svg>
</template>

<script>

  import iconPath from '../../assets/Icons/symbols.svg'

  export default {
    name: "ui-icon",
    props: {
      icon: {
        type: String,
        default: 'ui-search-outline',
        required: true
      },
      size: {
        type: [Number, String],
        default: null
      }
    },
    computed: {
      computedPath() {
        return `${iconPath}#${this.icon}`
      }
    },
    mounted() {
      if(!!this.size)
        this.$refs.element.style.setProperty('--size', `${parseInt(this.size) * .25}rem`)
    }
  }
</script>