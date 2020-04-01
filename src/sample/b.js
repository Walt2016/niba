
import {
    setup as setupCanvas,
    draw as drawCanvas,
    lattice,
    clear,
    anime,
    animate
} from './draw'
import {
    Branch
} from './fractal'
let {
    ctx,
    canvas,
    width,
    height
} = setupCanvas()

let branch = new Branch({
    // o: [width/3, height-100],
    o: [width/2, height/2],
    r: 100,
    n: 3,
    ctx,
    shrink:0.5,
    level:8,
    direction:-45
})