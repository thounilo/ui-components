<style lang="scss">
  @import '../assets/_variables.scss';

  .ui-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    --width: 18em;

    &__backdrop {
      background: hsla(0, 0%, 0%, 0.4);
      z-index: 11;
    }
    &__header {
      min-height: 2em;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 1em;

      h2 {
        display: inline-block;
      }
    }
    &__close {
      margin-left: auto;
      border-radius: var(--ui-border-radius-circle);
      display: flex;
      align-items: center;
      padding: 0.25em;

      &:hover {
        background: $state-hover;
        cursor: pointer;
      }
    }
    &__content {
      z-index: 12;
      background: #111;
      min-width: var(--width);
      border-radius: var(--ui-border-radius-small);

      & section {
        padding: 0 1em 1em 1em;
      }
    }
  }
</style>

<template>
  <div class="ui-overlay wh-screen" v-show="isActive">
    <div
      class="ui-overlay__backdrop wh-full"
      ref="backdrop"
      @click="handleBackdropClick"
    ></div>
    <div class="ui-overlay__content absolute-center">
      <header class="ui-overlay__header">
        <h3 v-if="title">{{ title }}</h3>
        <div class="ui-overlay__close">
          <uiIcon
            icon="ui-close-outline"
            @click="updateModel(false)"
            size="5"
          />
        </div>
      </header>
      <section>
        <slot> </slot>
      </section>
    </div>
  </div>
</template>

<script>
  import { uiIcon } from '../index'

  export default {
    name: 'ui-overlay',
    components: { uiIcon },
    props: {
      isActive: {
        type: Boolean,
        default: false,
      },
      closeOnEsc: {
        type: Boolean,
        default: true,
      },
      closeOnBackdrop: {
        type: Boolean,
        default: true,
      },
      title: {
        type: String,
        default: '',
      },
    },
    methods: {
      closeOnEscListener(e) {
        if (e.key === 'Escape' || e.key === 'Esc') this.updateModel(false)
      },
      handleBackdropClick() {
        if (this.closeOnBackdrop) this.updateModel(false)
      },
      updateModel(bool) {
        this.$emit('update:isActive', bool)
      },
    },
    mounted() {
      if (this.closeOnEsc)
        window.addEventListener('keyup', this.closeOnEscListener)
    },
    beforeDestroy() {
      if (this.closeOnEsc)
        window.removeEventListener('keyup', this.closeOnEscListener)
    },
  }
</script>
