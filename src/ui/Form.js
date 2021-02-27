import Panel from './Panel'
import SliderBar from './Sliderbar'

export default class Form extends Panel {
  constructor(options) {
    super(options)
  }
  // 实现接口
  render() {
    let el = this.el
    let form = this._panelWrap()
    el.appendChild(form)
  }

  _panelWrap(options) {
    let { el, fields = [], btn, btns = [], title, group = [] } = options || this
    let tools = this._tools(btns.length > 0 ? btns : btn, fields, group)
    this.dataModelChanged = el => {
      this._validate(el)
      // this._checkRequired(el)
      let dataModel = this._dataModel(fields, form)
      this.data.redraw(dataModel)
      // let btn = btns.find(t => t.name === "submit")
      // btn && btn.click(dataModel)
      // 保存local
      localStorage.setItem('dataModel', JSON.stringify(dataModel))
      // this.data.draw(dataModel)
    }
    // 监控子元素的输入事件
    this['input'] = e => {
      console.log(e.target)
      this.dataModelChanged(e.target)
    }
    this['onchange'] = e => {
      console.log('changed')
    }

    let form = this._panel({
      title,
      class: 'ui',
      body: this.tabs
        ? this._tabs()
        : this.group
        ? this._group()
        : this._form(),
      tools,
    })
    this._appendTo(el, form)
    return form
  }
  // 表单
  _form(options) {
    let {
      fields = [],
      input = e => {
        console.log(e)
      },
    } = options || this

    let form = this._div({
      class: 'form',
    })

    fields.forEach(t => {
      this._formItem(
        {
          ...t,
          input,
        },
        form
      )
    })
    return form
  }

  // 按钮
  _tools(btns, fields, group) {
    let tools
    if (Array.isArray(btns)) {
      tools = btns.map(t => {
        return this._btn(
          Object.assign(t, {
            fields,
            group,
          })
        )
      })
    } else {
      tools = btns
        ? this._btn(
            Object.assign(btns, {
              fields,
              group,
            })
          )
        : ''
    }
    return tools
  }

  // 表单分组
  _group(group = this.group) {
    let input = this.input
    let formGroupWrap = this._div({
      class: 'form-group-wrap',
    })

    group.forEach(t => {
      let formGroup = this._div(
        {
          class: 'form-group-item',
        },
        formGroupWrap
      )
      let formGroupItemHeader = this._div(
        {
          class: 'form-group-item-header' + (t.status ? ' show' : ''),
          text: t.label,
          click: e => {
            let el = e.target
            let item = this._closest(el, '.form-group-item')
            this._toggle(item, 'open')
          },
        },
        formGroup
      )

      this._icon(
        {
          class: 'right',
          click: e => {},
        },
        formGroupItemHeader
      )

      this._div(
        {
          text: 'show',
          class: 'status',
          click: e => {
            let el = e.target
            let groupItem = this._closest(el, '.form-group-item')
            let checkbox = this._query("input[name='show']", groupItem)
            console.log(checkbox, checkbox.checked)
            checkbox.checked = false
            this.dataModelChanged(checkbox)

            let groupItemHeader = this._closest(el, '.form-group-item-header')

            this._toggle(groupItemHeader, 'show')

            this._stopProp(e)
          },
        },
        formGroupItemHeader
      )

      let formGroupItemBody = this._div(
        {
          class: 'form-group-item-body',
        },
        formGroup
      )

      this._fieldItem(
        t.fields,
        {
          input,
          form: formGroupWrap,
        },
        formGroupItemBody
      )

      // t.fields.forEach(t => {
      //     this._formItem({
      //         ...t,
      //         input,
      //         form: formGroupWrap
      //     }, formGroupItemBody)
      // })
      // 计算高度
      // let height = (35 * t.fields.length) + 'px'
      // formGroupItemBody.style.height = height
      // formGroupItemBody.setAttribute("height", height)
    })
    return formGroupWrap
  }
  _fieldItem(fields, options, parent) {
    fields.forEach(t => {
      if (Array.isArray(t.fields)) {
        let fieldset = this._fieldset(t.label, parent)
        this._fieldItem(t.fields, options, fieldset)
      } else {
        this._formItem(
          {
            ...t,
            ...options,
          },
          parent
        )
      }
    })
  }
  // tabs
  _tabs() {
    let tabs = this._div({
      class: 'tabs',
    })
    let tabHeader = this._div(
      {
        class: 'tab-header',
      },
      tabs
    )

    let tabBody = this._div(
      {
        class: 'tab-body',
      },
      tabs
    )

    this.tabs.forEach((t, index) => {
      let tabName = t.name
      let actived = index === 0 ? ' actived' : ''
      let tabHeaderItem = this._div(
        {
          class: 'tab-header-item' + actived,
          name: tabName,
          text: tabName,
          click: e => {
            console.log(e.target)
            let el = e.target
            this._actived(el)
            let content = this._query(
              ".tab-body-content[name='" + tabName + "']",
              tabBody
            )
            this._actived(content)
          },
        },
        tabHeader
      )

      let labels = this.group.map(g => g.label)
      let items = t.items
        .filter(t => labels.includes(t))
        .map(t => {
          return this.group.find(g => g.label === t)
        })

      let tabBodyContent = this._div(
        {
          class: 'tab-body-content' + actived,
          name: tabName,
          slot: this.group ? this._group(items) : this._form(),
        },
        tabBody
      )
    })

    if (this.tabs) return tabs
    return this.group ? this._group() : this._form()
  }

