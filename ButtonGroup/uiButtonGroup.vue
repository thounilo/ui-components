<style lang="scss">
  .ui-button-group {
    --border-radius: var(--ui-border-radius-large, 0.25em);
    --background: transparent;

    display: inline-flex;
    background: var(--background);
    overflow: hidden;
    border-radius: var(--border-radius);
    flex-wrap: wrap;
    & button {
      flex: 1 0 auto;
    }
    & button:first-child {
      --border-radius: var(--border-radius) 0 0 var(--border-radius);
    }
    & button:last-child {
      --border-radius: 0 var(--border-radius) var(--border-radius) 0;
    }
    & button:not(:first-child):not(:last-child) {
      --border-radius: 0;
    }
  }
</style>

<template>
  <div class="ui-button-group">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'ui-button-group',
  }
</script>
