<style lang="scss">

  @import '../assets/_utility-classes.scss';
  @import '../assets/_base.scss';

</style>

<template>
  <div class="ui-app full-screen scroll-y">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "ui-app"
  }
</script>