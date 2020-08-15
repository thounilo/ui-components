<style lang="scss">
  @import '../assets/_variables.scss';
  .ui-floating-bar {
    --position-top: 0;
    --position-bottom: initial;
    --position: fixed;
    --height: 4em;
    position: var(--position);
    top: var(--position-top);
    left: 0;
    bottom: var(--position-bottom);
    width: 100%;
    max-height: var(--height);
    height: 100%;
    background: var(--ui-c-primary);
    z-index: $z-fixed;
  }
</style>

<template>
  <div class="ui-floating-bar" ref="floatingBar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'ui-floating-bar',
    props: {
      position: String,
      default: 'top', // 'bottom'
    },
    mounted() {
      if (this.position === 'bottom') {
        this.$uiComponents.style.insert(this.$refs.floatingBar.$el, {
          '--position-bottom': 0,
          '--position-top': unset,
        })
      }
    },
  }
</script>
