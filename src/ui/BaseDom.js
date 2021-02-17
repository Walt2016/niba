import _ from '../utils/index'
export default class BaseDom {
  constructor(options) {
    Object.assign(
      this, {
        labels: {
          o: 'center',
          r: 'radius',
          n: 'edge',
        },
      },
      options
    )
    this.initEl()
    this.setData(options.data)
  }
  // 初始化el
  initEl() {
    let container = this._query(this.el) || document.body
    let el = this._div({
      id: 'wrapper',
    })
    this._appendTo(container, el)
    this.el = el
  }
  // 渲染接口
  render() {}
  setData(data) {
    // 解析字段
    this.parser(data)
    // 渲染
    this.render()
  }
  // 解析
  parser(data = this.data) {
    if (_.isObject(data)) {
      this.fields = []
      this.group = []
      this.parseFields(data, this.options, this.labels)
    }
  }
  // 入参转换 dataModel 数据 options 参数  labels参数字典
  parseFields(data = {}, options = {}, labels = {}, group) {
    for (let key in data) {
      let child = data[key]
      let fieldKey = group ? [group, '$', key].join('') : key
      if (_.isObject(child)) {
        // 子对象分成一组
        this.parseFields(child, options, labels, fieldKey)
      } else {
        let label = labels[key] ? labels[key] : key
        let field = {
          name: key,
          key: fieldKey,
          label,
          value: data[key],
          type: _.type(data[key]),
        }
        // 必填项
        let required = this.required.includes(field.key)
        if (required) {
          field.required = required
        }
        // 格式校验
        let validated = this.validated[field.key]
        if (validated) {
          field.validated = validated
        }
        // 下来选项
        let fieldOptions = this.getOptions(options, fieldKey)
        if (Array.isArray(fieldOptions)) {
          field.type = 'select'
          field.options = fieldOptions
        }
        // 装载field
        this.fields[this.fields.length] = field
        // 展示状态
        let status = false
        if (key === 'show' || key === 'use') {
          status = field.value
        }
        // 二级分组
        // this.groupFields(group || "global", field, status)

        this.storeGroup(this.group, field, status)
      }
    }
  }
  // 下拉选项
  getOptions(options, fieldKey) {
    if (!options) return
    let arr = fieldKey.split('$')
    let key = arr[0]
    if (arr.length > 1) {
      return this.getOptions(options[key] || options, arr.slice(1).join('$'))
    } else if (arr.length === 1) {
      return options[key]
    }
  }
  // 字段分组 二级分组
  groupFields(group, field, status) {
    let label = group.split('$')[0]

    let item = this.group.find(t => t.label === label)
    if (item) {
      item.fields.push(field)
      if (status) item.status = true
    } else {
      this.group[this.group.length] = {
        label: group,
        fields: [field],
        status,
      }
    }
  }
  // 分组
  storeGroup(group, field, status, groupkey) {
    let arr = (groupkey || field.key).split('$')
    if (!groupkey) {
      groupkey = arr.length > 1 ? arr[0] : 'global'
    }
    // if (['line', 'dashLine'].includes(groupkey)) {
    //   groupkey = 'global'
    //   arr.unshift('global')
    //   field.key=arr.join('$')
    // }


    let item = group.find(t => t.key === groupkey)
    if (item) {
      if (arr.length === 1 || arr.length === 2) {
        item.fields.push(field)
        if (status) item.status = true
      } else if (arr.length === 3) {
        let childKey = arr.slice(0, 2).join('$')
        let childgroup = item.fields

        this.storeGroup(childgroup, field, status, childKey)
      }
    } else {
      if (Array.isArray(group)) {
        group.push({
          label: groupkey.split('$').pop(),
          key: groupkey,
          fields: [field],
          status,
        })
      }
    }
  }
  // 字段分组
  groupFieldsByConfig(group, fields) {
    return group.map(item => {
      for (let key in item) {
        return {
          label: key,
          fields: item[key].map(t => {
            let field = fields.find(
              f => f.key.toLocaleLowerCase() === t.toLocaleLowerCase()
            )
            // 显示去掉分组前缀
            let label = field.label.replace(
              new RegExp(key + '(\\w+)', 'i'),
              '$1'
            )
            return {
              ...field,
              label,
            }
          }),
        }
      }
    })
  }

