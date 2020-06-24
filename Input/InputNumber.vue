<style lang="scss" scoped>

  // @import './scss/_input-base.scss';
  // @import './scss/_input-number.scss';
  // @import './scss/_input-label.scss';

  // .zInput-number label {
  //   margin-bottom: .5rem;
  // }

  // .description  {
  //   margin-top: .25rem;
  //   display: block;
  //   font-size: .8rem;
  //   font-style: italic;
  // }

  // .spinners {
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  //   display: flex;
  //   flex-direction: row;
  //   align-items: center;
  //   width: 3.5rem;
  //   height: 100%;


  //   & button {
  //     position: relative;
  //     width: 50%;
  //     height: 100%;
  //     border: none;
  //     border-left: $input-border;
  //     color: $theme-color-primary;
  //     cursor: pointer;
  //     user-select: none;
  //     font-weight: bold;
  //     background: transparent;
  //     transition: background 200ms;

  //   &:last-child {
  //     border-bottom-right-radius: $input-border-radius;
  //     border-top-right-radius: $input-border-radius;
  //   }

  //   &:focus {
  //       background: hsla(0, 0%, 50%, .05);
  //       outline: none;
  //     }
  //     &:active {
  //       background: $input-spinner-active-color;
  //       transition: background 200ms;
  //     }

  //     &-up, &-down {
  //       position: absolute;
  //       left: 50%;
  //       height: 1rem;
  //       width: .5rem;
  //     }

  //     &-up {
  //       top: 52%;
  //       transform: translate(-50%, -52%);
  //     }

  //     &-down {
  //       top: 50%;
  //       transform: translate(-50%, -50%);
  //     }
  //   }
  // }

</style>

<template>
  <div class="zInput-number">

    <label :for="uId" v-if="label">{{ label }}</label>

    <div class="relative">

      <input
        :name="uId"
        type="number"
        ref="input"
        @input="updateValue($event)"
      />

        <div class="spinners">

          <button @click="handleUp">
            <span class="spinner-up">+</span>
          </button>
          <button @click="handleDown">
            <span class="spinner-down">-</span>
          </button>
        </div>

    </div>

    <span class="description" v-if="description">{{ description }}</span>

  </div>
</template>

<script>

  import { minihash } from '../../assets/utils.js'

  export default {
    name: "zInputNumber",
    inheritAttrs: false,
    props: {
      label: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      min: {
        type: [Number, String],
        default: Number.MIN_SAFE_INTEGER
      },
      max: {
        type: [Number, String],
        default: Number.MAX_SAFE_INTEGER
      },
      step: {
        type: [Number, String],
        default: 1
      },
      value: {
        type: [Number, String],
        default: 0
      }
    },
    computed: {
      uId() {
        return minihash(8, 'lu')
      },
      computedMin() {
        return typeof this.min === 'string' ? parseInt(this.min) : this.min
      },
      computedMax() {
        return typeof this.max === 'string' ? parseInt(this.max) : this.max
      },
      computedStep() {
        return typeof this.step === 'string' ? parseInt(this.step) : this.step
      },
      computedValue() {
        return this.$refs.input.value !== NaN ? this.$refs.input.value : 0
      }
    },
    methods: {
      updateValue({ target: { value } }) {
        this.$emit('input', value)
      },
      handleUp() {

        let nextValue = parseInt(this.value) + this.computedStep

        this.$refs.input.value = nextValue >= this.computedMax
          ? this.computedMax
          : nextValue
        this.$emit('input', nextValue)
      },
      handleDown() {

        let nextValue = parseInt(this.value) - this.computedStep

        this.$refs.input.value = nextValue <= this.computedMin
          ? this.computedMin
          : nextValue

        this.$emit('input', nextValue)

      },
      capValue() {

        let v = this.$refs.input.value

        if(v >= this.computedMax)
          this.$refs.input.value = this.computedMax

        if(v <= this.computedMin)
          this.$refs.input.value = this.computedMin

          this.$emit('input', this.$refs.input.value)

      }
    },
    mounted() {
      this.$refs.input.addEventListener('blur', this.capValue)
    },
    beforeDestroy() {
      this.$refs.input.removeEventListener('blur', this.capValue)
    }
  }
</script>