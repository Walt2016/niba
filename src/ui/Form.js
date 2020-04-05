import Panel from "./Panel";
import {
    _type
} from "../utils"

export default class Form extends Panel {
    constructor(options) {
        super(options)
        let el = this._div({
            id: "wrapper"
        })
        el.appendChild(this._form()) //options
        this._appendTo(null, el)
        return el
    }

    // _wrapper(options) {
    //     let {
    //         title,
    //         events,
    //         inputs
    //     } = options
    //     let fields = inputs.map(t => {
    //         console.log(typeof t)
    //         let type = "textarea"
    //         if (typeof t == "boolean") {
    //             type = "trueorfalse"
    //         }

    //         return {
    //             label: 'input',
    //             key: 'input',
    //             type,
    //             value: t
    //         }
    //     })

    //     fields.push({
    //         label: 'function',
    //         key: 'function',
    //         type: 'textarea',
    //         text: events[0], //onclick
    //         btn: {
    //             text: "exe",
    //             click: events[0],
    //             name: 'exe'
    //         }
    //     })
    //     fields.push({
    //         label: 'output',
    //         key: 'output',
    //         type: 'textarea',
    //         btn: {
    //             text: "toForm",
    //             click: events[1],
    //             name: 'to_form'
    //         }
    //     })
    //     return _form({
    //         el: "#wrapper",
    //         fields,
    //         // events,
    //         title
    //     })
    // }
    _form(options) {
        let {
            el,
            fields,
            click,
            events = [],
            btn,
            btns = [],
            title
        } = this

        let form = this._panel({
            title,
            class: 'ui',
            body: fields.map(t => {
                return this._formItem(t)
            }),
            tools: btn ? this._btn(
                Object.assign(btn, {
                    fields
                })
            ) : ""
        })
        this._appendTo(el, form)
        return form
    }
    _formItem(field, form) {
        let {
            label,
            key,
            value,
            type,
            btn
        } = field
        let formItem = this._div({
            class: "form_item"
        })
        let labelDiv = this._div({
            class: "form_item_label",
            text: label
        })

        formItem.appendChild(labelDiv)

        switch (type) {
            case "textarea":
                let textarea = this._textarea(Object.assign({
                    class: 'form_item_textarea',
                    value,
                    name: key
                }, field))
                formItem.appendChild(textarea)
                break;
            case "trueorfalse":
            case "boolean":
                let div = this._trueorfalse(Object.assign({
                    class: 'form_item_select',
                    name: key
                }, field))
                formItem.appendChild(div)
                break;
            case "select":
                let select = this._select(Object.assign({
                    class: 'form_item_select',
                    value,
                    name: key
                }, field))
                formItem.appendChild(select)
                break
            default:
                let input = this._input({
                    class: 'form_item_input',
                    value,
                    name: key
                })
                formItem.appendChild(input)
        }
        if (btn) {
            formItem.appendChild(_btn(Object.assign(btn, {
                form
            })))
        }
        return formItem

    }

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
            // let form = e.target.getAttribute("form")

            let form = this._closest(e.target, ".panel").id

            console.log(fields)
            let bizModel = {}
            if (fields) {
                fields.forEach(t => {
                    let value = this._query("[name='" + t.key + "']", form).value
                    switch (t.type) {
                        case "number":
                            bizModel[t.key] = Number(value)
                            break;
                        case "object":
                            bizModel[t.key] = JSON.parse(value)
                            break;
                        case "array":
                            if (/\[.*?\]/.test(value)) {
                                bizModel[t.key] = JSON.parse(value)
                            } else {
                                bizModel[t.key] = value.split(",").map(t => {
                                    return Number(t)
                                })
                            }

                            break;
                        case "boolean":
                            bizModel[t.key] = this._query("[name='" + t.key + "']", form).checked
                            break;
                        case "select":
                        default:
                            bizModel[t.key] = value
                            break;
                    }
                    // if (t.value !== undefined) { //判断类型
                    //     if (typeof t.value == "object") {
                    //         bizModel[t.key] = JSON.parse(value)
                    //     } else if (typeof t.value == "number") {
                    //         bizModel[t.key] = Number(value)
                    //     } else if (typeof t.value == "boolean") {
                    //         bizModel[t.key] = value=="true"
                    //     } else {
                    //         bizModel[t.key] = value
                    //     }
                    // } else {
                    //     bizModel[t.key] = value
                    // }

                })
            }

            let inputs = this._queryAll("[name='input']", form)
            let output = this._query("[name='output']", form)
            let fn = this._query("[name='function']", form)


            // let inputs = document.querySelectorAll(form + " [name='input']")
            // let output = document.querySelector(form + " [name='output']")
            // let fn = document.querySelector(form + " [name='function']") //textarea
            let values = []
            inputs.forEach(t => {
                values.push(JSON.parse(t.value))
            })
            let result = ""
            switch (name) {
                case "submit":
                    click(bizModel)

                    // this._query("#" + form).appendChild(this._div({
                    //     text: bizModel ? JSON.stringify(bizModel) : ""
                    // }))
                    break;
                case "to_form":
                    click(JSON.parse(output.value));
                    // result = JSON.stringify(click(JSON.parse(output.value)))
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

    _select(field) {
        let select = this._createEle("select", field);
        field.options.forEach(t => {
            let opt = new Option(t, t);
            if (field.value === t.value) {
                opt.selected = true
            }
            select.options.add(opt);
        })
        return select
    }


    _input(field) {
        let {
            value,
            type
        } = field

        switch (type) {
            case "array":
                value = value.join(",")
                break;
            case "object":
                value = JSON.stringify(value)
                break;
        }
        let input = this._createEle("input", Object.assign(field, {
            type: 'text',
            value
            // value: typeof value == "object" ? JSON.stringify(value) : value
        }))
        return input
    }

    _textarea(field) {
        return this._createEle("textarea",
            Object.assign(field, {
                innerHTML: text,
                value: value ? JSON.stringify(value) : ""
            })
        )
    }

    _trueorfalse(field) {
        let checkbox = this._createEle("input",
            Object.assign(field, {
                type: "checkbox",
                // value:field.value
                checked: field.value ? true : undefined
            })
        );
        return checkbox
        // let select = this._createEle("select", field);
        // [{
        //     label: "true",
        //     value: true
        // }, {
        //     label: "false",
        //     value: false
        // }].forEach(t => {
        //     let opt = new Option(t.label, t.value);
        //     if(field.value===t.value){
        //         opt.selected=true
        //     }
        //     select.options.add(opt);
        // })
        // return select
    }

}