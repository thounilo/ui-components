<style lang="scss">

  .ui-icon {
<<<<<<< HEAD
    --icon-size: 100%;
    --icon-color: currentColor;

    display: inline-block;
    width: var(--icon-size);
    height: var(--icon-size);
    fill: var(--icon-color);
=======

    --size: 100%;
    --color: currentColor;

    display: inline-block;
    width: var(--size);
    height: var(--size);
    fill: var(--color);

>>>>>>> parent of 2c324c2... helpers as plugin
  }

</style>

<template>
  <svg class="ui-icon" ref="icon" v-bind="$attrs">
    <use :xlink:href="computedPath" />
  </svg>
</template>

<<<<<<< HEAD
<script lang="ts">
  import { computed, defineComponent, onMounted, ref } from 'vue'
  //@ts-ignore
  import iconPath from '../assets/Icons/symbols.svg'

  export default defineComponent({
    name: 'ui-icon',
=======
<script>

  import iconPath from '../assets/Icons/symbols.svg'

  export default {
    name: "ui-icon",
>>>>>>> parent of 2c324c2... helpers as plugin
    props: {
      icon: {
        type: String,
        default: '',
        required: true
      },
      size: {
        type: [Number, String],
<<<<<<< HEAD
        default: 5,
      },
    },
    setup(props) {
      const icon = ref(null)

      const computedPath = computed(() => {
        return `${iconPath}#${props.icon}`
      })
      onMounted(() => {
        let size =
          typeof props.size === 'string' ? parseInt(props.size) : props.size
        console.log('icon', icon)
        icon.value.style.setProperty('--icon-size', `${size * 0.25}em`)
      })
      return {
        icon,
        computedPath,
      }
    },
    mounted() {},
  })
</script>
=======
        default: null
      }
    },
    computed: {
      computedPath() {
        return `${iconPath}#${this.icon}`
      }
    },
    mounted() {
      if(!!this.size)
        this.$refs.element.style.setProperty(
          '--size',
          `${parseInt(this.size) * .25}em`
        )
    }
  }
</script>
>>>>>>> parent of 2c324c2... helpers as plugin
