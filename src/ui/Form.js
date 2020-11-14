import Panel from "./Panel";
import SliderBar from "./Sliderbar"

export default class Form extends Panel {
    constructor(options) {
        super(options)
    }
    // 实现接口
    render() {
        let el = this.el ? this.el : this._div({
            id: "wrapper"
        })
        let form = this._panelWrap()
        el.appendChild(form)
        let configBtn = this._div({
            id: 'configBtn',
            class: "btn hide",
            text: 'config',
            click: (e) => {
                let el = e.target
                let wrapper = this._closest(el, "#wrapper")
                let panel = this._query(".panel", wrapper)
                this._toggle(panel, "fadeout")
                this._toggle(el, "hide")
            }
        })
        el.appendChild(configBtn)
        this._appendTo(null, el)
        this.el = el
    }

    _panelWrap(options) {
        let {
            el,
            fields = [],
            btn,
            btns = [],
            title
        } = options || this
        let tools = this._tools(btns.length > 0 ? btns : btn, fields)
        this['input'] = (e) => {
            // debugger
            console.log(e)
            let btn = btns.filter(t => t.name === "submit")[0]
            // debugger
            let dataModel = this._dataModel(fields, form)
            btn && btn.click(dataModel)
            // this.data._draw._shape(dataModel)
            // this.data.drawSVG(dataModel)

            // tools.fi
        }


        let form = this._panel({
            title,
            class: 'ui',
            body: this.group ? this._group() : this._form(),
            tools
        })
        this._appendTo(el, form)
        return form

    }
    // 表单
    _form(options) {
        let {
            fields = [],
                input = (e) => {
                    console.log(e)
                }
        } = options || this

        let form = this._div({
            class: "form"
        })

        fields.forEach(t => {
            form.appendChild(this._formItem({
                ...t,
                input
            }))
        })
        return form
    }

    // 按钮
    _tools(btns, fields) {
        let tools;
        if (Array.isArray(btns)) {
            tools = btns.map(t => {
                return this._btn(
                    Object.assign(t, {
                        fields
                    })
                )
            })
        } else {
            tools = btns ? this._btn(
                Object.assign(btns, {
                    fields
                })
            ) : ""
        }
        return tools

    }
    // 表单分组
    _group() {
        let {
            group,
            input = (e) => {
                console.log(e)
            }
        } = this
        let formGroupWrap = this._div({
            class: "form-group-wrap"
        })
        group.forEach(t => {
            let formGroup = this._div({
                class: "form-group-item close",
            })
            let formGroupItemHeader = this._div({
                class: "form-group-item-header",
                text: t.label,
                click: (e) => {
                    let el = e.target
                    let item = this._closest(el, ".form-group-item")
                    this._toggle(item, "close")
                    // let iteml_body = this._query(".form-group-item-body", item)
                    // iteml_body.style.height = iteml_body.style.height === '0px' ? iteml_body.getAttribute("height") : "0px"

                }
            }, formGroup)
            // formGroup.appendChild(formGroupItemHeader)
            let icon = this._icon({
                class: "right",
                click: (e) => {

                }
            }, formGroupItemHeader)
            // formGroupItemHeader.appendChild(icon)

            let formGroupItemBody = this._div({
                class: "form-group-item-body"
            }, formGroup)
            // formGroup.appendChild(formGroupItemBody)

            t.fields.map(t => {
                formGroupItemBody.appendChild(this._formItem({
                    ...t,
                    input
                }))
            })
            // 计算高度
            // let height = (35 * t.fields.length) + 'px'
            // formGroupItemBody.style.height = height
            // formGroupItemBody.setAttribute("height", height)
            formGroupWrap.appendChild(formGroup)
        })
        return formGroupWrap
    }

    // 表单单元
    _formItem(field = {}, form) {
        let {
            label,
            key,
            value,
            type,
            btn
        } = field
        let formItem = this._div({
            class: "form-item"
        })
        this._div({
            class: "form-item-label",
            text: label
        }, formItem)

        switch (type) {
            case "textarea":
                this._textarea({
                    class: 'form-item-textarea',
                    value,
                    name: key,
                    ...field
                }, formItem)
                break;
            case "trueorfalse":
            case "boolean":
                this._trueorfalse({
                    class: 'form-item-select',
                    name: key,
                    ...field
                }, formItem)
                break;
            case "select":
                this._select({
                    class: 'form-item-select',
                    value,
                    name: key,
                    ...field
                }, formItem)
                break
            case "number":
                let d = value.toString().split(".")[1]
                let step = Math.pow(10, d ? -1 * d.toString().length : 0)
                this._inputNumber({
                    class: 'form-item-inputnumber',
                    value,
                    name: key,
                    step,
                    ...field
                }, formItem)
                break;
            default:
                this._input({
                    class: 'form-item-input',
                    value,
                    name: key,
                    ...field
                }, formItem)
        }

        if (btn) {
            formItem.appendChild(this._btn({
                ...btn,
                form
            }))
        }
        return formItem

    }

    // 按钮
    _btn({
        click,
        text,
        form,
        name,
        fields
    }) {
        let btn = this._createEle("button", {
            type: "button",
            form,
            name,
            innerText: text
        })

        btn.onclick = (e) => {
            let form = this._closest(e.target, ".panel").id
            console.log(fields)
            let dataModel = this._dataModel(fields, form)

            let inputs = this._queryAll("[name='input']", form)
            let output = this._query("[name='output']", form)
            let fn = this._query("[name='function']", form)

            let values = []
            inputs.forEach(t => {
                values.push(JSON.parse(t.value))
            })
            let result = ""
            switch (name) {
                case "submit":
                case "animate":
                case "move":
                case "rotate":
                    click(dataModel)
                    // 保存local
                    localStorage.setItem("dataModel", JSON.stringify(dataModel))
                    break;
                case "reset":
                    console.log(this)
                    // let defaultDataModel = localStorage.getItem("defaultDataModel")
                    // localStorage.setItem("dataModel", defaultDataModel)
                    localStorage.removeItem("dataModel")
                    location.reload()

                    break;

                case "to_form":
                    click(JSON.parse(output.value));
                    break;
                default:

                    if (fn) {
                        try {
                            let e_str = eval("(" + fn.value + ")(...values)")

                            result = e_str ? JSON.stringify(e_str) : ""
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

    // 下拉选项
    _select(field, parent) {
        return this._createEle("select", field, parent);
    }
    // 数字
    _inputNumber(field, parent) {
        return this._input({
            ...field,
            type: 'number'
        }, parent)
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
        let {
            value,
            type = 'text'
        } = field

        switch (type) {
            case "array":
                value = value.join(",")
                break;
            case "object":
                value = JSON.stringify(value)
                break;
        }
        return this._createEle("input", {
            ...field,
            type,
            value
        }, parent)
    }

    // 文本框
    _textarea(field, parent) {
        return this._createEle("textarea", {
            ...field,
            innerHTML: text,
            value: value ? JSON.stringify(value) : ""
        }, parent)
    }

    // 是否
    _trueorfalse(field, parent) {
        return this._createEle("input", {
            ...field,
            type: "checkbox",
            checked: field.value ? true : undefined
        }, parent);
    }
}