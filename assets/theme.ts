export const theme = {
  scale: {
    base: {
      value: 1,
      class: '--ui-scale-base',
      prop: Boolean,
    },
    tiny: {
      value: 0.75,
      class: '--ui-scale-tiny',
      prop: Boolean,
    },
    small: {
      value: 0.9,
      class: '--ui-scale-small',
      prop: Boolean,
    },
    medium: {
      value: 1.15,
      class: '--ui-scale-medium',
      prop: Boolean,
    },
    large: {
      value: 1.3,
      class: '--ui-scale-large',
      prop: Boolean,
    },
    giant: {
      value: 1.5,
      class: '--ui-scale-giant',
      prop: Boolean,
    },
  },
}

export const getTypes = (query: Array<string>) => {
  if (query.length === 2) {
    const type: string = query[0]
    const prop: string = query[1]
    return Object.entries(theme[type][prop])
    // return {}
  } else {
    console.log('need 2 arguments ex. ["scale", "prop"]')
  }
}

export default getTypes
