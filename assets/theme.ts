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
      prop: {
        type: Boolean,
        default: false,
      },
    },
  },
}

export const values = {
  scaleBase: 1,
  scaleTiny: 0.75,
  scaleSmall: 0.9,
  scaleMedium: 1.15,
  scaleLarge: 1.3,
  scaleGiant: 1.5,
}
