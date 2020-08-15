<style lang="scss">
  .ui-floating-bar {
    --position-top: 0;
    --position-bottom: initial;
    --position: fixed;

    position: var(--position);
    top: var(--position-top);
    bottom: var(--position-bottom);
    width: 100%;
    max-height: 4em;
    height: 100%;
    background: var(--ui-);
  }
</style>

<template>
  <div class="ui-floating-bar" ref="floatingBar"></div>
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
        this.$uiComponents.style.insert(this.$refs.floatinBar.$el, {
          '--position-bottom': 0,
          '--position-top': unset,
        })
      }
    },
  }
</script>