  // 表单单元
  _formItem(field = {}, parent) {
    let { label, key, value, type, btn, form } = field
    let formItem = this._div(
      {
        class: 'form-item',
      },
      parent
    )
    this._div(
      {
        class: 'form-item-label',
        text: label,
      },
      formItem
    )
    let d = String(value).split('.')[1]
    let step = Math.pow(10, d ? -1 * d.toString().length : 0)

    switch (type) {
      case 'textarea':
        this._textarea(
          {
            class: 'form-item-textarea',
            value,
            name: key,
            ...field,
          },
          formItem
        )
        break
      case 'trueorfalse':
      case 'boolean':
        this._trueorfalse(
          {
            class: 'form-item-checkbox',
            name: key,
            ...field,
            // event:(e)=>{
            //     console.log(e)

            // }
          },
          formItem
        )
        break
      case 'select':
        this._select(
          {
            class: 'form-item-select',
            value,
            name: key,
            ...field,
          },
          formItem
        )
        break
      case 'color':
        this._select(
          {
            class: 'form-item-color',
            value,
            name: key,
            ...field,
          },
          formItem
        )
        break
      case 'number':
        this._inputNumber(
          {
            class: 'form-item-inputnumber',
            value,
            name: key,
            step,
            ...field,
          },
          formItem
        )
        break
      case 'range':
        this._inputRange(
          {
            class: 'form-item-inputrange',
            value,
            name: key,
            step,
            ...field,
          },
          formItem
        )
        break
      default:
        this._input(
          {
            class: 'form-item-input',
            value,
            name: key,
            ...field,
          },
          formItem
        )
    }

    if (btn) {
      this._btn(
        {
          ...btn,
          form,
        },
        formItem
      )
    }
    return formItem
  }

