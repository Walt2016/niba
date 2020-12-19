// 填充图案
export default class Pattern {
    constructor(){

    }

    // 格子图案
    _chequer(options, g) {
        let {
            chequerSize,
            chequerColor1 = "red",
            chequerColor2 = "green",
            chequerBorderRadius1 = 1,
            chequerBorderRadius2 = 1
        } = options
        let defs = this._defs(g)
        let chequer = this._createEle("pattern", {
            id: "shape-pattern-chequer",
            x: 0,
            y: 0,
            width: chequerSize * 2,
            height: chequerSize * 2,
            patternUnits: "userSpaceOnUse"
        }, defs)
        this._rect([0, 0], [chequerSize, chequerSize], {
            fill: chequerColor1,
            rx: chequerBorderRadius1,
            ry: chequerBorderRadius1,
        }, chequer)
        this._rect([chequerSize, chequerSize], [chequerSize * 2, chequerSize * 2], {
            fill: chequerColor2,
            rx: chequerBorderRadius2,
            ry: chequerBorderRadius2,
        }, chequer)

    }

}