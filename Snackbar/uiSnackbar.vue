<style lang="scss">
  @import '../assets/_variables.scss';

  .ui-snackbar {
    --position: fixed;
    --height: 3em;
    --scale: 1;
    font-size: calc(var(--scale) * 1em);
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
    border-radius: var(--ui-border-radius-sm);
    transition: transform 300ms ease-in-out;

    &__close {
      position: absolute;
      top: 0.5em;
      right: 0.5em;
      padding: 0.5em;
      border-radius: var(--ui-border-radius-circle);
      display: flex;
      align-items: center;

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
      <ui-icon size="4" icon="ui-close-outline" />
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
        console.log('please show', bool)

        if (!bool) return

        if (this.currentTimeout) {
          clearTimeout(this.currentTimeout)
        }
        this.currentTimeout = setTimeout(this.hide, this.timeout)
        console.log('this.currentTimeout, bool', this.currentTimeout, bool)
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
