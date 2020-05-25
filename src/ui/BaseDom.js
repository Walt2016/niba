import {
    _type
} from '../utils'
export default class BaseDom {
    constructor(options) {
        Object.assign(this, options)
        this.setData(options.data)
        console.log(this)
    }
    // 接口
    render() {}
    setData(data) {
        if (_type(data) == "object") {
            this.fields = this.objToFields(data, this.options, this.labels)
        }
        this.render()
    }
    // 入参转换
    objToFields(obj = {}, options = {}, labels = {}) {
        Object.assign(labels, {
            o: 'center',
            r: 'radius',
            n: 'sides'
        })
        let fields = []
        for (let key in obj) {
            let label = labels[key] ? labels[key] : key;
            if (options[key]) {
                fields[fields.length] = {
                    key,
                    label,
                    value: obj[key],
                    type: "select",
                    options: options[key]
                }
            } else {
                fields[fields.length] = {
                    key,
                    label,
                    value: obj[key],
                    type: _type(obj[key])
                }
            }

        }
        return fields
    }
    _random() {
        return "_" + Math.random().toString(16).slice(2)
    }

    _query(el, parent) {
        if (parent) {
            if (typeof parent == "string") {
                if (parent.charAt(0).match(/[\#\.]/)) {
                    return document.querySelector(parent + " " + el)
                }
                return document.querySelector("#" + parent + " " + el)
            }
            return document.querySelector("#" + parent.id + " " + el)
        }
        if ("htmldivelement" == _type(el)) {
            return el
        }
        return document.querySelector(el)
    }

    _queryAll(el, parent) {
        if (parent) {
            if (typeof parent == "string") {
                if (parent.charAt(0).match(/[\#\.]/)) {
                    return document.querySelectorAll(parent + " " + el)
                }
                return document.querySelectorAll("#" + parent + " " + el)
            }
            return document.querySelectorAll("#" + parent.id + " " + el)
        }
        return document.querySelectorAll(el)
    }

    //上溯
    _closest(el, cls) {
        if (!el.parentNode) { //document  ie8不支持parentNode
            return null
        } else if (cls.charAt(0) === "." && el.className.split(" ").indexOf(cls.substring(1)) >= 0) {
            return el;
        } else if (cls.charAt(0) === "#" && el.id.toLowerCase() === cls.substring(1).toLowerCase()) {
            return el;
        } else if (el.tagName.toLowerCase() === cls.toLowerCase()) {
            return el
        } else {
            return this._closest(el.parentNode, cls)
        }
    }

    _appendTo(el, form) {
        // el = el ? document.querySelector(el) : document.body
        el = el ? this._query(el) : document.body
        el.appendChild(form)
    }

    _createEle(tag, options) {
        let ele = document.createElement(tag)
        for (let key in options) {
            if (options[key] !== undefined) {
                if ("class" == key) {
                    ele.className = options[key]
                } else if (['name', 'innertext', 'id', 'innerHTML', 'value'].indexOf(key.toLocaleLowerCase()) >= 0) {
                    ele[key] = options[key]
                } else if (key === "click") {
                    ele.addEventListener("click", options[key], false)
                } else {
                    ele.setAttribute(key, options[key])
                }
            }
        }
        return ele
    }

    _div(options) {
        let div = this._createEle("div", Object.assign(options, {
            innerText: options["text"]
        }))
        return div
    }

    //允许一次加多个样式
    //去重
    _addClass(el, cls) {
        var arr1 = el.className.split(" ")
        var arr2 = cls.split(" ")
        var obj = {}
        arr1.forEach(t => {
            obj[t] = 1
        })
        arr2.forEach(t => {
            obj[t] = 1
        })
        var keys = []
        for (var key in obj) {
            keys.push(key)
        }
        el.className = keys.join(" ")
        return el;
    }
    _removeClass(el, cls) {
        var arr1 = el.className.split(" ")
        var arr2 = cls.split(" ")
        var obj = {}
        arr1.forEach(t => {
            if (arr2.indexOf(t) === -1) {
                obj[t] = 1
            }
        })
        var keys = []
        for (var key in obj) {
            keys.push(key)
        }
        el.className = keys.join(" ")
        return el;
    }
    _hasClass(el, cls) {
        var arr = el.className.split(" ")
        return arr.indexOf(cls) >= 0
    }
    _toggle(el, cls) {
        if (this._hasClass(el, cls)) {
            this._removeClass(el, cls)
        } else {
            this._addClass(el, cls)
        }
    }
    _get(field, form) {
        let formitem = this._query("[name='" + field.key + "']", form)
        let value = formitem.value
        switch (field.type) {
            case "number":
                return Number(value)
                break;
            case "object":
                return JSON.parse(value)
                break;
            case "array":
                if (/\[.*?\]/.test(value)) {
                    return JSON.parse(value)
                } else {
                    return value.split(",").map(t => {
                        return Number(t)
                    })
                }

                break;
            case "boolean":
                return formitem.checked
                break;
            case "select":
            default:
                return value

        }
    }
    _set(key, value) {
        let field = this.fields.filter(t => t.key == key)[0]
        if (field) {

            let formitem = this._query("[name='" + field.key + "']")

            switch (field.type) {
                case "number":
                    formitem.value = Number(value)
                    break;
                case "object":
                    formitem.value = JSON.parse(value)
                    break;
                case "array":
                    if (/\[.*?\]/.test(value)) {
                        formitem.value = JSON.parse(value)
                    } else {
                        formitem.value = value.join(",")
                    }

                    break;
                case "boolean":
                    formitem.value = formitem.checked
                    break;
                case "select":
                default:
                    formitem.value = value
                    break;
            }
        }
    }
}