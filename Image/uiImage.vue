<style lang="scss">
  @import '../assets/_variables.scss';

  .ui-image {
    --image-width: 100%;
    --image-height: auto;
    --image-object-fit: contain;
    --image-border-radius: 0;

    width: var(--image-width);
    height: var(--image-height);
    object-fit: var(--image-object-fit);
    border-radius: var(--image-border-radius);

    &--portrait {
      --image-width: auto;
      --image-height: 100%;
    }

    &--rounded {
      --image-border-radius: var(--ui-border-radius-small);
    }
    &--circle {
      --image-border-radius: var(--ui-border-radius-circle);
    }
  }
</style>

<template>
  <img
    :class="computedClasses"
    ref="image"
    v-bind="$attrs"
    :style="_styleProps"
  />
</template>

<script lang="ts">
  import { defineComponent, computed, ref, onMounted, reactive } from 'vue'
  import { styleProps } from '../assets/styleProps'

  export default defineComponent({
    name: 'uiImage',
    props: {
      cover: Boolean,
      rounded: Boolean,
      circle: Boolean,
      orientation: String,
      styleProps: {
        type: Object,
        default: () => {
          return {}
        },
      },
    },
    setup(props) {
      const computedClasses = computed(() => {
        return {
          'ui-image': true,
          'ui-image--portrait': orientation.value === 'portrait',
          'ui-image--circle': props.circle,
          'ui-image--rounded': props.rounded,
        }
      })
      const imageRef: any = ref()
      let orientation = ref('landscape')

      const getImageOrientation = () => {
        if (imageRef.naturalWidth > imageRef.naturalWidth) {
          return 'landscape'
        } else {
          return 'portrait'
        }
      }

      const _styleProps = styleProps(props.styleProps, 'image')
      onMounted(() => {
        orientation.value = getImageOrientation()
      })

      return {
        computedClasses,
        _styleProps,
      }
    },

    // mounted() {
    //   if (this.cover) {
    //     this.$refs.image.style.setProperty('--object-fit', 'cover')
    //     this.$refs.image.style.setProperty('--image-width', '100%')
    //     this.$refs.image.style.setProperty('--image-height', '100%')
    //   }
    //   if (this.width) {
    //     this.$refs.image.style.setProperty('--image-width', this.width)
    //   }
    //   if (this.height) {
    //     this.$refs.image.style.setProperty('--image-height', this.height)
    //   }
    //   this.orientation = this.imageOrientation()
    // },
  })
</script>
