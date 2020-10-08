import config from './config'
let {
    env,
    center
} = config
let {
    width,
    height
} = env
const createSvgDom = tag => {
    return document.createElementNS('http://www.w3.org/2000/svg', tag)
}
const svgWrappper = svgDom => {
    let svg = createSvgDom("svg")
    let options = Object.assign(env, {
        fill: 'red'
    })
    console.log(options, document.body)
    for (let key in options) {
        svg.setAttribute(key, options[key])
    }
    if (Array.isArray(svgDom)) {
        svgDom.forEach(t => {
            svg.appendChild(t)
        })
    } else if (svgDom) {
        svg.appendChild(svgDom)
    }
    return svg
}
const appendPath= d=>{
   let path= createSvgDom("path")
   path.setAttribute("d",d)
   wrapper.appendChild(path)
}
let wrapper;
const setup = () => {
    wrapper = svgWrappper()
    document.body.appendChild(wrapper);
    return {
        wrapper,
        createSvgDom,
        appendPath,
        width,
        height
    }
}

//多边形
const polygon = function (options) {
    let points = arcseg(options)
    options.points = points.join(" ")
}
// {/* <path d="M250 150 L150 350 L350 350 Z" /> */}
const draw = () => {


}

export {
    setup,
    draw
}