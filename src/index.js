import {draw,circle} from './mysvg'

function component() {
    var element = document.createElement('div');


    element.innerHTML = ['Hello', 'webpack'].join(" ")

    return element;
}

document.body.appendChild(component());

console.log(circle)
draw(circle)
// document.body.appendChild()