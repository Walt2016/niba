import {
    setup as setupSvg,
    draw as drawSvg,
    shape
} from './mysvg'
import {
    setup as setupCanvas,
    draw as drawCanvas,
    lattice,
    clear,
    anime
} from './mycanvas'
import {
    figures
} from './sample/1'

// function component() {
//     var element = document.createElement('div');
//     element.innerHTML = ['Hello', 'webpack'].join(" ")
//     return element;
// }

// document.body.appendChild(component());


setupCanvas()
anime(figures)