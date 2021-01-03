import Panel from "./Panel";
import SliderBar from "./Sliderbar"

export default class Form extends Panel {
    constructor(options) {
        super(options)
    }
    // 实现接口
    render() {
        let el = this.el
        let form = this._panelWrap()
        el.appendChild(form)
        let configBtn = this._div({
            id: 'configBtn',
            class: "btn",
            // text: '<',
            click: (e) => {
                let el = e.target
                let wrapper = this._closest(el, "#wrapper")
                let panel = this._query(".panel", wrapper)
                this._toggle(panel, "fadeout")
                // this._toggle(el, "hide")
            }
        }, el)
        this._icon({
            class: "left"
        }, configBtn)
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
        // 输入事件
        this['input'] = (e) => {
            // debugger
            // console.log(e)
            let btn = btns.filter(t => t.name === "submit")[0]
            // debugger
            let dataModel = this._dataModel(fields, form)
            btn && btn.click(dataModel)
            // 保存local
            localStorage.setItem("dataModel", JSON.stringify(dataModel))
            // this.data.draw(dataModel)
        }


        let form = this._panel({
            title,
            class: 'ui',
            // body: this.group ? this._group() : this._form(),
            body: this._tabs(),
            tools
        })
        // this._appendTo(el, this._tab())
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
            this._formItem({
                ...t,
                input
            }, form)
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
    _group(group) {
        // let {
        //     group,
        //     input = (e) => {
        //         console.log(e)
        //     }
        // } = this
        group = group || this.group
        let input = this.input
        let formGroupWrap = this._div({
            class: "form-group-wrap"
        })
        // if (tab) group = group.filter(t => t.tab === tab)
        group.forEach(t => {
            let formGroup = this._div({
                class: "form-group-item close",
            }, formGroupWrap)
            let formGroupItemHeader = this._div({
                class: "form-group-item-header" + (t.status ? " show" : ""),
                text: t.label,
                click: (e) => {
                    let el = e.target
                    let item = this._closest(el, ".form-group-item")
                    this._toggle(item, "close")
                    // let iteml_body = this._query(".form-group-item-body", item)
                    // iteml_body.style.height = iteml_body.style.height === '0px' ? iteml_body.getAttribute("height") : "0px"

                }
            }, formGroup)

            this._icon({
                class: "right",
                click: (e) => {

                }
            }, formGroupItemHeader)

            this._div({
                text: "show",
                class: "status"
            }, formGroupItemHeader)

            let formGroupItemBody = this._div({
                class: "form-group-item-body"
            }, formGroup)
            // debugger

            t.fields.forEach(t => {
                this._formItem({
                    ...t,
                    input,
                    form: formGroupWrap
                }, formGroupItemBody)
            })
            // 计算高度
            // let height = (35 * t.fields.length) + 'px'
            // formGroupItemBody.style.height = height
            // formGroupItemBody.setAttribute("height", height)
        })
        return formGroupWrap
    }
    // tabs
    _tabs() {

        let tabs = this._div({
            class: 'tabs'
        })
        let tabHeader = this._div({
            class: 'tab-header'
        }, tabs)

        let tabBody = this._div({
            class: 'tab-body'
        }, tabs)

        this.tabs.forEach((t, index) => {
            console.log(t)
            let tabName = t.name
            let actived = index === 0 ? ' actived' : ''
            let tabHeaderItem = this._div({
                class: 'tab-header-item' + actived,
                name: tabName,
                text: tabName,
                click: (e) => {
                    console.log(e.target)
                    let el = e.target
                    let sis = this._siblings(el)
                    sis.forEach(t => this._removeClass(t, "actived"))
                    this._addClass(el, "actived")

                    // let tabs=this._closest(el,"tabs")
                    let contents = this._queryAll(".tab-body-content", tabBody)
                    contents.forEach(t => this._removeClass(t, "actived"))
                    let content = this._query(".tab-body-content[name='" + tabName + "']", tabBody)
                    this._addClass(content, "actived")

                }
            }, tabHeader)

            let items = t.items.map(t => {
                return this.group.filter(g => g.label === t)[0]
            })
            console.log(items)
            // debugger

            let tabBodyContent = this._div({
                class: "tab-body-content" + actived,
                name: tabName,
                slot: this.group ? this._group(items) : this._form()
            }, tabBody)
        })

        if (this.tabs) return tabs

        return this.group ? this._group() : this._form()

    }

    // 表单单元
    _formItem(field = {}, parent) {
        let {
            label,
            key,
            value,
            type,
            btn,
            form
        } = field
        let formItem = this._div({
            class: "form-item"
        }, parent)
        this._div({
            class: "form-item-label",
            text: label
        }, formItem)
        let d = value.toString().split(".")[1]
        let step = Math.pow(10, d ? -1 * d.toString().length : 0)

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
                    class: 'form-item-checkbox',
                    name: key,
                    ...field,
                    // event:(e)=>{
                    //     console.log(e)

                    // }
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
                this._inputNumber({
                    class: 'form-item-inputnumber',
                    value,
                    name: key,
                    step,
                    ...field
                }, formItem)
                break;
            case "range":
                this._inputRange({
                    class: 'form-item-inputrange',
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
            this._btn({
                ...btn,
                form
            }, formItem)
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
    }, parent) {
        let btn = this._createEle("button", {
            type: "button",
            form,
            name,
            innerText: text
        }, parent)

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
    _inputRange(field, parent) {
        return this._input({
            ...field,
            type: 'range'
        }, parent)
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
            checked: field.value ? true : undefined,
            click: (e) => {
                console.log(e)
                let el = e.target
                if (el.name.indexOf("$show") > 0 || el.name.indexOf("$use") > 0) {
                    let gItem = this._closest(el, ".form-group-item")
                    let header = this._query(".form-group-item-header", gItem)
                    if (el.checked) {
                        this._addClass(header, "show")
                    } else {
                        this._removeClass(header, "show")
                    }
                }
            }
        }, parent);
    }
}