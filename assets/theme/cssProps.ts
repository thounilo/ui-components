
import {hsl, hsla} from './util'

const hue=55
const saturation=40
const lightness=55
const $hue='var(--ui-c-hue)'

export const getProp = (str: string) => `var(${find(str)})`

const colors = new Map() // TODO Generic colors, green, red, yellow etc..
  colors.set('--ui-c-hue',               hue)
  colors.set('--ui-c-primary',           hsl($hue, saturation, lightness))
  colors.set('--ui-c-primary-subtle',    hsl($hue, saturation, lightness - 10))
  colors.set('--ui-c-primary-highlight', hsl($hue, saturation, lightness + 10))
  colors.set('--ui-c-dark',              hsl($hue, 0, 15 ))
  colors.set('--ui-c-dark-subtle',       hsl($hue, 0, 10))
  colors.set('--ui-c-dark-highlight',    hsl($hue, 0, 20))
  colors.set('--ui-c-light',             hsl($hue, 0, 85))
  colors.set('--ui-c-light-subtle',      hsl($hue, 0, 80))
  colors.set('--ui-c-light-highlight',   hsl($hue, 0, 90))
  colors.set('--ui-c-light-highlight',   hsl($hue, 0, 90))
  colors.set('--ui-c-ghost-light',       hsla($hue, 0, 90, .05))
  colors.set('--ui-c-ghost-dark',        hsla($hue, 0, 10, .1))
const borders = new Map()
  borders.set('--ui-border-radius-none', 0)
  borders.set('--ui-border-radius-small', '.25em')
  borders.set('--ui-border-radius-medium', '.5em')
  borders.set('--ui-border-radius-large', '1em')
  borders.set('--ui-border-radius-circle', '50%')
  borders.set('--ui-border-radius-pill', '9999px')
const theme = new Map()
  theme.set('--ui-font', 'Rubik')
  theme.set('--ui-base-unit', '16px')
  theme.set('--ui-theme-font', getProp('c-light'))
  theme.set('--ui-theme-background', getProp('c-dark-highlight'))
  //? Btn
  theme.set('--btn-scale', 1)
  theme.set('--btn-width', 'min-content')
  theme.set('--btn-height', 'auto')
  theme.set('--btn-padding', '.25em .75em')
  theme.set('--btn-color', 'currentColor')
  theme.set('--btn-background', 'transparent')
  theme.set('--btn-border', 'none')
  theme.set('--btn-border-radius', 'var(--ui-border-radius-small)')
  theme.set('--btn-gap', '.35em')
  theme.set('--btn-font', '.35em')
  //? Radio
  theme.set('--radio-scale', 1)
  theme.set('--radio-color', 'currentColor')
  theme.set('--radio-background', getProp('ghost-light'))
  theme.set('--radio-border-radius', getProp('radius-circle'))
  //? Input
  theme.set('--input-scale', 1)
  theme.set('--input-height', 'auto')
  theme.set('--input-width', '20em')
  theme.set('--input-border-radius', getProp('radius-small'))
  theme.set('--input-background', getProp('c-ghost-light'))
  theme.set('--input-color', getProp('c-light'))
  theme.set('--input-padding', '0.5em 0.75em')
  // theme.set('--input-height', 'auto')

  //? State
  theme.set('--state-active-border', 'hsla(0, 0%, 50%, 0.3)')
  theme.set('--state-active-border-width', '0.2em')
  theme.set('--state-active-shadow', `0 0 0 ${getProp('state-active-border-width')} ${getProp('state-active-border')}`)





  
  


// export const baseProps = () => new Map([...colors, ...borders, ...theme])
function baseProps() {
  return new Map([...colors, ...borders, ...theme ])
}

export const buildBaseProps = () => Object.fromEntries(baseProps().entries())
export const colorClasses = () => colors
export function find(str: string) {
  for(let key of baseProps().keys()) {
    let re=new RegExp(`${str}`)
    if(re.test(key)) {
      return key
    }
  }
  return ''
}
