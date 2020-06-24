

<style lang="scss">

  .ui-overlay {
    position: fixed; top: 0; left: 0;
    width: 100vw; height: 100vh;
    z-index: 10;

    &__backdrop {
      background: hsla(0, 0%, 0%, .4);
      z-index: 11;
    }
    &__content {
      z-index: 12;
    }
  }

</style>


<template>
  <div class="ui-overlay wh-screen" v-show="isActive">
    <div class="ui-overlay__backdrop wh-full" ref="backdrop" @click="handleBackdropClick"></div>
    <div class="ui-overlay__content absolute-center">
      <slot>
        <button @click="updateModel(false)">close</button>
      </slot>
    </div>
  </div>
</template>


<script>
  export default {
    name: "ui-overlay",
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
      closeOnEsc: {
        type: Boolean,
        default: true
      },
      closeOnBackdrop: {
        type: Boolean,
        default: true
      },
    },
    methods: {
      closeOnEscListener(e) {
        if(e.key === 'Escape' || e.key === 'Esc') this.updateModel(false)
      },
      handleBackdropClick() {
        if(this.closeOnBackdrop) this.updateModel(false)
      },
      updateModel(bool) {
        this.$emit('update:isActive', bool)
      }
    },
    mounted() {
      if(this.closeOnEsc) window.addEventListener('keyup', this.closeOnEscListener)

    },
    beforeDestroy() {
      if(this.closeOnEsc) window.removeEventListener('keyup', this.closeOnEscListener)
    }
  }
</script>

