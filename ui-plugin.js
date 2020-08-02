import globalCss from './assets/globalCss.ts'
import { minihash } from './assets/utils.js'

const uiPlugin = {
  install(Vue, opts) {
    Vue.prototype.$uiComponents = {}
    Vue.prototype.$uiComponents.style = globalCss('ui-components')
    Vue.prototype.$uiComponents.minihash = minihash
  },
}

export default uiPlugin