  // 数据模型
  _dataModel(fields = this.fields, form = this.form) {
    let model = {}
    if (fields) {
      fields.forEach(t => {
        let val = this._get(t, form)
        let key = t.key
        this.storeModel(model, key, val)
      })
    }
    return model
  }
  // 多级对象 {key:{key:{Key:val}}}
  storeModel(model, key, val) {
    let arr = key.split('$')
    if (arr.length > 1) {
      let group = arr[0]
      if (!model[group]) {
        model[group] = {}
      }
      let child = model[group]
      let childKey = arr.slice(1).join('$')
      this.storeModel(child, childKey, val)
    } else if (arr.length === 1) {
      model[key] = val
    }
  }

  // 随机数
  _random() {
    return '_' + Math.random().toString(16).slice(2)
  }
  // 查询简易
  $(el, parent) {
    return this._query(el, parent)
  }
  // 查询
  _query(el, parent) {
    if (parent) {
      if (typeof parent === 'string') {
        if (parent.charAt(0).match(/[\#\.]/)) {
          return document.querySelector(parent + ' ' + el)
        }
        return document.querySelector('#' + parent + ' ' + el)
      }
      // return document.querySelector("#" + parent.id + " " + el)
      if (parent.id) {
        return document.querySelector('#' + parent.id + ' ' + el)
      } else {
        parent.id = this._random()
        return document.querySelector('#' + parent.id + ' ' + el)
      }
    }
    return this.isDom(el) ? el : document.querySelector(el)
  }

  _queryAll(el, parent) {
    let id = el
    if (parent) {
      if (typeof parent === 'string') {
        if (parent.charAt(0).match(/[\#\.]/)) {
          id = parent + ' ' + el
        } else {
          id = '#' + parent + ' ' + el
        }
      } else if (this.isDom(parent)) {
        if (parent.id) {
          id = '#' + parent.id + ' ' + el
        } else {
          parent.id = this._random()
          id = '#' + parent.id + ' ' + el
        }
      }
    }
    return Array.from(document.querySelectorAll(id))
  }

  //上溯节点
  _closest(el, cls) {
    if (!el.parentNode) {
      //document  ie8不支持parentNode
      return null
    } else if (
      cls.charAt(0) === '.' &&
      el.className.split(' ').includes(cls.substring(1))
    ) {
      return el
    } else if (
      cls.charAt(0) === '#' &&
      el.id.toLowerCase() === cls.substring(1).toLowerCase()
    ) {
      return el
    } else if (el.tagName.toLowerCase() === cls.toLowerCase()) {
      return el
    } else {
      return this._closest(el.parentNode, cls)
    }
  }

  // 追加节点
  _appendTo(el, child, props) {
    if (Array.isArray(child)) {
      child.forEach(t => this._appendTo(el, t, props))
    } else if (child) {
      props && this._attr(child, props)
      el.appendChild(child)
    }
    return el
  }
  // 创建Dom
  _createEle(tag, options, parent) {
    let ele = document.createElement(tag)
    for (let key in options) {
      if (options[key] !== undefined) {
        switch (key.toLocaleLowerCase()) {
          case 'class':
            ele.className = options[key]
            break
            // case "name":
          case 'id':
            ele[key] = options[key]
            break
          case 'innertext':
          case 'innerhtml':
            if (['div', 'button', 'legend'].includes(tag)) {
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
            // options[key] && ele.appendChild(options[key])
            break
          default:
            ele.setAttribute(key, options[key])
            break
        }
      }
    }
    parent && parent.appendChild(ele)
    return ele
  }

  _div(options, parent) {
    let innerText = options['innerText'] || options['text']
    return this._createEle(
      'div', {
        ...options,
        innerText,
      },
      parent
    )
  }

  _icon(options, parent) {
    return this._createEle(
      'i', {
        ...options,
        class: 'icon ' + options.class,
      },
      parent
    )
  }

  //允许一次加多个样式
  //去重
  _addClass(el, cls) {
    if (Array.isArray(el)) {
      el.forEach(t => {
        this._addClass(t, cls)
      })
      return el
    }
    var arr1 = el.className.split(' ').map(t => t.toLocaleLowerCase())
    var arr2 = cls.split(' ').map(t => t.toLocaleLowerCase())
    el.className = Array.from(new Set([...arr1, ...arr2])).join(' ')
    return el
  }
  _removeClass(el, cls) {
    if (Array.isArray(el)) {
      el.forEach(t => {
        this._removeClass(t, cls)
      })
      return el
    }
    var arr1 = el.className.split(' ').map(t => t.toLocaleLowerCase())
    var arr2 = cls.split(' ').map(t => t.toLocaleLowerCase())
    var obj = {}
    arr1.forEach(t => {
      if (arr2.indexOf(t) === -1) {
        obj[t] = 1
      }
    })
    el.className = Object.keys(obj).join(' ')
    return el
  }
  _hasClass(el, cls) {
    var arr = el.className.split(' ').map(t => t.toLocaleLowerCase())
    return arr.includes(cls.toLocaleLowerCase())
  }
  _toggle(el, cls, codition) {
    if (Array.isArray(el)) {
      el.forEach(t => {
        this._toggle(t, cls, codition)
      })
    } else {
      if (_.type(cls) === 'string') {
        if (codition !== undefined) {
          this[codition ? '_addClass' : '_removeClass'](el, cls)
        } else {
          this[!this._hasClass(el, cls) ? '_addClass' : '_removeClass'](el, cls)
        }
      } else if (_.type(cls) === 'function') {
        cls(el, codition)
      }
    }
  }
  _getFormItem(field, form) {
    let key = field.key
    let formitem = this._query("[key='" + key + "']", form)
    return formitem
  }
  _getField(el) {
    let key
    if (this.isDom(el)) {
      key = el.getAttribute('key')
      return this.fields.find(t => t.key === key)
    } else if (_.type(el) === 'string') {
      key = el
      return this.fields.find(t => t.key === key)
    }
  }
  // get value
  _get(field, form) {
    // if (this.isDom(field)) {
    //     return this._attr(field, "value")
    // }
    let formitem = this._getFormItem(field, form)
    if (formitem) {
      let value = formitem.value
      switch (field.type) {
        case 'number':
          return Number(value)
          break
        case 'object':
          return JSON.parse(value)
          break
        case 'array':
          if (/\[.*?\]/.test(value)) {
            return JSON.parse(value)
          } else {
            return value.split(',').map(t => +t)
          }

          break
        case 'boolean':
          return formitem.checked
          break
        case 'select':
        default:
          return value
      }
    }
  }
  // set value
  _set(key, value) {
    let field = this.fields.find(t => t.key === key)
    if (field) {
      let formitem = this._getFormItem(field, form)
      switch (field.type) {
        case 'number':
          formitem.value = Number(value)
          break
        case 'object':
          formitem.value = JSON.parse(value)
          break
        case 'array':
          if (/\[.*?\]/.test(value)) {
            formitem.value = JSON.parse(value)
          } else {
            formitem.value = value.join(',')
          }

          break
        case 'boolean':
          formitem.value = formitem.checked
          break
        case 'select':
        default:
          formitem.value = value
          break
      }
    }
  }
  // get or set attribute
  _attr(el, pops, val) {
    if (_.isObject(pops)) {
      Object.keys(pops).forEach(t => el.setAttribute(t, pops[t]))
    } else if (_.type(pops) === 'string') {
      if (val) {
        el.setAttribute(pops, val)
      }
      return el.getAttribute(pops)
    }
  }
  // 样式
  _css(el, pops) {
    if (_.isObject(pops)) {
      let css = Object.keys(pops)
        .map(t => `${t}:${pops[t]}`)
        .join(';')
      el.setAttribute('style', css)
    }
  }
  // 兄弟节点
  _siblings(el) {
    return Array.from(el.parentNode.children)
  }
  // 菜单actived
  _actived(el) {
    this._removeClass(this._siblings(el), 'actived')
    this._addClass(el, 'actived')
  }
  // 隐藏
  _hide(el) {
    this._removeClass(el, 'show')
  }
  // 显示
  _show(el) {
    this._addClass(el, 'show')
  }
  // 判断是dom节点
  // "htmldivelement" === _.type(el)
  isDom(el) {
    return typeof HTMLElement === 'function' ?
      el instanceof HTMLElement :
      el &&
      typeof el === 'object' &&
      el.nodeType === 1 &&
      typeof el.nodeName === 'string'
  }
  inRange(range, value) {
    return range[0] <= value && value <= range[1]
  }
  // 校验
  _validate(el) {
    let callback = el => {
      let field = this._getField(el)
      if (!field) return
      this._checkRequired(el, field)
      let validated = field.validated

      if (validated) {
        let value = el.value
        validated.max &&
          this._tips(el, field, +value > validated.max, validated.message)
        validated.min &&
          this._tips(el, field, +value < validated.min, validated.message)
        validated.format &&
          this._tips(
            el,
            field,
            !validated.format.test(value),
            validated.message
          )
        validated.range &&
          this._tips(
            el,
            field,
            !this.inRange(validated.range, +value),
            validated.message
          )
      }
    }
    if (el) {
      callback(el)
    } else {
      // 全量检查
      this.fields.forEach(t => {
        let el = this._getFormItem(t)
        callback(el)
        // t.validated && this._toggle(el, callback, el.value === "")
      })
    }
  }

  // 提示
  _tips(el, field, condition, message) {
    let formItem = this._closest(el, '.form-item')
    let tips =
      this._query('.tips', formItem) ||
      this._div({
          class: 'tips',
        },
        formItem
      )
    if (condition) {
      this._addClass(el, 'required')
      let style = window.getComputedStyle(el)
      let {
        width,
        height
      } = style
      let offset = parseInt(width) + 40
      let {
        offsetLeft,
        offsetTop
      } = el
      this._show(tips)
      this._css(tips, {
        left: offsetLeft - offset + 'px',
        top: offsetTop + 'px',
        width: offset + 'px',
        height,
      })
      // let field = this._getField(el)
      tips.innerText =
        (message &&
          message.replace(/({\d})/, (_, m) => {
            return field.label
          })) ||
        `${field.label}值不能为空`
      // tips.innerText = `${field.label}值不能为空`
    } else {
      this._removeClass(el, 'required')
      this._hide(tips)
    }
  }

  // 判断是否为空
  _checkRequired(el, field) {
    let callback = (el, condition) => {
      this._tips(el, field, condition)
    }
    if (el) {
      // let field = this._getField(el)
      // 判断空 校验
      field.required && this._toggle(el, callback, el.value === '')
    } else {
      // 全量检查
      this.fields.forEach(t => {
        let el = this._getFormItem(t)
        t.required && this._toggle(el, callback, el.value === '')
      })
    }
  }
  // 阻止冒泡
  _stopProp(e) {
    // var e = (evt) ? evt : window.event;
    if (window.event) {
      e.cancelBubble = true // ie下阻止冒泡
    } else {
      //e.preventDefault();
      e.stopPropagation() // 其它浏览器下阻止冒泡
    }
  }
  _fieldset(name, parent) {
    let fieldset = this._createEle('fieldset', {}, parent)
    let legend = this._createEle(
      'legend', {
        innerText: name,
      },
      fieldset
    )
    return fieldset
  }
}