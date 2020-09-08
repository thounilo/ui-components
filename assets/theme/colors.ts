
import {hsl} from './util'

const hue = 55
const saturation = 40
const lightness = 55
const $hue = 'var(--ui-c-hue)'
export const colors = new Map()

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

// TODO Generic colors, green, red, yellow etc..

export function find(str: string) {
  for(let key of colors.keys()) {
    let re=new RegExp(`${str}`)
    if(re.test(key)) {
      return key
    }
  }
  return ''
}

export function getProp(str: string) {
  return `var(${find(str)})`
}
export const buildBaseProps = () => Object.fromEntries(colors.entries())
  // export const colors = {
  //   primary: {
  //     prop: '--ui-c-primary',
  //     value: hsl(hue, saturation, lightness)
  //   },
  //   primarySubtle: {
  //     prop: '--ui-c-primary-subtle',
  //     value: hsl(hue, saturation, lightness - 10)
  //   },
  //   primaryHighlight: {
  //     prop: '--ui-c-primary-highlight',
  //     value: hsl(hue, saturation, lightness + 10)
  //   },
  //   dark: {
  //     prop: '--ui-c-dark',
  //     value: hsl(hue, 0, 15)
  //   },
  //   darkSubtle: {
  //     prop: '--ui-c-dark-subtle',
  //     value: hsl(hue, 0, 10)
  //   },
  //   darkHighlight: {
  //     prop: '--ui-c-dark-highlight',
  //     value: hsl(hue, 0, 20)
  //   },
  //   light: {
  //     prop: '--ui-c-light',
  //     value: hsl(hue, 0, 85)
  //   },
  //   lightSubtle: {
  //     prop: '--ui-c-light-subtle',
  //     value: hsl(hue, 0, 80)
  //   },
  //   lightHighlight: {
  //     prop: '--ui-c-light-highlight',
  //     value: hsl(hue, 0, 90)
  //   },
  // }
