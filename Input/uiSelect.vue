<style lang="scss">

  @import '../assets/_common.scss';


  .ui-select {
    --height: 12em;

    max-width: 18em;
    width: 100%;
    border-radius: .25em;
    overflow: hidden;

    input {
      width: 100%;
    }
    datalist {
      border: none;
      // background: var(--ui-c-dark);
      color: var(--ui-c-light);
      font: var(--ui-font);
      option {
        border: none;
      }
    }

    &__options {
      background: var(--ui-c-dark);
      height: 100%;
      min-height: var(--height);
      max-height: var(--height);
      overflow-y:scroll;
      background: hsla(0, 0%, 50%, .1);
      @include scrollbar();
    }

    &__option {
      @include interactive-hover();
      // @include py(.75em);
      padding: .75em ;
    }
  }
</style>

<template>
  <div class="ui-select">
    <uiInput ghost
      style="--border-radius: 0"
      type="text"
      list="datalistInput"
      :for="uuid"
      :label="label"
      v-model="inputValue"
    />
    <div class="ui-select__options">
      <div class="ui-select__option"
        @click="onClick(option)"
        v-for="option in opts"
        :key="option"
      >
        {{option}}
      </div>
    </div>
  </div>
</template>

<script>

  import { minihash } from "../assets/utils";
  import { uiInput } from "../index";

  export default {
    name: "ui-select",
    props: {
      label: {
        type: String,
        default: ''
      },
      size: Number,
      options: Array,
      behavior: {
        type: String,
        default: 'event' // input
      }
    },
    components: {
      uiInput,
    },
    computed: {
      uuid() {
        return minihash(8, 'lu')
      },
    },
    data() {
      return {
        inputValue: '',
        opts: [],
        visibleOpts: [],
      }
    },
    methods: {
      onClick(e) {

        if(this.behavior === 'event') {
          this.inputValue = ''
        }

        if(this.behavior === 'input') {
          this.inputValue = e
        }

        this.$nextTick(() => {
          this.opts = this.options
        })

        this.$emit('onSelect', e)

      },
    },
    mounted() {
      this.opts = this.options
    },
    watch: {
      inputValue(v) {
        this.$nextTick(() => {
          const query = new RegExp(`${v}`, 'gi')
          this.opts = this.options.filter(o => query.test(o))
        })
      }
    }
  }
</script>