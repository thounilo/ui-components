const kebabCase = (s: string) =>
  s.replace(/([a-z])([A-Z])/g, '$1-$2')
   .replace(/\s+/g, '-')
   .toLowerCase()

const cssString = (styles: object | string) =>
  typeof styles === 'string'
    ? styles
    : Object.entries(styles)
        .map(s => (s[1] ? `${kebabCase(s[0])}:${s[1]};` : false))
        .filter(Boolean)
        .reduce((prev: string, curr) => (prev += curr), '')

//? Should include id aswell
const className = (s: string) => (/\./.test(s) ? s : `.${s}`)

const hasData = (v: string|object) => {
  if (typeof v === 'string') return v.length
  if (typeof v === 'object') return Object.keys(v).length
  return false
}

function globalCSS(id: string) {
  const _style = document.createElement('style')
  _style.type = 'text/css'
  _style.id = id || 'style-css'

  const _sheet = _style.sheet

  document.head.appendChild(_style)

  return {
    insert: (s: string, css: object) => {
      //TODO Find way to use Element as parameter s
      //* s instanceof Element

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

    delete: (s: string) => {
      if (!s) {
        console.warn('Invalid selector, got: %s', s)
        return
      }

      let _s = className(s)

      let c = _style.childNodes.length

      while (c--) {
        let nodes = _style.childNodes
        let node = nodes[c]
        let styleNode = _style.childNodes[c]

        if(node.textContent === null || !node.textContent.length) {
          continue
        }

        if(!node.textContent.includes(_s)) {
          continue
        }
        
        if(!styleNode || styleNode.parentNode === null) {
          continue 
        }

        styleNode.parentNode.removeChild(_style.childNodes[c])
      }
    },

    styleSheet: () => _sheet,
  }
}

export default globalCSS
