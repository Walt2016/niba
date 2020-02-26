import {
    setup as setupSvg,
    draw as drawSvg,
    shape
} from './mysvg'
import {
    setup as setupCanvas,
    draw as drawCanvas,
    lattice,
    clear
} from './mycanvas'

// function component() {
//     var element = document.createElement('div');
//     element.innerHTML = ['Hello', 'webpack'].join(" ")
//     return element;
// }

// document.body.appendChild(component());


let pic = [{
        shape: 'text',
        text: '美国队长',
        y: 30
    }, {
        shape: 'circle',
        color: 'red',
        r: 200,
        // filter:'gray' 
    }, {
        shape: 'circle',
        color: 'white',
        r: 160
    }, {
        shape: 'circle',
        color: 'red',
        r: 120
    },
    {
        shape: 'circle',
        color: 'blue',
        r: 80
    }, {
        shape: 'polygon',
        r: 75,
        n: 5,
        color: 'white',
        sort: 'paritySort'
    },
    {
        filter: 'lattice'
    }
    // {
    //     filter: 'gray' //
    // },
    // {
    //     filter:'reverse'  
    // } 
]

let opt = {
    color: 'pink',
    // delay: 1000,
    // loop:false
}

// drawCanvas(pic, opt)
// drawSvg(pic, opt)

// lattice()

let pic2 = [{
    shape: 'arc', //polygon ray
    n: 3,
    r: 100,
    color: 'rgba(255,255,255,0.2)',
    lineColor: '$circle',
    fractal: 'branch',
    level: 5,
    step: {
        r: 0.5,
        n: 1
    },
    sAngle: 45
}]

let pic3 = [{
    shape: 'dot',
    n: 10,
    a: 10
}]

setupCanvas()

// drawCanvas(pic3)

// setTimeout(()=>{
//     clear()
// },1000)

let aminte1=()=>{
    let sign = 1
    setInterval(function () {
        pic3 = pic3.map(t => {
            if (t.a > 50) {
                sign = -1
            } else if (t.a < 10) {
                sign = 1
            }
    
            t.a = t.a + sign * 0.1
            return t
        })
        clear()
        drawCanvas(pic3)
    }, 17);
}

let aminte2=()=>{
    let sign = 1
    setInterval(function () {
        pic3 = pic3.map(t => {
            if (t.n > 50) {
                sign = -1
            } else if (t.n < 1) {
                sign = 1
            }
    
            t.n = t.n + sign * 1
            return t
        })
        clear()
        drawCanvas(pic3)
    }, 17);
}

aminte2()