  // 按钮
  _btn({ click, text, form, name, fields, group }, parent) {
    let btn = this._createEle(
      'button',
      {
        type: 'button',
        form,
        name,
        innerText: text,
      },
      parent
    )

    btn.onclick = e => {
      let el = e.target
      let form = this._closest(el, '.panel').id
      console.log(fields, group)
      let dataModel = this._dataModel(fields, form)

      let inputs = this._queryAll("[name='input']", form)
      let output = this._query("[name='output']", form)
      let fn = this._query("[name='function']", form)

      let values = []
      inputs.forEach(t => {
        values.push(JSON.parse(t.value))
      })
      let result = ''
      switch (name) {
        case 'submit':
          this.dataModelChanged()
          break
        case 'animate':
        case 'move':
        case 'rotate':
          console.log(this)

          // this.data
          click.call(this.data, dataModel)
          // 保存local
          localStorage.setItem('dataModel', JSON.stringify(dataModel))
          break
        case 'reset':
          console.log(this)
          // let defaultDataModel = localStorage.getItem("defaultDataModel")
          // localStorage.setItem("dataModel", defaultDataModel)
          localStorage.removeItem('dataModel')
          location.reload()

          break

        case 'to_form':
          click(JSON.parse(output.value))
          break
        default:
          if (fn) {
            try {
              let e_str = eval('(' + fn.value + ')(...values)')

              result = e_str ? JSON.stringify(e_str) : ''
            } catch (e) {
              result = e
            }
          } else {
            result = JSON.stringify(click(...values))
          }
          if (output) {
            output.value = result
          }
      }
    }
    return btn
  }
  // 下拉菜单
  _dropdown(field, parent) {
    let dropdown = this._div(
      {
        class: 'dropdown-menu',
      },
      parent
    )
    field.class = 'form-item-dropdown'
    field.focus = e => {
      let el = e.target
      this._show(dropdown)
      this._css(dropdown, {
        top: el.offsetTop + el.offsetHeight + 'px',
      })
    }
    // 不会冒泡
    field.onchange = el => {
      this.dataModelChanged(el)
    }
    let input = this._input(field, parent)
    let iconColor;
    if (field.name === 'color') {
      iconColor = this._div(
        {
          class: 'icon-color',
          style: {
            background: input.value,
          },
        },
        parent
      )
    }
    field.options.forEach(t => {
      let actived = t === field.value ? ' actived' : ''
      this._div(
        {
          class: 'dropdown-menu-item' + actived,
          value: t,
          innerText: t,
          click: e => {
            let el = e.target
            this._actived(el)
            let value = this._attr(el, 'value')
            input.value = value
            if(iconColor){
              this._css(iconColor,{
                background: value
              })
            }
            // 通过DOM对象赋值不会触发change事件，手动触发
            input.onchange(input)
            this._hide(dropdown)
          },
          children:
            field.name === 'color'
              ? this._div({
                  class: 'icon-color',
                  style: 'background-color:' + t,
                })
              : '',
        },
        dropdown
      )
    })
    return dropdown
  }

  // 下拉选项
  _select(field, parent) {
    return this._dropdown(field, parent)
  }
  // 颜色
  _inputColor(field, parent) {
    return this._dropdown(field, parent)
  }
  _inputRange(field, parent) {
    return this._input(
      {
        ...field,
        type: 'range',
      },
      parent
    )
  }
  // 数字
  _inputNumber(field, parent) {
    return this._input(
      {
        ...field,
        type: 'number',
      },
      parent
    )
    // let
    // let div = this._div({
    //     class: 'inputnumber-wrap'
    // }, parent)
    // let input = this._input({
    //     ...field,
    //     type: 'number'
    // }, div)
    // let slider = new SliderBar({
    //     el: div
    // }, div)
    // // div.appendChild(input)
    // // div.appendChild(slider)
    // return div
  }

  // 输入框
  _input(field, parent) {
    let { value, type = 'text' } = field

    switch (type) {
      case 'array':
        value = value.join(',')
        break
      case 'object':
        value = JSON.stringify(value)
        break
    }
    return this._createEle(
      'input',
      {
        ...field,
        type,
        value,
      },
      parent
    )
  }

  // 文本框
  _textarea(field, parent) {
    return this._createEle(
      'textarea',
      {
        ...field,
        innerHTML: text,
        value: value ? JSON.stringify(value) : '',
      },
      parent
    )
  }

  // 是否
  _trueorfalse(field, parent) {
    return this._createEle(
      'input',
      {
        ...field,
        type: 'checkbox',
        checked: field.value ? true : undefined,
        click: e => {
          console.log(e)
          let el = e.target
          let key = this._attr(el, 'key')
          if (
            key.split('$').length === 2 &&
            (key.indexOf('$show') > 0 || key.indexOf('$use') > 0)
          ) {
            let groupItem = this._closest(el, '.form-group-item')
            let header = this._query('.form-group-item-header', groupItem)
            this._toggle(header, 'show', el.checked)
          }
        },
      },
      parent
    )
  }
}
