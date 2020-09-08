<style lang="scss">
  .ui-number {
    
  }
</style>

<template>
  <div class="ui-number">
    <input type="number" :value="computedValue" :id="uuid" name="" >
  </div>
</template>

<script>

  import {minihash} from '../assets/minihash'
  import { computed, defineComponent, ref } from 'vue'

  export default defineComponent({
    name: "uiNumber",
    props: {
      modelValue: {
        type: Number,
        default: 0,
      }
    },
    setup(props) {
      const computedValue = computed({
        get: () => props.modelValue,
        set: value = emit('update:modelValue', value)
      })
    
      const uuid = minihash(10, 'lu')
      
      return {
        computedValue,
        uuid
      }
    }
  })
</script>