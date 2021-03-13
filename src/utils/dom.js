// 创建Dom
export const createElement = ({
  tag,
  options,
  props,
  on,
  parent,
  children,
  ns
}) => {
  let ele = document.createElement(tag)
  for (let key in options) {
    if (options[key] !== undefined) {
      switch (key.toLocaleLowerCase()) {
        case 'class':
          ele.className = options[key]
          break
        case 'id':
          ele[key] = options[key]
          break
        case 'innertext':
        case 'innerhtml':
          if (['div', 'button', 'legend', 'span'].includes(tag)) {
            ele[key] = options[key]
          } else {
            ele.setAttribute(key, options[key])
          }
          break
        case 'value':
          if (['input', 'option'].includes(tag)) {
            ele[key] = options[key]
          } else {
            ele.setAttribute(key, options[key])
          }
          break
        case 'click': // 点击事件
          ele.addEventListener('click', options[key], false)
          break
        case 'focus':
          ele.addEventListener('focus', options[key], false)
          break
        case 'blur':
          ele.addEventListener('blur', options[key], false)
          break
        case 'change':
          ele.addEventListener('change', options[key], false)
          break
        case 'onchange':
          ele.onchange = options[key]
          break
        case 'input': // 输入事件
          ele.oninput = options[key]
          break
        case 'options': // 下拉选项
          if (tag === 'select') {
            options[key].forEach(t => {
              let opt = new Option(t, t)
              if (options.value === t) {
                opt.selected = true
              }
              ele[key].add(opt)
            })
          }
          break
        case 'children':
        case 'slot':
          this._appendTo(ele, options[key])
          break
        case 'style':
        case "css":
          this._css(ele, options[key])
          break;
        default:
          if (_.isObject(options[key])) {
            console.log(options[key])
          } else {
            ele.setAttribute(key, options[key])
          }
          break
      }
    }
  }
  parent && parent.appendChild(ele)
  if (children) {
    this.deelArray(
      children,
      t => {
        if (this.isDom(t)) {
          ele.appendChild(t)
        } else {
          ele.appendChild(this._createEle(t.tag, {
            ...t.props,
            ...t.on
          }))
        }

      }
    )
  }
  return ele
}

const _attr = (el, pops) => {
  Object.keys(pops).forEach(t => el.setAttribute(t, pops[t]))
}
const _appendChild = (parent, child, props) => {
  if (Array.isArray(child)) {
    child.forEach(t => {
      _appendChild(parent, t, props)
    })
  } else if (child) {
    props && _attr(child, pops)
    parent.appendChild(child)
  }
}

export default {
  createElement,
  _attr,
  _appendChild
}