import {
    draw as drawSvg,
    shape
} from './mysvg'
import {
    draw as drawCanvas,
    lattice
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
        filter:'lattice'
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

let pic2=[{
    shape:'polygon',
    n:3,
    r:100,
    color:'rgba(255,255,255,0.2)',
    lineColor:'$circle',
    fractal:'branch',
    level:6,
    step:{
        r:0.5,
        n:1
    },
    sAngle:45
}]

drawCanvas(pic2)