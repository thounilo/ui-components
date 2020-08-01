<style lang="scss">
  @import '../assets/_variables.scss';

  .ui-image {
    --width: 100%;
    --height: auto;
    --object-fit: contain;
    --border-radius: 0;

    width: var(--width);
    height: var(--height);
    object-fit: var(--object-fit);
    border-radius: var(--border-radius);

    &--portrait {
      --width: auto;
      --height: 100%;
    }

    &--rounded {
      --border-radius: var(--ui-border-radius-sm);
    }
    &--circle {
      --border-radius: var(--ui-border-radius-circle);
    }
  }
</style>

<template>
  <img :class="computedClasses" :src="src" :alt="alt" ref="image" />
</template>

<script>
  export default {
    name: 'ui-imge',
    props: {
      src: {
        type: String,
        default: '',
        required: true,
      },
      alt: {
        type: String,
        default: '',
      },
      cover: Boolean,
      rounded: Boolean,
      circle: Boolean,
      width: String,
      height: String,
    },
    computed: {
      computedClasses() {
        return {
          'ui-image': true,
          'ui-image--portrait': this.orientation === 'portrait',
          'ui-image--circle': this.circle,
          'ui-image--rounded': this.rounded,
        }
      },
    },
    data() {
      return {
        orientation: 'landscape',
      }
    },
    methods: {
      imageOrientation() {
        const img = this.$refs.image
        if (img.naturalWidth < img.naturalHeight) return 'portrait'
        return this.orientation
      },
    },
    mounted() {
      if (this.cover) {
        this.$refs.image.style.setProperty('--object-fit', 'cover')
        this.$refs.image.style.setProperty('--width', '100%')
        this.$refs.image.style.setProperty('--height', '100%')
      }
      if (this.width) {
        this.$refs.image.style.setProperty('--width', this.width)
      }
      if (this.height) {
        this.$refs.image.style.setProperty('--height', this.height)
      }
      this.orientation = this.imageOrientation()
    },
  }
</script>
