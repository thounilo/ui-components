/**
 * Creates sequense of symbols
 * that are not quaranteed to be unique
 *
 * @param {number} length - Character count
 * @param {string} include - l: lowercase, u: uppercase, n: number, s: special
 * @returns {string} String of random characters
 *
 */

interface BaseObject {
  [key: string]: string
}

export const minihash = (length = 10, include = 'luns'): string => {
  let chars: BaseObject = {
    l: 'abcdefghijklmnopqrstuvwxyz',
    u: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    n: '0123456789',
    s: '_',
  }

  let c = [...include.toLowerCase()].map(_ => chars[_]).join('')
  let r = ''

  while (length--) {
    r += c.charAt(Math.floor(Math.random() * c.length))
  }

  return r
}

interface MinihashFactoryOptions {
  length?: number
  charset?: string | object
  include?: string
}
interface MinihashFactory {
  generate: Function
}
/**
 * Creates sequense of symbols
 * that are not quaranteed to be unique
 *
 * @param {string | object} opts - charset | config
 * @returns {object} generate(length)
 *
 */
export const minihashFactory = (
  opts: MinihashFactoryOptions
): MinihashFactory => {
  const _length = opts?.length ? opts.length : 10
  const _charset =
    opts?.charset && typeof opts?.charset === 'object' ? opts.charset : {}
  const _include =
    opts?.include && typeof opts?.include === 'string' ? opts.include : 'luns'

  let _c = ''
  if (typeof opts === 'string') {
    _c = opts
  }

  if (typeof opts === 'object' || !opts) {
    let chars: BaseObject = Object.assign(
      {},
      {
        l: 'abcdefghijklmnopqrstuvwxyz',
        u: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        n: '0123456789',
        s: '_',
      },
      _charset
    )

    _c = [..._include].map(i => chars[i]).join('')
  }

  return {
    generate(length: number) {
      let r = '',
        l = length || _length
      while (l--) r += _c.charAt(Math.floor(Math.random() * _c.length))
      return r
    },
  }
}

/**
 * Creates sequense of symbols
 * that are not quaranteed to be unique
 *
 * @param {number} length - Character count
 * @returns {string} String of random characters
 *
 */
export const nanohash = (len = 8) =>
  Math.random()
    .toString(36)
    .slice(-Math.abs(len))
