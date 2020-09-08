
import merge from 'lodash/merge'

import {getProp} from '../../assets/theme/cssProps'
import styleProps from './styleProps'

export const env = {
  isDark: true
}


const styles:any={
  ghost: {
    color: env.isDark ? getProp('c-primary') : getProp('c-dark'),
    background: env.isDark ? getProp('c-ghost-light') : getProp('c-ghost-dark')
  },
  raised: {
    boxShadow: '0.11em 0.11em 0em 0em hsla(0, 0%, 0%, 0.3), -0.06em -0.06em .05em 0em hsla(0, 0%, 100%, 0.1)'
  },
  fill: {
    color: getProp('c-dark'),
    background: getProp('c-primary')
  },
  outline: {
    color: getProp('c-primary'),
    border: '2px solid ' + getProp('c-primary')
  },
  fluid: {
    width: '100%',
  },
  inputFill: {
    background: getProp('c-primary'),
    color: getProp('c-dark-subtle'),
    border: 'none',
  }
}

const classes = {
  uppercase: 'uppercase',
  fluid: 'w-full'
}
    
function _props(v:string|string[]) {
  if(Array.isArray(v)) {
    let _s={} 
    for(let x of v) {
      Object.assign(_s, styles[x])
    }
    return _s
  } else {
    return styles[v]
  }
}

function use(s: string) {
  return styles[s]
}

const _styleProps = (prefix: string, ...args: object[]) => {
 let props={}
  for(let arg of args) {
    merge(props, arg)
  }
  let sProps = styleProps(prefix, props)
  return sProps
}

import { minihash } from '../minihash'


function getClasses() {
  const themeClass = `_${minihash(10, 'lu')}`
  const themeSelector = `.${themeClass}`
  return { themeClass, themeSelector }
}

export default{
  env,
  use,
  styles,
  classes,
  getClasses,
  props: _props,
  styleProps: _styleProps
}