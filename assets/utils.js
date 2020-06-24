
/**
 * Creates sequense of symbols
 * that are not quaranteed to be unique
 *
 * @param {number} length - length of minihash
 * @param {string} include - l: lowercase, u: uppercase: n: number, s: special
 * @returns {string} - sequence of random symbols
 *
 */


export const minihash = ( length = 10, include = 'luns' ) => {

  let chars, c, r = ''

  chars = {
    l: 'abcdefghijklmnopqrstuvwxyz',
    u: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    n: '0123456789',
    s: "_" // ~!@#$%^&()_+-={}[];',
  }

  c = [...include].map(_ => chars[_]).join('')

  while(length--)
    r += c.charAt( Math.floor( Math.random() * c.length) )

  return r
}


/**
 * Creates sequense of symbols
 * that are not quaranteed to be unique
 *
 * @param {string | object} opts - charset | config
 * @returns {object} - generate fn
 *
 */

export const minihashFactory = opts => {

  let _c = ''
  const _length = opts && opts.length
        ? opts.length
        : 10
  const _charset = opts && opts.charset && typeof opts.charset === 'object'
        ? opts.charset
        : {}
  const _include = opts && opts.include && typeof opts.include === 'string' && opts.include.length
        ? opts.include
        : 'luns'

  if(typeof opts === 'string') {
    _c = opts
  }

  if(typeof opts === 'object' || !opts) {

    let chars = Object.assign({}, {
      l: 'abcdefghijklmnopqrstuvwxyz',
      u: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      n: '0123456789',
      s: '_' // ~!@#$%^&()_+-={}[];',
    }, _charset)

    _c = [..._include].map(_ => chars[_]).join('')

  }

  return {
    generate(length) {
      let r = '',
          l = length || _length
      while(l--)
        r += _c.charAt( Math.floor( Math.random() * _c.length) )
      return r
    }
  }
}

export const nanohash = len => Math.random().toString(36).slice(-Math.abs(len || 8))
