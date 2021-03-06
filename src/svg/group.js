// 分组 和选项

const groupConfig = {
  group: [
    'edge',
    'sawtooth',
    'wave',
    'curve',
    'semicircle',
    'elliptical',
    'radius',
    'vertex',
    'link',
    'center',
    'excircle',
    'incircle',
    'axisX',
    'axisY',
    'grid',
    'polar',
    'fractal',
    'animation',
    'transform',
    'pattern',
    'chequer',
    'stripe',
    'diagonalStripe',
    'gradient',
  ],
  other: 'shape',
}
const _group = options => {
  let keys = Object.keys(options)
  let g = []
  groupConfig.group.forEach(t => {
    let tKeys = keys.filter(key => key.indexOf(t) === 0)
    keys = keys.filter(key => key.indexOf(t) !== 0)
    g.push({
      [t]: tKeys,
    })
  })
  g.unshift({
    [groupConfig.other]: keys,
  })
  return g
}

let color = [
  'red',
  'blue',
  'black',
  'green',
  'yellow',
  'pink',
  'gray',
  'purple',
  'lime',
  'brown',
  'orange',
  'Navy',
  'white'
]
const optionsConfig = {
  color,
  lineColor: color,
  shape: ['circle', 'rect', 'line', 'polygon'],
  linecap: ['butt', 'round', 'square', 'inherit'],
  linejoin: ['arcs', 'bevel', 'miter', 'miter-clip', 'round'],
  fractal: {
    type: [
      'midSeg',
      'vertexMirror',
      'edgeMirror',
      'reproduce',
      'tree',
      'sin',
      'circle',
    ], //, 'zoom', 'scale', 'rotate', 'radiusRatio',
  },
  animation: {
    name: ['rotate', 'twinkle', 'shift', 'loading'],
  },
  transform: {
    name: ['scale', 'translate', 'rotate', 'skew'],
  },
  sort: [
    'normal',
    'neighborSwap',
    'intervalSort',
    'misplaced',
    'paritySort',
    'shuffle',
  ],
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
  },
  path: {
    name: ['circle', 'sin', 'cos', 'line'],
  },
  mirror: {
    type: ['vertex', 'edge'],
  },
}

const _options = options => {
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
const _tabs = () => {
  return [
    {
      name: 'basic',
      items: [
        'global',
        'vertex',
        'radius',
        'edge',
        'sawtooth',
        'wave',
        'curve',
        'semicircle',
        'elliptical',
        'link',
        'center',
        'excircle',
        'incircle',
      ],
    },
    {
      name: 'compose',
      items: ['fractal', 'mirror'],
    },
    {
      name: 'axis',
      items: ['axisX', 'axisY', 'grid', 'polar'],
    },
    {
      name: 'animation',
      items: ['animation', 'transform'],
    },
    {
      name: 'pattern',
      items: ['pattern', 'chequer', 'stripe', 'diagonalStripe', 'gradient'],
    },
    {
      name: 'path',
      items: ['path', 'sin', 'cos', 'tan'],
    },
  ]
}
// 校验
const required = ['o', 'r', 'n']

const validated = {
  required: {
    key: ['o', 'r', 'n'],
    message: '{0}值不能为空',
  },
  opacity: {
    // max: 1,
    // min: 0,
    range: [0, 1],
    message: '{0}值范围[0,1]',
  },
  o: {
    format: /\d+,\d+/,
    message: '{0}格式[num,num]',
  },
}

export default {
  _group,
  _options,
  _tabs,
  validated,
  required,
}
