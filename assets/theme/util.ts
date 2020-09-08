export const hsl = (
  hue: number | string,
  saturation: number,
  lightness: number 
) => `hsl(${hue}, ${saturation}%, ${lightness}%)`

export const hsla = (
  hue: number | string,
  saturation: number,
  lightness: number,
  alpha: Number
) => `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
