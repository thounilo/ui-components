const kebabCase = (s: string) =>
  s.replace(/([a-z])([A-Z])/g, '$1-$2')
   .replace(/\s+/g, '-')
   .toLowerCase()

export const cssString = (styles: object | string) =>
  typeof styles === 'string'
    ? styles
    : Object.entries(styles)
        .map(([p, v]) => (p ? `\n  ${kebabCase(p)}: ${v};` : false))
        .filter(Boolean)
        .reduce((prev: string, curr) => (prev += curr), '')

//? Should include id aswell
// const className = (s: string) => (/\./.test(s) ? s : `.${s}`)
const className = (s: string) => s

const hasData = (v: string|object) => {
  if (typeof v === 'string') return v.length
  if (typeof v === 'object') return Object.keys(v).length
  throw new Error(`${v} has no data`)
}

function globalCSS(id: string) {
  const _style = document.createElement('style')
  _style.type = 'text/css'
  _style.id = id || 'style-css'

  const _sheet = _style.sheet

  document.head.appendChild(_style)

  return {
    insert: (s: string, css: object) => {
      try {
        
        hasData(s)
        hasData(css)

        _style.appendChild(
          document.createTextNode(`${className(s)} { ${cssString(css)}\n}`)
        )
      } catch(e) {
        console.error(e.message)
      }
    },
    delete: (s: string) => {
      if (!s) {
        console.warn('Invalid selector, got: %s', s)
        return
      }

      let _s = className(s)

      let c = _style.childNodes.length

      while (c--) {
        const node = _style.childNodes[c]

        if(!node.textContent || 
           !node.textContent.length || 
           !node.textContent.includes(_s) ||
           !node || 
           !node.parentNode
        ) {
          continue
        }

        node.parentNode.removeChild(node)

        if(!_style.childNodes.length) {
          document.head.removeChild(_style)
        }
      }
    },
    clear: () => {
      document.head.removeChild(_style)
    },
    styleSheet: () => _sheet,
  }
}

export default globalCSS
