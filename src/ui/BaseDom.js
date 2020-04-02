export default class BaseDom {
    constructor(opitons) {
        Object.assign(this, opitons)
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
        el = el ? document.querySelector(el) : document.body
        el.appendChild(form)
    }

    _createEle(tag, options) {
        let ele = document.createElement(tag)
        for (let key in options) {
            if (options[key] !== undefined) {
                if ("class" == key) {
                    ele.className = options[key]
                } else if (['name', 'innertext', 'id', 'innerHTML', 'value'].indexOf(key.toLocaleLowerCase())) {
                    ele[key] = options[key]
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




}