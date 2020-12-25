// 分组 和选项

const groupConfig = {
    group: ['edge', 'sawtooth', 'wave', 'curve', 'semicircle', 'elliptical', 'radius', 'vertex', 'link', 'center', 'excircle', 'incircle', 'axisX', 'axisY', 'grid', 'polar', 'fractal', 'animation', 'transform', 'pattern', 'chequer', 'stripe', 'diagonalStripe', 'gradient'],
    other: 'shape'
}
const _group = (options) => {
    let keys = Object.keys(options)
    let g = []
    groupConfig.group.forEach(t => {
        let tKeys = keys.filter(key => key.indexOf(t) === 0)
        keys = keys.filter(key => key.indexOf(t) !== 0)
        g.push({
            [t]: tKeys
        })
    })
    g.unshift({
        [groupConfig.other]: keys
    })
    return g
}

const optionsConfig = {
    color: ["red", "blue", "black", "green", "yellow", "pink", "gray", "purple", 'lime', 'brown', 'orange', 'Navy'],
    shape: ['circle', 'rect', 'line', 'polygon'],
    linecap: ['butt', 'round', 'square', 'inherit'],
    linejoin: ['arcs', 'bevel', 'miter', 'miter-clip', 'round'],
    fractal: {
        type: ['midSeg', 'zoom', 'scale', 'rotate', 'reproduce', 'tree', 'radiusRatio', 'vertexMirror', 'edgeMirror'],
    },
    animation: {
        name: ['rotate', 'twinkle', 'shift', 'loading'],
    },
    transform: {
        name: ['scale', 'translate', 'rotate', 'skew'],
    },
    sort: ['normal', 'neighborSwap', 'intervalSort', 'misplaced', 'paritySort', 'shuffle'],
    // patternUnits: ['objextBoundingBox', 'userSpaceOnUse'],
    segType: ['equiangular', 'randomTop'],
    // api: ['svg', 'canvas'],
    waveform: ['line', 'semicircle', 'sawtooth', 'wave', 'curve', 'elliptical'],
    gradient: {
        type: ['linearGradient ', 'radialGradient'],
    },
    pattern: {
        name: ['chequer', 'diagonalStripe', 'dot'],
        units: ['objextBoundingBox', 'userSpaceOnUse'],
    }
}

const _options = (options) => {
    return optionsConfig
    // let keys = Object.keys(options)
    // let opt = {}
    // let regs = Object.keys(optionsConfig)
    // regs.forEach(r => {
    //     let reg = new RegExp(`(${groupConfig.group.map(t => t + r+'\\d?').concat([r+'\\d?']).join("|")})$`, 'i')
    //     // console.log(reg)
    //     keys.filter(t => reg.test(t)).forEach(t => {
    //         opt[t] = optionsConfig[r]
    //     })
    // })
    // return opt
}

export default {
    _group,
    _options
}