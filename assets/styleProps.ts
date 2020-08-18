interface StyleProps {
  [key: string]: string
}

const isCustomProp = (prop: string) => prop.slice(0, 2) === '--'

const kebabCase = (propName: string) =>
  propName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()

/**
 * Layout
 *  - width
 *  - height
 *  - padding
 *  - margin
 *
 * Style
 *  - color
 *  - background
 *  - border
 *  - border-radius
 *  - box-shadow
 *
 * Display
 *  - display
 *  - align-items
 *  - justify-content
 *
 *
 */

const positionInset = (value: string) => {
  // - - 0 0

  let obj = {
    positionTop: 'initial',
    positionLeft: 'initial',
    positionBottom: 'initial',
    positionRight: 'initial',
  }
  console.log('positionInset parameter value', value)
  if (value.charAt(0) === ' ') {
    value = value.slice(1)
  }

  let comps = value.split(' ')
  console.log('positionInset comps', comps)
  //* top
  if (comps[0] !== '-') {
    obj.positionTop = comps[0]
  }

  //* left
  if (comps[1] !== '-') {
    obj.positionLeft = comps[1]
  }

  //* bottom
  if (comps[2] !== '-') {
    obj.positionBottom = comps[2]
  }

  //* right
  if (comps[3] !== '-') {
    obj.positionRight = comps[3]
  }
  console.log('positionInset return', obj)
  return obj
}

/**
 * Takes in vue styleProps prop and generates custom css variables
 * @param props css styles
 * @param prefix prefix props to avoid cascading
 */
export const styleProps = (
  props: object,
  prefix: string = ''
): StyleProps | {} => {
  if (Object.keys(props).length) {
    const _prefix = prefix.length ? `--${prefix}-` : '--'

    let returnObject: any = {}

    for (let [prop, value] of Object.entries(props)) {
      if (isCustomProp(prop)) {
        prop = prop.slice(2)
      }

      if (prop === 'inset') {
        let insets = positionInset(value)
        if (Object.keys(insets).length) {
          for (let [insetProp, insetValue] of Object.entries(insets)) {
            insetProp = `${_prefix}${kebabCase(insetProp)}`
            returnObject[insetProp] = insetValue
          }
        }
        continue
      }

      prop = `${_prefix}${kebabCase(prop)}`
      returnObject[prop] = value
    }

    return returnObject
  } else {
    return {}
  }
}
export default styleProps

//   return Object.entries(props).map(propObj => {
//     let prop = propObj[0]
//     let value = propObj[1]

//     if (isCustomProp(prop)) {
//       prop = prop.slice(2)
//     }

//     if (prop === 'inset') {
//     }

//     prop = `${_prefix}${kebabCase(prop)}`

//     return { [prop]: value }
//   })
// } else {
//   return {}
// }
