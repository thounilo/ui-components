const kebabCase = string =>
  string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()

const cssString = styles =>
  typeof styles === 'string'
    ? styles
    : Object.entries(styles)
        .map(s => (s[1] ? `${kebabCase(s[0])}:${s[1]};` : false))
        .filter(Boolean)
        .reduce((prev, curr) => (prev += curr), '')

//? Should include id aswell
const className = s => (/\./.test(s) ? s : `.${s}`)

const hasData = v => {
  if (typeof v === 'string') return v.length
  if (typeof v === 'object') return Object.keys(v).length
  return false
}

function globalCSS(id) {
  const _style = document.createElement('style')
  _style.type = 'text/css'
  _style.id = id || 'style-css'

  const _sheet = _style.sheet

  document.head.appendChild(_style)

  return {
    insert: (s, css) => {
      if (!hasData(s)) {
        console.warn('Invalid selector, got: %s', s)
        return
      }

      if (!hasData(css)) {
        console.warn('Invalid css, got:', css)
        return
      }

      const selector = className(s)
      const cssStyles = cssString(css)

      _style.appendChild(
        document.createTextNode(`${selector} { ${cssStyles} }`)
      )
    },

    delete: s => {
      if (!s) {
        console.warn('Invalid selector, got: %s', s)
        return
      }

      let _s = className(s)

      let c = _style.childNodes.length

      while (c--) {
        let nodes = _style.childNodes
        if (!!nodes[c] && nodes[c].textContent.includes(_s)) {
          _style.childNodes[c].parentNode.removeChild(_style.childNodes[c])
        }
      }
    },

    styleSheet: () => _sheet,
  }
}

export default globalCSS
