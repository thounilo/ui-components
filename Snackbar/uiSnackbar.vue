<style lang="scss">
  @import '../assets/_variables.scss';

  .ui-snackbar {
    --position: fixed;
    --height: 3em;
    --scale: 1;
    position: var(--position);
    bottom: calc(var(--height) * -1);
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    align-items: center;
    min-height: 3em;
    max-width: 16em;
    width: 100%;
    padding: 0 1em;
    background: #222;
    color: var(--ui-c-light);
    font-size: calc(var(--scale) * 1em);
    border-radius: var(--ui-border-radius-sm);
    transition: transform 300ms ease-in-out;

    &__close {
      position: absolute;
      top: 0.5em;
      right: 0.5em;
      display: flex;
      align-items: center;
      padding: 0.5em;
      border-radius: var(--ui-border-radius-circle);
      transition: background 180ms;
      &:hover {
        background: $state-hover;
        cursor: pointer;
      }
    }
    &--show {
      transform: translate(-50%, -4em);
    }
  }
</style>

<template>
  <div :class="['ui-snackbar', computedClass]">
    <div>
      {{ content }}
    </div>
    <div class="ui-snackbar__close" @click="hide">
      <ui-icon size="4" icon="close" />
    </div>
  </div>
</template>

<script>
  import { uiIcon } from '../index'

  export default {
    name: 'ui-snackbar',
    components: { uiIcon },
    props: {
      content: {
        type: String,
        default: '',
      },
      isActive: {
        type: Boolean,
        default: false,
      },
      timeout: {
        type: Number,
        default: 4000,
      },
      persistent: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isRunning: false,
        currentTimeout: null,
      }
    },
    computed: {
      computedClass() {
        return {
          'ui-snackbar--show': this.isActive,
        }
      },
    },
    methods: {
      show(bool) {
        if (!bool) return

        if (this.currentTimeout) {
          clearTimeout(this.currentTimeout)
        }
        if (!this.persistent) {
          this.currentTimeout = setTimeout(this.hide, this.timeout)
        }
      },
      hide() {
        this.$emit('update:isActive', false)
        this.currentTimeout = null
      },
    },
    watch: {
      isActive(bool) {
        this.show(bool)
      },
    },
  }
</script>
